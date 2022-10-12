import { Plugin } from "@redrock-qq-bot/core";

declare type Config = {
  reply: {
    [user_id: string]: string[];
  };
};
declare const Greet: Plugin<Config, false>;

declare const BanForRepeat: Plugin;

export { BanForRepeat, Config, Greet };
