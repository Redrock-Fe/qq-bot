
import { cyan, lightGreen, red, yellow } from 'kolorist';
export type LogType = 'error' | 'warn' | 'info'


const LogOut = (type: LogType,msg:string ) => {
   const tag = type === 'info'? cyan(type):type === 'warn' ? yellow(type) :red(type)
   console.log(`${lightGreen(new Date().toLocaleTimeString())} ${tag} ${cyan(msg)}`);
   
}

export const logger = {
    info:(msg:string) => LogOut('info', msg),
    warn:(msg:string) => LogOut('warn', msg),
    error:(msg:string) => LogOut('error', msg)
}