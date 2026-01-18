import createClient from "@pnpm-monorepo-template/api-client";

const client = createClient(
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9999/api",
);

// Export the nested api path directly
export const api = client;
