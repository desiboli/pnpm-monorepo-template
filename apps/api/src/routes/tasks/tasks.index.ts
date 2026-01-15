import { createRouter } from "@/lib/create-app";
import * as tasksHandlers from "./tasks.handlers";
import * as tasksRoutes from "./tasks.routes";

const router = createRouter().openapi(tasksRoutes.list, tasksHandlers.list);

export default router;
