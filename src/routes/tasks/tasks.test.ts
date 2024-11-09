/* eslint-disable ts/ban-ts-comment */
import { testClient } from "hono/testing";
import { describe, expect, expectTypeOf, it } from "vitest";

import createApp, { createTestApp } from "@/lib/create-app.js";

import router from "./tasks.index.js";

describe("task list", () => {
  it ("responds with an array of tasks", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/tasks");
    const result = await response.json();

    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });

  it ("responds with an array again", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks.$get();
    const result = await response.json();

    expectTypeOf(result).toBeArray();
  });
  it("validates the id param", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks[":id"].$get({ param: { id: "1" } });

    expect(response.status).toBe(200);
  });

  it("validates the body when creating a task", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks.$post({ json: { name: "Task", done: false } });

    expect(response.status).toBe(201);
  });
});
