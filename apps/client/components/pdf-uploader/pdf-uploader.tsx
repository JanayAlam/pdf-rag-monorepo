"use client";

import React from "react";
import { FileUploadInput } from "../inputs/file-upload-input";

export const PDFUploader: React.FC = () => {
  const onFileChange = (file: File | null) => {};

  return (
    <FileUploadInput
      fileType="pdf"
      accept=".pdf,application/pdf"
      onFileChange={onFileChange}
    />
  );
};
