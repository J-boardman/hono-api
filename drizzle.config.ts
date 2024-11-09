import { defineConfig } from "drizzle-kit";

// @ts-expect-error: It's okay to import from env
import env from "@/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
