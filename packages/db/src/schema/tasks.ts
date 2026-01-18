import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = pgTable("tasks", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	done: boolean("done").notNull().default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const selectTasksSchema = createSelectSchema(tasks);
export const insertTasksSchema = createInsertSchema(tasks).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
