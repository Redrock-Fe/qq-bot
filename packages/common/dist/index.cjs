'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const dayjs = require('dayjs');
const kolorist = require('kolorist');
const axios = require('axios');
const axiosRetry = require('axios-retry');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
const axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
const axiosRetry__default = /*#__PURE__*/_interopDefaultLegacy(axiosRetry);

const getToday = () => dayjs__default().format("YYYY-MM-DD");
const getNowTime = () => dayjs__default().format("YYYY-MM-DD HH:mm:ss");

const LogOut = (type, msg) => {
  const tag = type === "info" ? kolorist.cyan(type) : type === "warn" ? kolorist.yellow(type) : kolorist.red(type);
  console.log(`${kolorist.lightGreen(new Date().toLocaleTimeString())} ${tag} ${kolorist.cyan(msg)}`);
};
const logger = {
  info: (msg) => LogOut("info", msg),
  warn: (msg) => LogOut("warn", msg),
  error: (msg) => LogOut("error", msg)
};

class Request {
  constructor(config) {
    this.instance = axios__default.create(config);
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
      axiosRetry__default(this.instance, {
        retries: config.retryTimes ?? 3,
        retryDelay: axiosRetry__default.exponentialDelay
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

exports.Request = Request;
exports.getNowTime = getNowTime;
exports.getToday = getToday;
exports.logger = logger;
