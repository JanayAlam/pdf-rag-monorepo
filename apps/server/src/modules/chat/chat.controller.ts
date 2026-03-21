import { Request, Response } from "express";
import { PDFRAGAgent } from "../../lib/pdf-rag-agent";
import { VectorStore } from "../../lib/vector-store";
import { insertQueryValidationSchema } from "./chat.validation-schema";

export const insertQueryController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } =
      await insertQueryValidationSchema.safeParse(req.body);

    if (!success) {
      res.json({
        isSuccess: false,
        message: error.issues?.[0].message,
      });
      return;
    }

    const vectorStore = await VectorStore.getInstance();
    const retriever = await vectorStore.getRetriever();

    const context = await retriever.invoke(data.query);
    const contextText = context.map((r) => r.pageContent).join("\n\n");

    const result = await PDFRAGAgent.getInstance().invoke({
      messages: [
        `QUESTION: ${data.query}
CONTEXT: ${contextText}`,
      ],
    });

    res.json({
      isSuccess: true,
      data: {
        output: result.structuredResponse.message,
        context: contextText,
      },
    });
  } catch (err) {
    res.json({
      isSuccess: false,
      message: `Error occurred: ${err}`,
    });
  }
};
