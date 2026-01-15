import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = (c) => {
	c.var.logger.info("Listing tasks");
	return c.json([
		{ name: "Task 1", done: false },
		{ name: "Task 2", done: true },
		{ name: "Task 3", done: false },
	]);
};
