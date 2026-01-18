import { BASE_PATH } from "../lib/constants";
import { createRouter } from "../lib/create-app";
import type { AppOpenAPI } from "../lib/types";
import index from "./index.route";
import tasks from "./tasks/tasks.index";

export function registerRoutes(app: AppOpenAPI) {
	return app.route("/", index).route("/", tasks);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type router = typeof router;
