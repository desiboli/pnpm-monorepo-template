import { tasks } from "@pnpm-monorepo-template/db";
import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "./tasks.routes";

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
