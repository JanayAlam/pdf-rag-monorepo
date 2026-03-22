"use client";

import { FileList } from "@/components/file-list";
import { FileUploader } from "@/components/file-uploader";
import { Container } from "@/components/ui/container";
import { usePdfFiles } from "@/hooks/use-pdf-files";
import React from "react";

export const FileListAndUploadContainer: React.FC = () => {
  const { files, isFetching, fetchFileList, removeFile, deletingPaths } =
    usePdfFiles();

  return (
    <Container className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-0 sm:px-0 lg:px-0 py-4 md:py-6">
      <div className="md:col-span-2 max-sm:order-2">
        <FileList
          files={files}
          onRemove={removeFile}
          isLoading={isFetching}
          deletingPaths={deletingPaths}
        />
      </div>
      <div className="max-sm:order-1 h-60">
        <FileUploader fetchFileList={fetchFileList} />
      </div>
    </Container>
  );
};
