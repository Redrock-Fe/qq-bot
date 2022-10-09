import dayjs from 'dayjs';
import { cyan, yellow, red, lightGreen } from 'kolorist';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const getToday = () => dayjs().format("YYYY-MM-DD");
const getNowTime = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

const LogOut = (type, msg) => {
  const tag = type === "info" ? cyan(type) : type === "warn" ? yellow(type) : red(type);
  console.log(`${lightGreen(new Date().toLocaleTimeString())} ${tag} ${cyan(msg)}`);
};
const logger = {
  info: (msg) => LogOut("info", msg),
  warn: (msg) => LogOut("warn", msg),
  error: (msg) => LogOut("error", msg)
};

class Request {
  constructor(config) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      (res) => {
        console.log("\u5168\u5C40\u8BF7\u6C42\u62E6\u622A\u5668");
        return res;
      },
      (err) => err
    );
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("\u5168\u5C40\u54CD\u5E94\u62E6\u622A\u5668");
        return res.data;
      },
      (err) => err
    );
    if (config.retry) {
      axiosRetry(this.instance, {
        retries: config.retryTimes ?? 3,
        retryDelay: axiosRetry.exponentialDelay
      });
    }
  }
  request(config) {
    try {
      return this.instance.request(config);
    } catch (error) {
      const { code, message, config: errorConfig } = error;
      const { baseURL, url, method } = errorConfig;
      throw new Error(
        `[${method ? method : "REQUEST"} ${baseURL}${url}] ${code} ${message}
${JSON.stringify(
          errorConfig
        )}`
      );
    }
  }
  get(config) {
    return this.request({ ...config, method: "GET" });
  }
  post(config) {
    return this.request({ ...config, method: "POST" });
  }
  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export { Request, getNowTime, getToday, logger };
