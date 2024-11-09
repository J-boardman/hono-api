import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/lib/types.js";

import notFound from "@/middleware/not-found.js";
import { pinoLogger } from "@/middleware/pino-logger.js";
import onError from "@/util/on-error.js";
import serveEmojiFavicon from "@/util/serve-emoji-favicon.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>();
}

export default function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("🦄"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
