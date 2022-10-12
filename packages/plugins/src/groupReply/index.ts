import { GroupMessageEvent, segment, Sendable } from 'oicq';
import type { initFn, Plugin, Helper } from '@redrock-qq-bot/core';

type groupReplyConfig = {
    keyWord: string | undefined
    reply: Sendable
    defaults?: string[] | undefined
    ifCall?: boolean
}

let configs: groupReplyConfig[] | undefined;
let defKey: groupReplyConfig | undefined

function groupReply(data: GroupMessageEvent, helper: Helper) {
    const {
        raw_message,
        sender: { user_id },
        atme
    } = data;
    let ifReply: boolean = false;
    if (atme) {

        configs?.forEach((config) => {
            const { keyWord, reply, ifCall } = config;
            if (keyWord && reply && !ifReply) {
                const reg = new RegExp(keyWord)
                if (reg.test(raw_message)) {
                    //默认引用回复
                    data.reply([segment.at(user_id), reply] as Sendable, ifCall ? true : false)
                    ifReply = true
                }
            } else {
                throw new Error('Please complete the config information');
            }
        })
        if (defKey && defKey.defaults && !ifReply) {
            const { defaults } = defKey;
            if (defaults) {
                let res = defaults.reduce((pre: string, cur: string) => {
                    return pre + cur + '\n'
                }, '')
                data.reply(res, true)
            }
        }
        ifReply = false
    }
}

const init: initFn<groupReplyConfig, false> = (helper, _config) => {
    configs = _config as groupReplyConfig[] | undefined;
    defKey = configs ? configs.pop() : undefined
    helper.addEventListener('message.group', data => {
        const { group_id } = data;
        if (group_id !== helper.groupID) return;
        groupReply(data, helper);
    });
};

export const GroupReply: Plugin<groupReplyConfig, false> = {
    name: '关键字回复',
    init,
};
