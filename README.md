# pnpm Monorepo Template

A production-ready monorepo template featuring **TanStack Start**, **Next.js**, and a **Hono API** with end-to-end type safety.

## ✨ Features

- 🏗️ **Monorepo** — pnpm workspaces for efficient package management
- 🔷 **Type-safe API** — Hono + Zod OpenAPI with auto-generated docs
- 🔄 **End-to-end types** — From database → API → frontend (zero codegen)
- 🗄️ **Database** — Drizzle ORM with Neon serverless Postgres
- 🎨 **Shared UI** — Radix + Tailwind + shadcn/ui components
- ⚡ **Modern tooling** — Biome for linting/formatting, Vite, TypeScript 5

---

## 📦 What's Inside

```
├── apps/
│   ├── api/              # Hono API with Zod OpenAPI
│   ├── my-next-app/      # Next.js 16 application
│   └── my-tanstack-app/  # TanStack Start application
│
├── packages/
│   ├── api-client/       # Type-safe Hono RPC client
│   ├── db/               # Drizzle ORM schemas & client
│   └── shared-ui/        # Shared React components
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm 10+
- A Postgres database (e.g., [Neon](https://neon.tech))

### Setup

```bash
# Clone and install
git clone <your-repo-url>
cd pnpm-monorepo-template
pnpm install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit .env with your DATABASE_URL

# Push database schema
pnpm --filter @pnpm-monorepo-template/db db:push

# Start all apps in development
pnpm dev
```

### Access Points

| App | URL |
|-----|-----|
| API | http://localhost:9999/api |
| API Docs | http://localhost:9999/api/reference |
| TanStack App | http://localhost:4000 |
| Next.js App | http://localhost:3000 |

---

## 🏛️ Architecture

### Type-Safe API Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  packages/db │────▶│   apps/api   │────▶│  api-client  │
│              │     │              │     │              │
│ • Drizzle    │     │ • Hono       │     │ • Hono RPC   │
│ • Zod schemas│     │ • OpenAPI    │     │ • Full types │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                     ┌───────────────────────────┼───────────────────────────┐
                     │                           │                           │
                     ▼                           ▼                           ▼
              ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
              │  TanStack    │           │   Next.js    │           │  (Your app)  │
              │    Start     │           │     App      │           │              │
              └──────────────┘           └──────────────┘           └──────────────┘
```

### How Types Flow

1. **Database schema** → Drizzle table in `packages/db`
2. **Zod schemas** → Derived from Drizzle via `drizzle-zod`
3. **API routes** → Use Zod schemas, Hono infers types
4. **API client** → `hc<router>` gives full type inference
5. **Frontend** → Fully typed API calls with autocomplete

---

## 📁 Package Details

### `apps/api` — Hono API

REST API with automatic OpenAPI documentation.

```bash
pnpm --filter @pnpm-monorepo-template/api dev
```

**Key files:**
- `src/routes/` — Route definitions and handlers
- `src/lib/create-app.ts` — App factory with middleware
- `src/env.ts` — Zod-validated environment variables

**API documentation** is auto-generated at `/api/reference` using Scalar.

---

### `apps/my-tanstack-app` — TanStack Start

Full-stack React framework with file-based routing.

```bash
pnpm --filter @pnpm-monorepo-template/my-tanstack-app dev
```

**Data fetching** uses the type-safe API client:

```tsx
import { api } from "../lib/api";

export const Route = createFileRoute("/")({
  loader: async () => {
    const response = await api.tasks.$get();
    return response.json(); // ← Typed as Task[]
  },
  component: App,
});
```

---

### `apps/my-next-app` — Next.js

Next.js 16 with App Router and server components.

```bash
pnpm --filter @pnpm-monorepo-template/my-next-app dev
```

---

### `packages/db` — Database

Drizzle ORM with schema definitions and Zod validation schemas.

```bash
# Generate migrations
pnpm --filter @pnpm-monorepo-template/db db:generate

# Push schema to database
pnpm --filter @pnpm-monorepo-template/db db:push

# Open Drizzle Studio
pnpm --filter @pnpm-monorepo-template/db db:studio
```

**Adding a new table:**

```typescript
// packages/db/src/schema/users.ts
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
});

export const selectUsersSchema = createSelectSchema(users);
export const insertUsersSchema = createInsertSchema(users).omit({ id: true });
```

---

### `packages/api-client` — Type-Safe Client

Hono RPC client that provides full type inference from your API routes.

```typescript
import createClient from "@pnpm-monorepo-template/api-client";

const api = createClient("http://localhost:9999/api");

// Fully typed! ✨
const response = await api.tasks.$post({
  json: { name: "Buy milk", done: false },
});
const task = await response.json(); // Task type
```

---

### `packages/shared-ui` — Component Library

Shared React components built with Radix UI and Tailwind CSS.

```tsx
import { Button, Card } from "@pnpm-monorepo-template/shared-ui";
```

**Adding new shadcn components:**

```bash
cd packages/shared-ui
pnpm dlx shadcn@latest add dialog
```

---

## 🛠️ Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages with Biome |
| `pnpm --filter <name> <script>` | Run script in specific package |

---

## 🔧 Environment Variables

### `apps/api/.env`

```bash
NODE_ENV=development
PORT=9999
LOG_LEVEL=debug
DATABASE_URL=postgresql://user:pass@host/db
```

### `apps/my-tanstack-app/.env`

```bash
VITE_API_URL=http://localhost:9999/api
```

### `apps/my-next-app/.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:9999/api
```

---

## 📝 Adding a New API Endpoint

1. **Define the route** in `apps/api/src/routes/<resource>/<resource>.routes.ts`:

```typescript
import { createRoute } from "@hono/zod-openapi";
import { selectUsersSchema } from "@pnpm-monorepo-template/db/schema";

export const list = createRoute({
  method: "get",
  path: "/users",
  responses: {
    200: jsonContent(z.array(selectUsersSchema), "List of users"),
  },
});
```

2. **Add the handler** in `<resource>.handlers.ts`:

```typescript
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
};
```

3. **Register the route** in `<resource>.index.ts`:

```typescript
const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;
```

4. **Use it in the frontend** — types are automatically available:

```typescript
const response = await api.users.$get();
const users = await response.json(); // User[]
```

---

## 📚 Tech Stack

| Category | Technology |
|----------|------------|
| **Monorepo** | pnpm workspaces |
| **API** | Hono, Zod OpenAPI, Scalar |
| **Database** | Drizzle ORM, Neon Postgres |
| **Frontend** | TanStack Start, Next.js 16, React 19 |
| **Styling** | Tailwind CSS 4, Radix UI |
| **Tooling** | Biome, TypeScript 5, Vite 7 |

---

## 📄 License

MIT
