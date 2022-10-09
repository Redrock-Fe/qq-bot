import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

declare const getToday: () => string;
declare const getNowTime: () => string;

declare type LogType = 'error' | 'warn' | 'info';
declare const logger: {
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
};

declare type CommonRes<T> = {
    status: number;
    info: string;
    data: T;
};
interface qqBotConfig extends AxiosRequestConfig {
    interceptors?: qqBotRequestInterceptors;
    retry?: boolean;
    retryTimes?: number;
}
interface qqBotRequestInterceptors {
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorsCatch?: (error: any) => any;
    responseInterceptor: (res: AxiosResponse) => AxiosResponse;
    responseInterceptorCatch: (error: any) => any;
}
declare class Request {
    instance: AxiosInstance;
    interceptors?: qqBotRequestInterceptors;
    constructor(config: qqBotConfig);
    request<T>(config: qqBotConfig): Promise<AxiosResponse<T>>;
    get<T>(config: qqBotConfig): Promise<AxiosResponse<T>>;
    post<T>(config: qqBotConfig): Promise<AxiosResponse<T>>;
    delete<T>(config: qqBotConfig): Promise<AxiosResponse<T>>;
    patch<T>(config: qqBotConfig): Promise<AxiosResponse<T>>;
}

export { CommonRes, LogType, Request, getNowTime, getToday, logger, qqBotConfig, qqBotRequestInterceptors };
