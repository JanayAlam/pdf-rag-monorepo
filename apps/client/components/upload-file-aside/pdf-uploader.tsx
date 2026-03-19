"use client";

import { API_SERVER_URL } from "@/lib/config";
import React from "react";
import { toast } from "sonner";
import { FileUploadInput } from "../inputs/file-upload-input";

interface IPDFUploaderProps {
  fetchFileList: () => Promise<void>;
}

export const PDFUploader: React.FC<IPDFUploaderProps> = ({ fetchFileList }) => {
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
      fetchFileList();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <FileUploadInput
      fileType="pdf"
      accept=".pdf,application/pdf"
      onFileChange={onFileChange}
    />
  );
};
