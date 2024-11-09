import type { AppRouteHandler } from "@/lib/types.js";

import { db } from "@/db/index.js";
import { tasks } from "@/db/schema.js";
import * as HttpStatusCodes from "@/util/http-status-codes.js";

import type { CreateRoute, ListRoute } from "./tasks.routes.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");

  const [inserted] = await db.insert(tasks).values(task).returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};
