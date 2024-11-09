import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app.js";
import jsonContent from "@/openapi/helpers/json-content.js";
import { createMessageObjectSchema } from "@/openapi/schemas/create-message-object.js";
import * as HttpStatusCodes from "@/util/http-status-codes.js";

const router = createRouter().openapi(createRoute({
  tags: ["Index"],
  method: "get",
  path: "/",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("Tasks API"), "Tasks API Index"),
  },
}), (c) => {
  return c.json({ message: "Tasks API" });
});

export default router;
