"use client";

import { Button } from "@/components/ui/button";
import { Copy, FileUp, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useGetLeaseDocumentQuery, useUploadLeaseDocumentMutation } from "@/state/api";
import { getAccessToken } from "@/lib/authToken";

interface LeaseDocumentTabProps { propertyId: number; }

const LeaseDocumentTab = ({
  propertyId,
}: LeaseDocumentTabProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data: document } = useGetLeaseDocumentQuery(propertyId);
  const [uploadDocument, { isLoading: isUploading }] = useUploadLeaseDocumentMutation();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      toast.error("Please select a PDF document.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error("The PDF must be smaller than 15 MB.");
      return;
    }

    try {
      await uploadDocument({ propertyId, file }).unwrap();
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return URL.createObjectURL(file);
      });
    } catch { /* API mutation shows the error */ }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/managers/properties/${propertyId}?tab=lease`);
      toast.success("Lease page link copied.");
    } catch {
      toast.error("Unable to copy the document link.");
    }
  };

  const downloadDocument = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1/"}properties/${propertyId}/lease-document/download`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    if (!response.ok) return toast.error("Unable to download the lease document.");
    const url = URL.createObjectURL(await response.blob());
    const anchor = window.document.createElement("a");
    anchor.href = url; anchor.download = document?.fileName || "lease.pdf"; anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="min-h-[460px] rounded-xl border bg-white p-4 shadow-sm sm:p-5">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-950">Lease</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage the lease document for property #{propertyId}.
          </p>
        </div>

        {document?.available && (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button type="button" variant="ghost" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-violet-600 hover:text-violet-700"
              onClick={openFilePicker}
            >
              <Upload className="h-4 w-4" />
              Replace Document
            </Button>
            <Button type="button" variant="outline" onClick={downloadDocument}>Download</Button>
          </div>
        )}
      </div>

      {!document?.available ? (
        <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed bg-gray-50/40">
          <Button
            type="button"
            variant="ghost"
            className="text-violet-600 hover:text-violet-700"
            onClick={openFilePicker}
            disabled={isUploading}
          >
            <FileUp className="h-5 w-5" />
            Upload Lease Document
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-gray-700">
          <div className="flex flex-col gap-2 bg-gray-800 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
            <span className="truncate font-medium">{document.fileName}</span>
            <span className="text-xs text-gray-300">Stored PDF</span>
          </div>
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 bg-white p-8 text-center">
            <FileUp className="h-10 w-10 text-violet-600" />
            <p className="font-medium text-gray-900">{document.fileName}</p>
            <p className="text-sm text-gray-500">The lease document is securely stored and ready to review.</p>
            <Button type="button" onClick={downloadDocument}>Download PDF</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeaseDocumentTab;
