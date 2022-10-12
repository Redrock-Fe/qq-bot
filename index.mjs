import { createBot } from "./packages/core/dist/index.mjs";
import { GroupReply } from "./packages/plugins/dist/index.mjs"
const count = 2548438264;
const password = "xkedou031014";
const groups = [747730981];
const botName = '前端小助手'
const helloWords = '快来@我试试吧！！'

const replyObj = [
    {
        keyWord:'后端',
        reply:' 后端也好高级！',
        ifCall:true
    },
    {
        keyWord:'前端',
        reply:' 前端非常有意思的哦~',
        ifCall:true
    },
    {
        keyWord:'产品',
        reply:' 要多多锻炼表达能力哦~',
        ifCall:false
    },
    {
        keyWord:'移动',
        reply:' 掌邮挺住啊！！！',
        ifCall:false
    },
    {
        keyWord:'',
        reply:'1',
        defaults:[
            '试试问我下面的问题吧',
            '  前端是是啥？',
            '  后端学什么？'
        ],
        ifCall:true
    }
]

const bot = createBot(botName,count, password, groups,helloWords)
bot.use(GroupReply,replyObj)


// const { createClient } = require("oicq")
// const account = 2548438264;
// const bot = createClient(account)

// bot
// .on("system.login.qrcode", function (e) {
// 	this.logger.mark("扫码后按Enter完成登录")
// 	process.stdin.once("data", () => {
// 		this.login()
// 	})
// })
// .login()
// if(''){
//     console.log(1);
// }