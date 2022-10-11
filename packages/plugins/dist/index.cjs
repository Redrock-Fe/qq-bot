'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let config;
function talk(data, helper) {
  const {
    raw_message,
    sender: { user_id }
  } = data;
  if (/\S*机器人\S*/.test(raw_message)) {
    if (config && Object.keys(config.reply).includes(String(user_id))) {
      helper.sendMsg(
        config.reply[user_id][Math.floor(Math.random() * config.reply[user_id].length)]
      );
    } else {
      helper.sendMsg("\u4F60\u624D\u662F\u673A\u5668\u4EBA");
    }
  }
}
const init = (helper, _config) => {
  config = _config;
  helper.addEventListener("message.group", (data) => {
    const { group_id } = data;
    if (group_id !== helper.groupID)
      return;
    talk(data, helper);
  });
};
const Greet = {
  name: "\u5BF9\u8BDD\u4EA4\u4E92",
  init
};

exports.Greet = Greet;
