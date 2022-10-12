import * as oicq from 'oicq';
import { Client, Sendable, EventMap, Config } from 'oicq';

declare type initFn<T = never, MustNeedConfig extends boolean = false> = MustNeedConfig extends false ? (helper: Helper, config?: T) => void : (helper: Helper, config: T) => void;
interface Plugin<T = never, MustNeedConfig extends boolean = false> {
    init: initFn<T, MustNeedConfig>;
    name?: string;
    config?: T;
}

declare class Helper {
    readonly client: Client;
    readonly groupID: number | undefined;
    plugins: Plugin[];
    constructor(client: Client, groupID: number);
    sendMsg(msg: Sendable): Promise<oicq.MessageRet> | undefined;
    sendPrivateMsg(receiverID: number, msg: Sendable): Promise<oicq.MessageRet>;
    deleteMsg(msgID: string): Promise<boolean>;
    banMember(userId: number, duration: number): Promise<void> | undefined;
    deleteMember(uid: number): Promise<boolean> | undefined;
    addEventListener<T extends keyof EventMap>(event: T, listener: EventMap<Client>[T]): () => Client;
}

declare function createBot(botName: string, account: number, password: string, groupIDs: number[], helloWords: string, config?: Config): {
    use: <T, MustNeedConfig extends boolean>(plugin: Plugin<T, MustNeedConfig>, config?: T | undefined) => void;
    on: <T_1 extends keyof EventMap<any>>(event: T_1, listener: EventMap<Client>[T_1]) => Client;
};

export { Helper, Plugin, createBot, initFn };
