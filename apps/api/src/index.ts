import { serve } from "@hono/node-server";
import app from "./app";

serve(
	{
		fetch: app.fetch,
		port: 8787,
	},
	(info) => {
		// biome-ignore lint/suspicious/noConsole: we need to log the server is running
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
