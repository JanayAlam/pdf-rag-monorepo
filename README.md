# pdf-rag

A pnpm + Lerna monorepo for the pdf-rag project.

## Requirements

- Node.js (LTS recommended)
- pnpm `10.14.0` (as specified in `package.json`)

## Install

```bash
pnpm install
```

## Common Scripts

```bash
# Run all apps in dev mode
pnpm dev

# Build all packages/apps
pnpm build

# Start all apps
pnpm start

# Lint all packages/apps
pnpm lint
```

## Workspace Layout

- `apps/client` - Client application
- `apps/server` - Server application
- `packages/*` - Shared packages (if any)

## Notes

This repo uses Lerna to orchestrate workspace scripts across packages.
