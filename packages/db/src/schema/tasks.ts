import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	done: boolean("done").notNull().default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
