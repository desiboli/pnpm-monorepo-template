import { tasks } from "@pnpm-monorepo-template/db";
import { db } from "../../lib/db";
import type { AppRouteHandler } from "../../lib/types";
import type { CreateRoute, ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
	c.var.logger.info("Listing tasks");
	const allTasks = await db.select().from(tasks);
	return c.json(allTasks);
	// return c.json([
	// 	{ name: "Task 1", done: false },
	// 	{ name: "Task 2", done: true },
	// 	{ name: "Task 3", done: false },
	// ]);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
	c.var.logger.info("Creating task");
	const task = c.req.valid("json");
	const [inserted] = await db.insert(tasks).values(task).returning();
	return c.json(inserted);
};
