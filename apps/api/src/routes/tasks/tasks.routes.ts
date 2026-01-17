import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["tasks"];

export const list = createRoute({
	method: "get",
	path: "/tasks",
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(
				z.object({
					id: z.uuid(),
					name: z.string(),
					done: z.boolean(),
					createdAt: z.coerce.date(),
					updatedAt: z.coerce.date(),
				}),
			),
			"The list of tasks",
		),
	},
});

export type ListRoute = typeof list;
