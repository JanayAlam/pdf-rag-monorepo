import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { UPLOAD_FOLDERNAME } from "../settings/constants";

const uploadDir = path.join(process.cwd(), UPLOAD_FOLDERNAME);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
