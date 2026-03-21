import { OpenAIEmbeddings } from "@langchain/openai";
import { OPENAI_API_KEY } from "../settings/config";

export class VectorEmbeddings {
  private static instance: OpenAIEmbeddings | null = null;

  static getInstance(): OpenAIEmbeddings {
    if (!VectorEmbeddings.instance) {
      VectorEmbeddings.instance = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: OPENAI_API_KEY,
      });
    }

    return VectorEmbeddings.instance;
  }
}
