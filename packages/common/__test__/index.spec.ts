import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {expect, test,vi,beforeEach} from 'vitest';
import {
  getNowTime,
  getToday,
  logger,
  Request
} from '../src/index';


  

  test("request test",async () => {
    const a = new Request({
       baseURL:"http://jsonplaceholder.typicode.com"
    })
    const res = await a.request({
      method:"GET",
      url:'/posts'
    })
    console.log(res);
    console.log(1);
})

  
