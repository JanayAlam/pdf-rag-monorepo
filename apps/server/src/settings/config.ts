export const NODE_ENV = process.env.NODE_ENV || "development";

export const PORT = Number(process.env.PORT) || 8000;

export const QDRANT_URL = process.env.QDRANT_URL;
export const QDRANT_COLLECTION_NAME = process.env.QDRANT_COLLECTION_NAME;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const VALKEY_HOST = process.env.VALKEY_HOST || "localhost";
export const VALKEY_PORT = Number(process.env.VALKEY_PORT) || 6379;
