import { createRoute, z } from "@hono/zod-openapi";
import {
	insertTasksSchema,
	selectTasksSchema,
} from "@pnpm-monorepo-template/db";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

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

export const create = createRoute({
	method: "post",
	path: "/tasks",
	request: {
		body: jsonContentRequired(insertTasksSchema, "The created task"),
	},
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The created task"),
	},
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
