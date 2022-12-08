import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import axios from 'axios';
import axiosRetry from 'axios-retry';

export type CommonRes<T> = {
  status: number;
  info: string;
  data: T;
};

export interface qqBotConfig extends AxiosRequestConfig {
  interceptors?: qqBotRequestInterceptors;
  retry?: boolean;
  retryTimes?: number;
}
//定义拦截器接口
export interface qqBotRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (error: any) => any;
  responseInterceptor: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch: (error: any) => any;
}

export class Request {
  instance: AxiosInstance;
  interceptors?: qqBotRequestInterceptors;
  constructor(config: qqBotConfig) {
    //创建当前实例
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('全局请求拦截器');
        return res;
      },
      (err: any) => err
    );
    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        console.log('全局响应拦截器');
        return res.data;
      },
      (err: any) => err
    );
    if (config.retry) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      axiosRetry(this.instance, {
        retries: config.retryTimes ?? 3,
        retryDelay: axiosRetry.exponentialDelay,
      });
    }
  }
  request<T>(config: qqBotConfig): Promise<AxiosResponse<T>> {
    try {
      return this.instance.request(config);
    } catch (error) {
      const { code, message, config: errorConfig } = error as AxiosError;
      const { baseURL, url, method } = errorConfig;
      throw new Error(
        `[${
          method ? method : 'REQUEST'
        } ${baseURL}${url}] ${code} ${message}\n${JSON.stringify(errorConfig)}`
      );
    }
  }
  get<T>(config: qqBotConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: qqBotConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: qqBotConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: qqBotConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}
