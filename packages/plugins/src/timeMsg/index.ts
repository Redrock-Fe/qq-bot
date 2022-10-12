import { Helper, initFn, Plugin } from '@redrock-qq-bot/core';
import { checkTime } from '@redrock-qq-bot/common';
import type { Sendable } from 'oicq';

export interface parms {
  day: string;
  time: string;
  message: Sendable;
  group_id: number;
}
function timeoutMsg(data: parms, helper: Helper) {
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
let config;
const init: initFn<parms, false> = (helper, _config: parms | undefined) => {
  config = _config;
  timeoutMsg(_config as parms, helper);
};
/**
 * @descript config 参数含义
 * @parms day 哪一天 示例：2022-10-13 如果每天循环请使用 '' 占位
 * @parms time 什么时间 示例：9:30:32
 * @parms message oicq的消息类型
 * @parms gruop_id 要发送消息的群号
 */
export const TimerMsg: Plugin<parms, true> = {
  name: '定时消息',
  init,
  config,
};
