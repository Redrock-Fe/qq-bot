import { Plugin } from "@redrock-qq-bot/core";
import { Sendable } from "oicq";

declare type Config = {
  reply: {
    [user_id: string]: string[];
  };
};
declare const Greet: Plugin<Config, false>;

declare const BanForRepeat: Plugin;

interface parms {
  day: string;
  time: string;
  message: Sendable;
  group_id: number;
}
/**
 * @descript config 参数含义
 * @parms day 哪一天 示例：2022-10-13 如果每天循环请使用 '' 占位
 * @parms time 什么时间 示例：9:30:32
 * @parms message oicq的消息类型
 * @parms gruop_id 要发送消息的群号
 */
declare const TimerMsg: Plugin<parms, true>;

export { BanForRepeat, Config, Greet, TimerMsg, parms };
