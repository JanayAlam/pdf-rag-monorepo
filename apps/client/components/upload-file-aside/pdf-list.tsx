import { TFileItem } from "@/types";
import { X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface IPDFListProps {
  files: Array<TFileItem>;
  isLoading?: boolean;
  onRemove: (file: TFileItem) => void;
  deletingPaths: Record<string, boolean>;
}

interface IPDFItemProps {
  file: TFileItem;
  onRemove: (file: TFileItem) => void;
  isDeleting: boolean;
}

const PDFItem: React.FC<IPDFItemProps> = ({ file, onRemove, isDeleting }) => {
  return (
    <div className="flex items-center gap-2 rounded-md px-3 py-2 border shrink-0 min-w-55 md:min-w-0 md:w-full">
      <Button
        variant="destructive"
        className="rounded-full w-5! h-5! flex items-center justify-center border"
        onClick={() => onRemove(file)}
        disabled={isDeleting}
      >
        {isDeleting ? <Spinner className="size-3" /> : <X className="size-3" />}
      </Button>
      <p className="leading-5 text-sm">{file.filename}</p>
    </div>
  );
};

export const PDFList: React.FC<IPDFListProps> = ({
  files,
  isLoading = false,
  onRemove,
  deletingPaths,
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <div className="w-full flex-1 min-h-0">
      {files.length ? (
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden flex-nowrap pb-2 md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-0">
          {files.map((file) => (
            <PDFItem
              key={file.path}
              file={file}
              onRemove={onRemove}
              isDeleting={Boolean(deletingPaths[file.path])}
            />
          ))}
        </div>
      ) : (
        <p className="text-destructive text-sm text-center">
          No files uploaded yet
        </p>
      )}
    </div>
  );
};
