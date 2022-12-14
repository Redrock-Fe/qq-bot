import { Helper, initFn, Plugin } from '@redrock-qq-bot/core';
import { checkTime } from '@redrock-qq-bot/common';
import type { Sendable } from 'oicq';
export interface Params {
  day: string;
  time: string;
  message: Sendable;
  group_id: number;
}
function timeoutMsg(data: Params, helper: Helper) {
  const { day, time, message, group_id } = data;
  if (day !== '') {
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
    }, 1000);
  } else {
    setInterval(() => {
      const t = new Date();
      const { h, m, s } = checkTime(day, time);
      if (t.getHours() === h && t.getMinutes() === m && t.getSeconds() === s) {
        helper.client.sendGroupMsg(group_id, message);
      }
    }, 1000);
  }
}
let config: Params | undefined;
const init: initFn<Params, false> = (helper, _config?: Params) => {
  config = _config;
  timeoutMsg(config as Params, helper);
};
export const TimerMsg: Plugin<Params, true> = {
  name: '定时消息',
  init,
  config,
};
