let config;
function talk(data, helper) {
  const {
    raw_message,
    sender: { user_id },
  } = data;
  if (/\S*机器人\S*/.test(raw_message)) {
    if (config && Object.keys(config.reply).includes(String(user_id))) {
      helper.sendMsg(
        config.reply[user_id][
          Math.floor(Math.random() * config.reply[user_id].length)
        ]
      );
    } else {
      helper.sendMsg("\u4F60\u624D\u662F\u673A\u5668\u4EBA");
    }
  }
}
const init$1 = (helper, _config) => {
  config = _config;
  helper.addEventListener("message.group", (data) => {
    const { group_id } = data;
    if (group_id !== helper.groupID) return;
    talk(data, helper);
  });
};
const Greet = {
  name: "\u5BF9\u8BDD\u4EA4\u4E92",
  init: init$1,
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
const init = (helper) => {
  helper.addEventListener("message.group", (data) => listener(data, helper));
};
const BanForRepeat = {
  name: "\u590D\u8BFB\u7981\u8A00",
  init,
};

export { BanForRepeat, Greet };
