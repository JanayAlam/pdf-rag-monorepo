"use client";

import { API_SERVER_URL } from "@/lib/config";
import React, { useState } from "react";
import { toast } from "sonner";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "../ui/dropzone";

interface IFileUploaderProps {
  fetchFileList: () => Promise<void>;
}

export const FileUploader: React.FC<IFileUploaderProps> = ({
  fetchFileList,
}) => {
  const [files, setFiles] = useState<File[]>();

  const onFileChange = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch(`${API_SERVER_URL}/pdfs`, {
        method: "post",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Couldn't upload the pdf file");
      }

      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      setFiles(undefined);
      fetchFileList();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <Dropzone
      src={files}
      onDrop={(acceptedFiles) => {
        setFiles(acceptedFiles);
        onFileChange(acceptedFiles.at(0) ?? null);
      }}
      onError={(error) => {
        toast.error(error.message);
      }}
      accept={{ "application/pdf": [".pdf"] }}
      maxFiles={1}
      className="h-full"
    >
      <DropzoneContent />
      <DropzoneEmptyState />
    </Dropzone>
  );
};
