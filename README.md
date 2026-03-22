# pdf-rag

PDF RAG system that ingests PDFs, embeds them into a vector database, and answers chat queries using retrieval-augmented generation.

## Tech Stack

- Monorepo: pnpm + Lerna
- Client: Next.js (React) with Tailwind
- Server: Express + TypeScript
- Vector DB: Qdrant
- Queue: BullMQ backed by Valkey (Redis-compatible)
- LLM + Embeddings: OpenAI (via LangChain and OpenAI Agents)

## Requirements

- Node.js (LTS recommended)
- pnpm `9.0.0`
- Docker (for Valkey and Qdrant)

## Development Setup

1. Install dependencies

```bash
pnpm install
```

2. Start infrastructure services (Valkey + Qdrant)

```bash
docker compose up -d
```

3. Configure environment variables

```bash
cp apps/server/.env.example apps/server/.env.local
```

4. Update `apps/server/.env.local` with required values

5. Run the apps in dev mode

```bash
pnpm dev
```

6. Run the embedding worker in dev mode

```bash
pnpm dev:worker
```

## Environment Variables

These are defined in `apps/server/.env.example` and loaded from `apps/server/.env.local`.

- `NODE_ENV` default `development`
- `PORT` default `8000`
- `QDRANT_URL` Qdrant HTTP endpoint
- `QDRANT_COLLECTION_NAME` collection for document vectors
- `OPENAI_API_KEY` OpenAI API key used for embeddings and chat
- `VALKEY_HOST` default `localhost`
- `VALKEY_PORT` default `6379`

## Docker Compose

The `docker-compose.yaml` file starts:

- Valkey on `6379`
- Qdrant on `6333`

## System Architecture

- Client calls the server API for PDF uploads and chat queries.
- Server stores uploaded PDFs on disk and publishes a BullMQ job to Valkey.
- Worker consumes jobs, loads PDFs, chunks them, generates embeddings, and stores vectors in Qdrant.
- Chat endpoint retrieves relevant chunks from Qdrant and sends them with the user query to the LLM.

## System Flow

1. Upload PDF to `POST /api/v1/pdfs`.
2. Server saves file to `uploads/` and queues a job in BullMQ (Valkey).
3. Worker loads the PDF, splits into chunks, generates embeddings, and stores them in Qdrant.
4. Chat query to `POST /api/v1/chats`.
5. Server retrieves top-k chunks from Qdrant and calls the LLM with question + context.
6. Response is returned to the client.

## Common Scripts

```bash
# Run all apps in dev mode
pnpm dev

# Run worker in dev mode
pnpm dev:worker

# Build all packages/apps
pnpm build

# Start all apps
pnpm start

# Start worker
pnpm start:worker

# Lint all packages/apps
pnpm lint
```

## Workspace Layout

- `apps/client` client application
- `apps/server` server application and worker
- `packages/*` shared packages (if any)

## License

This project is licensed for non-commercial use only. See `LICENSE` for details.
