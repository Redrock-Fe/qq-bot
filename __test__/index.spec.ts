import { test } from "vitest";
import { createBot } from "../packages/core/dist";
import { Greet } from "../packages/plugins";
test("aaa", () => {
  const bot = createBot(2153389851, "yqyq123456", [837470119]);
  bot.use(Greet);
});
