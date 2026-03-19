import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QDRANT_COLLECTION_NAME, QDRANT_URL } from "../settings/config";

export const getVectorStore = async (embeddings: OpenAIEmbeddings) => {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: QDRANT_URL,
      collectionName: QDRANT_COLLECTION_NAME,
    },
  );

  return vectorStore;
};
