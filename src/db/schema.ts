import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const currentTimestamp = sql`(CURRENT_TIMESTAMP)`;

export const tasks = sqliteTable("tasks", {
  id: integer({ mode: "number" })
    .primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  done: integer({ mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text().default(currentTimestamp),
  updatedAt: text().default(currentTimestamp).$onUpdate(() => currentTimestamp),
});

export const selectTasksSchema = createSelectSchema(tasks);
export const createTasksSchema = createInsertSchema(tasks, {
  name: schema => schema.name.min(1),
})
  .required({
    done: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export const patchTasksSchema = createTasksSchema.partial();
