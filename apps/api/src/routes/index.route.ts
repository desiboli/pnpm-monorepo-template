import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { createRouter } from "../lib/create-app";

const router = createRouter().openapi(
	createRoute({
		tags: ["index"], // In which group the route should be placed
		method: "get",
		path: "/",
		responses: {
			[HttpStatusCodes.OK]: jsonContent(
				createMessageObjectSchema("API running"),
				"API index",
			),
		},
	}),
	(c) => {
		return c.json({ message: "API is running" }, HttpStatusCodes.OK);
	},
);

export default router;
