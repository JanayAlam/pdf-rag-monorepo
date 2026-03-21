import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QDRANT_COLLECTION_NAME, QDRANT_URL } from "../settings/config";
import { VectorEmbeddings } from "./vector-embeddings";

export class VectorStore {
  private static instance: VectorStore | null = null;
  private vectorStore: QdrantVectorStore;

  private constructor(vectorStore: QdrantVectorStore) {
    this.vectorStore = vectorStore;
  }

  static async getInstance(
    embeddings: OpenAIEmbeddings = VectorEmbeddings.getInstance(),
  ): Promise<VectorStore> {
    if (!VectorStore.instance) {
      const store = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: QDRANT_URL,
        collectionName: QDRANT_COLLECTION_NAME,
      });
      VectorStore.instance = new VectorStore(store);
    }

    return VectorStore.instance;
  }

  getClient(): QdrantVectorStore {
    return this.vectorStore;
  }

  getRetriever(k = 5) {
    return this.vectorStore.asRetriever({ k });
  }

  asRetriever(options?: { k?: number }) {
    return this.vectorStore.asRetriever(options);
  }

  async addDocuments(docs: Parameters<QdrantVectorStore["addDocuments"]>[0]) {
    return this.vectorStore.addDocuments(docs);
  }

  async delete(params: Parameters<QdrantVectorStore["delete"]>[0]) {
    return this.vectorStore.delete(params);
  }
}
