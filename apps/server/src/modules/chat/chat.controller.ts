import { Request, Response } from "express";
import { getEmbeddings } from "../../lib/embeddings";
import { getVectorStore } from "../../lib/vector-store";
import { insertQueryValidationSchema } from "./validation-schema";

export const insertQueryController = async (req: Request, res: Response) => {
  const { success, data, error } = await insertQueryValidationSchema.safeParse(
    req.body,
  );

  if (!success) {
    res.json({
      isSuccess: false,
      message: error.issues?.[0].message,
    });
    return;
  }

  const embeddings = getEmbeddings();

  const vectorStore = await getVectorStore(embeddings);
  const retrieval = vectorStore.asRetriever({ k: 2 });

  const result = await retrieval.invoke(data.query);

  res.json({
    isSuccess: true,
    data: {
      result: "",
      context: result.map((r) => r.pageContent).join("\n\n"),
    },
  });
};
