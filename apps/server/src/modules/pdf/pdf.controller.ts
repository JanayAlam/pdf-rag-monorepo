import { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { queue } from "../../lib/bullmq-queue";

export const pdfUploadController = async (req: Request, res: Response) => {
  if (!req.file) {
    res.json({
      isSuccess: false,
      message: "Couldn't find the file",
    });
    return;
  }

  await queue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      source: req.file.destination,
      path: req.file.path,
    }),
  );

  res.json({
    isSuccess: true,
    message: "PDF uploaded successfully",
  });
};

export const listUploadsController = async (_req: Request, res: Response) => {
  const uploadDir = path.join(process.cwd(), "uploads");

  try {
    const entries = await fs.readdir(uploadDir, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => ({
        filename: entry.name,
        path: path.join(uploadDir, entry.name),
      }));

    res.json({
      isSuccess: true,
      data: files,
    });
  } catch (error) {
    res.json({
      isSuccess: false,
      data: [],
    });
  }
};

export const deleteFileController = async (req: Request, res: Response) => {
  const uploadDir = path.join(process.cwd(), "uploads");
  const requestedPath = typeof req.body?.path === "string" ? req.body.path : "";

  if (!requestedPath) {
    res.json({
      isSuccess: false,
      message: "Path is required",
    });
    return;
  }

  const normalizedPath = path.resolve(
    uploadDir,
    path.isAbsolute(requestedPath)
      ? path.relative(uploadDir, requestedPath)
      : requestedPath,
  );

  if (!normalizedPath.startsWith(`${uploadDir}${path.sep}`)) {
    res.json({
      isSuccess: false,
      message: "Invalid path",
    });
    return;
  }

  try {
    await fs.unlink(normalizedPath);
    res.json({
      isSuccess: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    res.json({
      isSuccess: false,
      message: "Couldn't delete the file",
    });
  }
};
