import { Router } from "express";
import { upload } from "../../middlewares/multer";
import {
  deleteFileController,
  listUploadsController,
  pdfUploadController,
} from "./pdf.controller";

const pdfRouter = Router({ mergeParams: true });

pdfRouter.post("/", upload.single("pdf"), pdfUploadController);
pdfRouter.get("/", listUploadsController);
pdfRouter.delete("/", deleteFileController);

export default pdfRouter;
