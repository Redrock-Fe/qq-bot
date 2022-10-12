import type { Client, Config, EventMap } from 'oicq';
import { createClient } from 'oicq';
import { Helper } from './Helper';
import type { Plugin } from './types';
import pkg from '../package.json';
import { getNowTime } from '@redrock-qq-bot/common';

export function createBot(
  botName: string,
  account: number,
  password: string,
  groupIDs: number[],
  helloWords: string,
  config?: Config,
) {
  const client = createClient(account, config);
  //监听并输入滑动验证码ticket(同一设备只需验证一次)
  client.on('system.login.slider', () => {
    process.stdin.once('data', (input) => {
      client.submitSlider(input as unknown as string);
    });
  });

  //监听设备锁验证(同一设备只需验证一次)
  client.on('system.login.device', () => {
    client.logger.info('验证完成后敲击Enter继续..');
    process.stdin.once('data', () => {
      client.login();
    });
  });

  client.login(password);
  //创建消息和插件助手

  const helpers: Helper[] = []
  groupIDs.forEach((groupID) => {
    const helper = new Helper(client, groupID);
    helpers.push(helper);
  })

  //使用插件
  function use<T, MustNeedConfig extends boolean>(
    plugin: Plugin<T, MustNeedConfig>,
    config?: T
  ) {
    if (config) plugin.config = config;
    helpers.forEach((helper) => {
      helper.plugins.push(plugin as unknown as Plugin);
    });
  }
  function on<T extends keyof EventMap>(
    event: T,
    listener: EventMap<Client>[T]
  ) {
    return client.on(event, listener);
  }

  client.on('system.online', () => {
    helpers.forEach((helper) => {
      helper.plugins.forEach(plugin => plugin.init(helper, plugin.config));
      if (helloWords) {
        helper.sendMsg(helloWords)
      } else {
        helper.sendMsg(`${botName}上线了哦，当前版本 ${pkg.version}，当前时间 ${getNowTime()}`);
      }
    })

  });
  return {
    use,
    on,
  };
}
