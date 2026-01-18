import type { router } from "@pnpm-monorepo-template/api/routes";
import { hc } from "hono/client";

// Create typed instance (for type inference at build time)
const client = hc<router>("");
export type ApiClient = typeof client;

// Export factory function
export default function createClient(
	baseUrl: string,
	options?: Parameters<typeof hc>[1],
): ApiClient {
	return hc<router>(baseUrl, options);
}

// Re-export types for convenience
export type { NewTask, Task } from "@pnpm-monorepo-template/db";
