import createClient from "@pnpm-monorepo-template/api-client";

const client = createClient(
	import.meta.env.VITE_API_URL ?? "http://localhost:9999/api",
);

export const api = client;
