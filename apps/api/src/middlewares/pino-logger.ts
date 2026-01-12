import type { Context, MiddlewareHandler, Next } from "hono";
import pinoHttp from "pino-http";
// import env from "@/env"

export function pinoLogger(): MiddlewareHandler {
	return async (c: Context, next: Next) => {
		// pass hono's request-id to pino-http
		c.env.incoming.id = c.var.requestId;

		// map express style middleware to hono
		await new Promise<void>((resolve) =>
			pinoHttp({
				level: process.env.LOG_LEVEL || "info",
				transport:
					process.env.NODE_ENV !== "production"
						? {
								level: process.env.LOG_LEVEL || "info",
								target: "pino-pretty",
							}
						: undefined,
			})(c.env.incoming, c.env.outgoing, () => resolve()),
		);

		c.set("logger", c.env.incoming.log);

		await next();
	};
}
