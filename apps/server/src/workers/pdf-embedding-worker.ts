import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { VectorStore } from "../lib/vector-store";
import { VALKEY_HOST, VALKEY_PORT } from "../settings/config";
import { BULLMQ_QUEUE_NAME } from "../settings/constants";

const connection = new IORedis({
  host: VALKEY_HOST,
  port: VALKEY_PORT,
  maxRetriesPerRequest: null,
});

export const runPDFEmbeddingWorker = () => {
  const worker = new Worker(
    BULLMQ_QUEUE_NAME,
    async (job) => {
      const data = JSON.parse(job.data);

      const loader = new PDFLoader(data.path);
      const docs = await loader.load();

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const texts = await splitter.splitDocuments(docs);
      const sourcePath = data.path;
      const sourceFilename = data.filename;
      const textsWithSource = texts.map((doc) => {
        doc.metadata = {
          ...doc.metadata,
          source_file: sourcePath,
          source_filename: sourceFilename,
        };
        return doc;
      });

      const vectorStore = await VectorStore.getInstance();
      await vectorStore.addDocuments(textsWithSource);
    },
    { connection, concurrency: 100 },
  );

  worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
  });

  worker.on("failed", (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
  });

  return worker;
};
