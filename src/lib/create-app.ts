import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings, AppOpenAPI } from "@/lib/types.js";

import notFound from "@/middleware/not-found.js";
import { pinoLogger } from "@/middleware/pino-logger.js";
import defaultHook from "@/openapi/default-hook.js";
import onError from "@/util/on-error.js";
import serveEmojiFavicon from "@/util/serve-emoji-favicon.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("🦄"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}
