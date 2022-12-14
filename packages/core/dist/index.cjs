"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const common = require("@redrock-qq-bot/common");
const oicq = require("oicq");

const { warn } = common.logger;
class Helper {
  constructor(client, groupID) {
    this.client = client;
    this.groupID = groupID;
    this.plugins = [];
  }
  sendMsg(msg) {
    if (this.groupID) {
      return this.client.sendGroupMsg(this.groupID, msg);
    } else {
      warn("Your qq bot is not connected with any group");
    }
  }
  sendPrivateMsg(receiverID, msg) {
    return this.client.sendPrivateMsg(receiverID, msg);
  }
  deleteMsg(msgID) {
    return this.client.deleteMsg(msgID);
  }
  banMember(userId, duration) {
    if (this.groupID) {
      return this.client.setGroupBan(this.groupID, userId, duration);
    } else {
      warn("Your qq bot is not connected with any group");
    }
  }
  deleteMember(uid) {
    if (this.groupID) {
      return this.client.setGroupKick(this.groupID, uid);
    } else {
      warn("Your qq bot is not connected with any group");
    }
  }
  addEventListener(event, listener) {
    if (event === "message.group") {
      const callback = (data) => {
        const { group_id } = data;
        if (group_id === this.groupID) {
          listener(data);
        }
      };
      this.client.on("message.group", callback);
      return () => this.client.removeListener("message.group", callback);
    }
    this.client.on(event, listener);
    return () => this.client.removeListener(event, listener);
  }
}

const name = "@redrock-qq-bot/core";
const version = "0.1.2";
const description = "Here is a qqBot core based on oicq";
const main = "./dist/index.cjs";
const module$1 = "./dist/index.mjs";
const types = "./dist/index.d.ts";
const scripts = {
  build: "unbuild",
  dev: "unbuild --stub",
  lint: "eslint .",
  test: "vitest",
  start: "esno src/index.ts",
  release: "pnpm build && pnpm publish --no-git-checks --access=public",
};
const keywords = ["qq-bot", "oicq"];
const author = "Redrock-FE";
const license = "MIT";
const exports$1 = {
  ".": {
    require: "./dist/index.cjs",
    import: "./dist/index.mjs",
    types: "./dist/index.d.ts",
  },
};
const files = ["dist"];
const dependencies = {
  "@redrock-qq-bot/common": "workspace:^0.1.1",
  oicq: "^2.3.1",
};
const pkg = {
  name: name,
  version: version,
  description: description,
  main: main,
  module: module$1,
  types: types,
  scripts: scripts,
  keywords: keywords,
  author: author,
  license: license,
  exports: exports$1,
  files: files,
  dependencies: dependencies,
};

function createBot(account, password, groupIDs, config) {
  const client = oicq.createClient(account, config);
  client.on("system.login.slider", () => {
    process.stdin.once("data", (input) => {
      client.submitSlider(input);
    });
  });
  client.on("system.login.device", () => {
    client.logger.info(
      "\u9A8C\u8BC1\u5B8C\u6210\u540E\u6572\u51FBEnter\u7EE7\u7EED.."
    );
    process.stdin.once("data", () => {
      client.login();
    });
  });
  client.login(password);
  const helpers = [];
  groupIDs.forEach((groupID) => {
    const helper = new Helper(client, groupID);
    helpers.push(helper);
  });
  function use(plugin, config2) {
    if (config2) plugin.config = config2;
    helpers.forEach((helper) => {
      helper.plugins.push(plugin);
    });
  }
  function on(event, listener) {
    return client.on(event, listener);
  }
  client.on("system.online", () => {
    helpers.forEach((helper) => {
      helper.plugins.forEach((plugin) => plugin.init(helper, plugin.config));
      helper.sendMsg(
        `bot \u542F\u52A8\u6210\u529F\uFF0C\u5F53\u524D\u7248\u672C ${
          pkg.version
        }\uFF0C\u5F53\u524D\u65F6\u95F4 ${common.getNowTime()}`
      );
    });
  });
  return {
    use,
    on,
  };
}

exports.Helper = Helper;
exports.createBot = createBot;
