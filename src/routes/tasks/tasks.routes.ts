import { createRoute, z } from "@hono/zod-openapi";

import { createTasksSchema, selectTasksSchema } from "@/db/schema.js";
import jsonContentRequired from "@/openapi/helpers/json-content-required.js";
import jsonContent from "@/openapi/helpers/json-content.js";
import createErrorSchema from "@/openapi/schemas/create-error-schema.js";
import * as HttpStatusCodes from "@/util/http-status-codes.js";

const tags = ["Tasks"];

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The list of tasks",
    ),
  },
});

export const create = createRoute({
  path: "/tasks",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(createTasksSchema, "Task to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectTasksSchema,
      "Created task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createTasksSchema),
      "The validation error(s)",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
