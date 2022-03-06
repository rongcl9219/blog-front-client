/**
 * @description 拦截器
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import myMessage from '@/utils/myMessage';

// axios实例
const instance = axios.create({
    timeout: 5000
});
// 是否正在刷新token
let isRefreshing: boolean = false;
// 请求列表
let requestList: Array<any> = [];

instance.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        const timestamp = new Date().getTime();
        // 添加时间戳

        request.params = {
            _: timestamp,
            ...request.params
        };

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;

        if (!data.status) {
            return Promise.reject(response.data);
        }
        return response;
    },
    (error) => {
        myMessage({
            type: 'error',
            message: '请求失败'
        });
        return Promise.reject(error);
    }
);

export default instance;
