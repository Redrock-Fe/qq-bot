import { checkTime } from "@redrock-qq-bot/common";

let config$1;
function talk(data, helper) {
  const {
    raw_message,
    sender: { user_id },
  } = data;
  if (/\S*机器人\S*/.test(raw_message)) {
    if (config$1 && Object.keys(config$1.reply).includes(String(user_id))) {
      helper.sendMsg(
        config$1.reply[user_id][
          Math.floor(Math.random() * config$1.reply[user_id].length)
        ]
      );
    } else {
      helper.sendMsg("\u4F60\u624D\u662F\u673A\u5668\u4EBA");
    }
  }
}
const init$2 = (helper, _config) => {
  config$1 = _config;
  helper.addEventListener("message.group", (data) => {
    const { group_id } = data;
    if (group_id !== helper.groupID) return;
    talk(data, helper);
  });
};
const Greet = {
  name: "\u5BF9\u8BDD\u4EA4\u4E92",
  init: init$2,
};

let recentMessages = [];
const canRepeatTimes = 5;
const banTimeLimit = 5;
function banForRepeat(helper) {
  recentMessages = recentMessages.map((e) => {
    if (e.raw_message.startsWith("[CQ:")) {
      e.raw_message = e.raw_message.split(",")[1];
    }
    return e;
  });
  const raw = recentMessages[0].raw_message;
  if (recentMessages.every((e) => e.raw_message === raw)) {
    const banTime = Math.ceil(Math.random() * banTimeLimit) * 60;
    helper.banMember(
      recentMessages[recentMessages.length - 1].sender.user_id,
      banTime
    );
  }
}
function listener(data, helper) {
  recentMessages.push(data);
  if (recentMessages.length > canRepeatTimes) {
    recentMessages.shift();
    banForRepeat(helper);
  }
}
const init$1 = (helper) => {
  helper.addEventListener("message.group", (data) => listener(data, helper));
};
const BanForRepeat = {
  name: "\u590D\u8BFB\u7981\u8A00",
  init: init$1,
};

function timeoutMsg(data, helper) {
  const { day, time, message, group_id } = data;
  if (day !== "") {
    const { Y, D, M, h, m, s } = checkTime(day, time);
    setInterval(() => {
      const t = new Date();
      if (
        t.getFullYear() === Y &&
        t.getMonth() + 1 === M &&
        t.getDate() === D &&
        t.getHours() === h &&
        t.getMinutes() === m &&
        t.getSeconds() === s
      ) {
        helper.client.sendGroupMsg(group_id, message);
      }
    }, 1e3);
  } else {
    setInterval(() => {
      const t = new Date();
      const { h, m, s } = checkTime(day, time);
      if (t.getHours() === h && t.getMinutes() === m && t.getSeconds() === s) {
        helper.client.sendGroupMsg(group_id, message);
      }
    }, 1e3);
  }
}
let config;
const init = (helper, _config) => {
  config = _config;
  timeoutMsg(_config, helper);
};
const TimerMsg = {
  name: "\u5B9A\u65F6\u6D88\u606F",
  init,
  config,
};

export { BanForRepeat, Greet, TimerMsg };
