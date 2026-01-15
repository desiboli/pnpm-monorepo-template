import { serve } from "@hono/node-server";
import app from "./app";
import env from "./env";

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		// biome-ignore lint/suspicious/noConsole: we need to log the server is running
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
