import { createBot } from "./packages/core";
import { Greet, KeyWordSend } from "./packages/plugins";
const bot = createBot(3494696380, "test2003", [768135086]);
bot.use(Greet);
KeyWordSend.config = {
  title: "你好",
  reply: "我很好",
  group_id: 768135086,
};
bot.use(KeyWordSend);
