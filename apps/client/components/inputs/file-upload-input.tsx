"use client";

import { cn } from "@/lib/utils";
import {
  FileText,
  Image as ImageIcon,
  Music,
  UploadCloud,
  Video,
} from "lucide-react";
import React, { ChangeEvent, DragEvent, useRef, useState } from "react";

type TFileType = "pdf" | "image" | "video" | "audio" | "document" | "any";

type TFileUploadInputProps = {
  accept?: string;
  fileType?: TFileType;
  value?: File | null;
  onFileChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
};

function getIconForType(fileType: TFileType) {
  switch (fileType) {
    case "image":
      return ImageIcon;
    case "video":
      return Video;
    case "audio":
      return Music;
    case "pdf":
    case "document":
      return FileText;
    default:
      return UploadCloud;
  }
}

export const FileUploadInput: React.FC<TFileUploadInputProps> = ({
  accept,
  fileType = "any",
  value,
  onFileChange,
  className = "",
  disabled = false,
  label = "Upload file",
  description = "Drag and drop or click to browse",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const file = value !== undefined ? value : internalFile;
  const Icon = getIconForType(fileType);

  const setFile = (next: File | null) => {
    if (value === undefined) setInternalFile(next);
    onFileChange?.(next);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0] ?? null;
    setFile(dropped);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "w-full rounded-xl border border-dashed p-6 sm:min-h-50 transition-colors",
          "flex flex-col items-center justify-center gap-2 text-center",
          "bg-background/60",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <Icon className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
        {file ? (
          <div className="mt-2 text-xs text-foreground/80">
            Selected: <span className="font-medium">{file.name}</span>
          </div>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleSelect}
        disabled={disabled}
      />
    </div>
  );
};
