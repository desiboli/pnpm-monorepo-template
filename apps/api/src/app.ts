import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import type { Logger } from "pino";
import { notFound, onError } from "stoker/middlewares";
import { pinoLogger } from "./middlewares/pino-logger";

type AppBindings = {
	Variables: {
		logger: Logger;
	};
};

const app = new OpenAPIHono<AppBindings>();
app.use(requestId());
app.use(pinoLogger());

app.get("/", (c) => {
	c.var.logger.info("Hello Hono!");
	return c.text("Hello Hono!");
});

app.get("/error", (c) => {
	throw new Error("Test error!");
});

app.notFound(notFound);
app.onError(onError);

export default app;
