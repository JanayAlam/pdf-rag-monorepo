import { cn } from "@/lib/utils";
import { TFileItem } from "@/types";
import { FileIcon, FileText, FileX2, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface IFileListProps {
  files: Array<TFileItem>;
  isLoading?: boolean;
  onRemove: (file: TFileItem) => void;
  deletingPaths: Record<string, boolean>;
}

export const FileList: React.FC<IFileListProps> = ({
  files,
  isLoading = false,
  onRemove,
  deletingPaths,
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center h-full">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner className="size-6" />
            </EmptyMedia>
            <EmptyTitle>Fetching file list</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 h-60">
      {files.length ? (
        <div className="h-full flex flex-col gap-3">
          <p className="text-sm">Uploaded files</p>
          <ScrollArea className="h-full rounded-md">
            <div
              className={cn(
                "grid gap-2",
                files.length == 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2",
              )}
            >
              {files.map((file) => (
                <Tooltip key={file.path}>
                  <TooltipTrigger>
                    <Item key={file.path} className="bg-muted">
                      <ItemMedia variant="icon">
                        {file.filename.split(".").at(-1)?.toLowerCase() ===
                        "pdf" ? (
                          <FileText className="size-5" />
                        ) : (
                          <FileIcon className="size-5" />
                        )}
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="font-bold">PDF</ItemTitle>
                        <ItemDescription className="line-clamp-1 text-xs">
                          {file.filename}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Button
                          onClick={() => onRemove(file)}
                          disabled={Boolean(deletingPaths[file.path])}
                          variant="destructive"
                        >
                          {Boolean(deletingPaths[file.path]) ? (
                            <Spinner />
                          ) : (
                            <Trash2 />
                          )}
                        </Button>
                      </ItemActions>
                    </Item>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{file.filename}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileX2 className="size-6" />
              </EmptyMedia>
              <EmptyTitle>No files uploaded yet</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </div>
  );
};
