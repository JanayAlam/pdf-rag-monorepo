import { API_SERVER_URL } from "@/lib/config";
import { TFileItem } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const usePdfFiles = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [files, setFiles] = useState<TFileItem[]>([]);
  const [deletingPaths, setDeletingPaths] = useState<Record<string, boolean>>(
    {},
  );

  const fetchFileList = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`${API_SERVER_URL}/pdfs`, {
        method: "get",
        cache: "no-store",
      });

      if (!res.ok) {
        toast.error("Couldn't fetch the list of files");
        return;
      }

      const { isSuccess, data } = await res.json();

      if (!isSuccess) {
        toast.error("Couldn't fetch the list of files");
        return;
      }

      setFiles(data);
    } catch (err) {
      toast.error((err as Error).message || "Couldn't fetch the list of files");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const removeFile = useCallback(async (file: TFileItem) => {
    setDeletingPaths((prev) => ({ ...prev, [file.path]: true }));
    const toastId = toast.loading("Deleting file...");
    try {
      const res = await fetch(`${API_SERVER_URL}/pdfs`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: file.path }),
      });

      if (!res.ok) {
        throw new Error("Couldn't delete the file");
      }

      const { isSuccess, message } = await res.json();

      if (!isSuccess) {
        throw new Error(message || "Couldn't delete the file");
      }

      setFiles((prev) => prev.filter((item) => item.path !== file.path));
      toast.success(message || "File deleted", { id: toastId });
    } catch (err) {
      toast.error((err as Error).message || "Couldn't delete the file", {
        id: toastId,
      });
    } finally {
      setDeletingPaths((prev) => {
        const next = { ...prev };
        delete next[file.path];
        return next;
      });
    }
  }, []);

  useEffect(() => {
    fetchFileList();
  }, [fetchFileList]);

  return {
    files,
    isFetching,
    fetchFileList,
    removeFile,
    deletingPaths,
  };
};
