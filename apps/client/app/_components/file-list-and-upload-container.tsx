"use client";

import { FileList } from "@/components/file-list";
import { FileUploader } from "@/components/file-uploader";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { usePdfFiles } from "@/hooks/use-pdf-files";
import React from "react";

export const FileListAndUploadContainer: React.FC = () => {
  const { files, isFetching, fetchFileList, removeFile, deletingPaths } =
    usePdfFiles();

  return (
    <Container className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-0 sm:px-0 lg:px-0">
      <div className="md:col-span-2 max-sm:order-2">
        <Card>
          <CardContent className="rounded-md">
            <FileList
              files={files}
              onRemove={removeFile}
              isLoading={isFetching}
              deletingPaths={deletingPaths}
            />
          </CardContent>
        </Card>
      </div>
      <div className="max-sm:order-1 h-full">
        <FileUploader fetchFileList={fetchFileList} />
      </div>
    </Container>
  );
};
