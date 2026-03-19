import { OpenAIEmbeddings } from "@langchain/openai";
import { OPENAI_API_KEY } from "../settings/config";

export const getEmbeddings = () => {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: OPENAI_API_KEY,
  });

  return embeddings;
};
