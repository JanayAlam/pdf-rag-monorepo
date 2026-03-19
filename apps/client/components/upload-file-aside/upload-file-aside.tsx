"use client";

import { PDFList } from "./pdf-list";
import { PDFUploader } from "./pdf-uploader";
import { usePdfFiles } from "./use-pdf-files";

export const UploadFileAside = () => {
  const { files, isFetching, fetchFileList, removeFile, deletingPaths } =
    usePdfFiles();

  return (
    <aside className="h-full flex flex-col items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <PDFUploader fetchFileList={fetchFileList} />
      <PDFList
        files={files}
        isLoading={isFetching}
        onRemove={removeFile}
        deletingPaths={deletingPaths}
      />
    </aside>
  );
};
