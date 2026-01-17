import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { tasks } from "./schema/tasks";

// Data returned from the database (SELECT)
export type Task = InferSelectModel<typeof tasks>;
// Data sent to the database (INSERT)
export type NewTask = InferInsertModel<typeof tasks>;
