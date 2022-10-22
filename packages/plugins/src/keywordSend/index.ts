import { Helper, initFn, Plugin } from '@redrock-qq-bot/core';
import type { Sendable } from 'oicq';
export interface IKeyWord {
  title: string;
  reply: Sendable;
  group_id: number;
}
function keyWordSend(data: IKeyWord, helper: Helper) {
  const { title, reply, group_id } = data;
  helper.addEventListener('message.group', (msg) => {
    if (msg.atme && msg.group_id === group_id) {
      let text = '';
      msg.message.map((item) => {
        if (item.type === 'text') {
          text = item.text.trim();
        }
      });
      if (text.includes(title)) {
        msg.reply(reply, true);
      }
    }
  });
}
let config: IKeyWord | undefined;
const init: initFn<IKeyWord, false> = (helper, _config?: IKeyWord) => {
  config = _config;
  keyWordSend(config as IKeyWord, helper);
};
export const KeyWordSend: Plugin<IKeyWord, true> = {
  name: '添加关键词匹配',
  init,
  config,
};
