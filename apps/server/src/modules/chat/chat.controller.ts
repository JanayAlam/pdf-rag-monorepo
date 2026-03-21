import { Request, Response } from "express";
import { agent } from "../../lib/agent";
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
  const retrieval = vectorStore.asRetriever({ k: 5 });

  const context = await retrieval.invoke(data.query);
  const contextText = context.map((r) => r.pageContent).join("\n\n");

  const result = await agent.invoke({
    messages: [
      `QUESTION: ${data.query}

CONTEXT:
${contextText}
`,
    ],
  });

  res.json({
    isSuccess: true,
    data: {
      output: result.structuredResponse.message,
      context: contextText,
    },
  });
};
