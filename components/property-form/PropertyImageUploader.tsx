"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

type UploadFile = {
  id: number;
  name: string;
  preview: string;
  progress: number;
};

type PropertyImageUploaderProps = {
  files: UploadFile[];
  onAddFiles: (files: FileList | null) => void;
  onRemoveFile: (id: number) => void;
};

export default function PropertyImageUploader({
  files,
  onAddFiles,
  onRemoveFile,
}: PropertyImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const completedCount = useMemo(
    () => files.filter((file) => file.progress >= 100).length,
    [files]
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[14px] text-[var(--muted)]">
          Upload Property Image{" "}
          <span className="text-[13px]">
            (Add Property Front Elevation For Better Reach)
          </span>
        </p>
      </div>

      <div className="rounded-[18px] border border-dashed border-[var(--brand)] bg-[rgba(139,76,246,0.08)] px-6 py-12 text-center">
        <div className="mx-auto flex w-fit flex-col items-center">
          <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--brand)]">
            <FileUploadOutlinedIcon />
          </span>

          <p className="text-[18px] font-medium">Drop your files here</p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-[10px] bg-[var(--brand)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            Choose File
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => onAddFiles(e.target.files)}
          />
        </div>
      </div>

      <p className="text-[13px] text-[var(--muted)]">
        * You can add Min 3 & up to 10 images
      </p>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 rounded-[14px] border border-[var(--border)] bg-white px-4 py-3"
            >
              <div className="relative h-[42px] w-[56px] shrink-0 overflow-hidden rounded-[8px]">
                <Image src={file.preview} alt={file.name} fill className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium">{file.name}</p>

                <div className="mt-2 h-2 w-full max-w-[280px] overflow-hidden rounded-full bg-[#e9e9ee]">
                  <div
                    className="h-full rounded-full bg-[var(--brand)]"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>

                <p className="mt-1 text-[11px] text-[var(--muted)]">
                  {file.progress >= 100 ? "Completed" : `${file.progress}%`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="text-[var(--muted)] transition-colors hover:text-red-500"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </button>
            </div>
          ))}

          <p className="text-[12px] text-[var(--muted)]">
            {completedCount} completed / {files.length} uploaded
          </p>
        </div>
      )}
    </div>
  );
}