# Redrock-QQ-Bot

A QQ Chat Bot

> 改项目灵感来源于网校的王哥 ♥️，是基于 oicq 框架进行的二次封装

## 使用

> 首先应该知道的是，机器人 🤖️ 会占用一个 QQ 号的一个端（默认的话是手机端的）

1. 安装

```shell
npm i @redrock-qq-bot/core
```

Tips:yarn/pnpm 暂时由于软链原因暂未支持（应该马上就能测试完成）

2. 启动

通过`createBot`方法传入 qq 号，密码，qq 群号

```ts
import { createBot } from "@redrock-qq-bot/core";
const bot = createBot(account, password, [groupID]);
```

3. 使用插件/调用 oicq 原生的事件监听

- 使用官方插件（packages/plugins）

```shell
npm i @redrock-qq-bot/plugins
```

```ts
import { greetBot } from "@redrcok-qq-bot/plugins";

bot.use(greetBot);
```

Tips:某些插件需要传入配置，具体可以查阅 oicq 的官方使用说明

- 使用 oicq 的事件监听

在 bot 实例中，我们返回了 oicq 封装好的`on`方法，大家也可以依据 oicq 的写法自行发挥想象力

![image-20221011145320802](https://nirvana-1304092626.cos.ap-chongqing.myqcloud.com/md/image-20221011145320802.png)

4. 测试

   如机器人正常启动，则会自动在群聊发送“bot 启动成功”
