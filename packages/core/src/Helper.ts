import type { Client, EventMap, GroupMessageEvent, Sendable } from 'oicq';
import type { Plugin } from './types';
import { logger } from '@redrock-qq-bot/common';

type GroupMessageListener = (event: GroupMessageEvent) => void;

const { warn } = logger;

export class Helper {
  readonly client: Client;
  readonly groupID: number | undefined;
  plugins: Plugin[];
  constructor(client: Client, groupID: number) {
    this.client = client;
    this.groupID = groupID;
    this.plugins = [];
  }
  sendMsg(msg: Sendable) {
    if (this.groupID) {
      return this.client.sendGroupMsg(this.groupID, msg);
    } else {
      warn('Your qq bot is not connected with any group');
    }
  }
  sendPrivateMsg(receiverID: number, msg: Sendable) {
    return this.client.sendPrivateMsg(receiverID, msg);
  }
  deleteMsg(msgID: string) {
    return this.client.deleteMsg(msgID);
  }

  banMember(userId: number, duration: number) {
    if (this.groupID) {
      return this.client.setGroupBan(this.groupID, userId, duration);
    } else {
      warn('Your qq bot is not connected with any group');
    }
  }
  deleteMember(uid: number) {
    if (this.groupID) {
      return this.client.setGroupKick(this.groupID, uid);
    } else {
      warn('Your qq bot is not connected with any group');
    }
  }

  addEventListener<T extends keyof EventMap>(
    event: T,
    listener: EventMap<Client>[T]
  ) {
    if (event === 'message.group') {
      const callback = (data: GroupMessageEvent) => {
        const { group_id } = data;
        if (group_id === this.groupID) {
          (listener as GroupMessageListener)(data);
        }
      };
      this.client.on('message.group', callback);
      return () => this.client.removeListener('message.group', callback);
    }
    this.client.on(event, listener);
    return () => this.client.removeListener(event, listener);
  }
}
