import cors from "cors";
import express from "express";
import morgan from "morgan";
import chatRouter from "./modules/chat/chat.router";
import pdfRouter from "./modules/pdf/pdf.router";
import { NODE_ENV } from "./settings/config";

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));

app.get("/", (_req, res) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.use("/api/v1/pdfs", pdfRouter);
app.use("/api/v1/chats", chatRouter);

export default app;
