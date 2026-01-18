import type { z } from "zod";
import type { insertTasksSchema, selectTasksSchema } from "./schema/tasks";

// Derive types from Zod schemas (single source of truth)
export type Task = z.infer<typeof selectTasksSchema>;
export type NewTask = z.infer<typeof insertTasksSchema>;
