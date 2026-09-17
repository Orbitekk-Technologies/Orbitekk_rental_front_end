"use client";

import { useEffect, useState } from "react";
import { FileUp, Pencil } from "lucide-react";
import { toast } from "sonner";
import type { Application } from "@/types/prismaTypes";
import { useGetLeaseDocumentQuery, useUpdateApplicationStatusMutation, useUploadLeaseDocumentMutation } from "@/state/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const dateValue = (value?: string | Date | null) => value ? String(value).slice(0, 10) : "";

export default function LeaseDateEditor({ application, iconOnly = false }: { application: Application; iconOnly?: boolean }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaseFile, setLeaseFile] = useState<File | null>(null);
  const [updateStatus, { isLoading }] = useUpdateApplicationStatusMutation();
  const { data: leaseDocument } = useGetLeaseDocumentQuery(application.propertyId, { skip: !open });
  const [uploadDocument, { isLoading: isUploading }] = useUploadLeaseDocumentMutation();

  useEffect(() => {
    if (!open) return;
    setStartDate(dateValue(application.lease?.startDate));
    setEndDate(dateValue(application.lease?.endDate));
    setStep(1); setLeaseFile(null);
  }, [application.lease?.endDate, application.lease?.startDate, open]);

  const next = () => {
    if (!startDate || !endDate) return toast.error("Select both a start date and an end date.");
    if (endDate <= startDate) return toast.error("End date must be after start date.");
    setStep(2);
  };

  const approve = async () => {
    if (!leaseDocument?.available && !leaseFile) return toast.error("Upload a lease PDF before approving this application.");
    try {
      if (leaseFile) await uploadDocument({ propertyId: application.propertyId, file: leaseFile }).unwrap();
      await updateStatus({ id: application.id, status: "Approved", startDate, endDate }).unwrap();
      setOpen(false);
    } catch { /* API mutations display errors. */ }
  };

  return <>
    <Button type="button" variant={iconOnly ? "ghost" : "default"} size={iconOnly ? "icon" : "default"}
      className={iconOnly ? "h-7 w-7 text-gray-500 hover:text-primary-700" : "bg-green-600 text-white hover:bg-green-500"}
      aria-label={iconOnly ? "Review lease details" : undefined} onClick={() => setOpen(true)}>
      {iconOnly ? <Pencil className="h-4 w-4" /> : "Approve"}
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader><DialogTitle>{application.status === "Approved" ? "Review lease" : "Approve application"}</DialogTitle></DialogHeader>
        <p className="text-sm text-gray-500">Step {step} of 2 — {step === 1 ? "Lease dates" : "Lease document"}</p>
        {step === 1 ? <div className="grid gap-5 py-2 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor={`lease-start-${application.id}`}>Start Date</Label><Input id={`lease-start-${application.id}`} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor={`lease-end-${application.id}`}>End Date</Label><Input id={`lease-end-${application.id}`} type="date" min={startDate || undefined} value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
        </div> : <div className="space-y-4 py-2">
          <div className="rounded-lg border bg-gray-50 p-4"><p className="font-medium text-gray-900">{leaseFile?.name || leaseDocument?.fileName || "No lease document uploaded"}</p><p className="mt-1 text-sm text-gray-500">Review the current document or select a PDF to upload or replace it.</p></div>
          <Label htmlFor={`lease-document-${application.id}`} className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed p-5 text-violet-700 hover:bg-violet-50"><FileUp className="h-5 w-5" />{leaseDocument?.available ? "Replace lease PDF" : "Upload lease PDF"}</Label>
          <Input id={`lease-document-${application.id}`} className="hidden" type="file" accept="application/pdf,.pdf" onChange={(e) => setLeaseFile(e.target.files?.[0] || null)} />
        </div>}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => step === 2 ? setStep(1) : setOpen(false)} disabled={isLoading || isUploading}>{step === 2 ? "Back" : "Cancel"}</Button>
          <Button type="button" onClick={step === 1 ? next : approve} disabled={isLoading || isUploading} className="bg-primary-700 text-white hover:bg-primary-600">{isLoading || isUploading ? "Saving..." : step === 1 ? "Continue" : application.status === "Approved" ? "Save changes" : "Approve & send"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}
