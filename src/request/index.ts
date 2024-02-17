import type { AxiosRequestConfig, Method } from 'axios';

import axios from 'axios';
import qs from 'qs';

import util from '@/libs/util';
import { history } from '@/routes/history';
import store from '@/stores';
import { setUserItem } from '@/stores/user/user.store';

import { addPending, clearPending, httpErrorStatusHandle, removePending, showMessage } from './cancelRequest';

const axiosInstance = axios.create({
  baseURL: window.config?.apiUrl,
  withCredentials: true,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    removePending(config); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    //当请求路径不是这两个的时候, 添加token请求头
    const tk = {
      timefix: new Date().getTime(),
      token: util.cookies.get('token'),
      lang: (util.cookies.get('locale')! || 'zh_CN').toLowerCase(),
    };

    if (config.url.includes('/admin/config/noticeadd/') || config.url.includes('/admin/config/noticeedit/')) {
      //这两接口慢，6秒基本返回不了
      config.timeout = 30000;
    }

    if (!config.url.includes('?')) {
      config.url = `${config.url}?${qs.stringify(tk)}`;
    } else {
      config.url = `${config.url}${qs.stringify(tk)}`;
    }

    if ((config.method === 'get' || config.method === 'GET') && config.data) {
      config.url = `${config.url}&${qs.stringify(config.data)}`;
      delete config.data;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response: any) => {
    removePending(response); // 在请求结束后，移除本次请求

    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code, msg } = dataAxios;

    if (code === 1001) {
      store.dispatch(
        setUserItem({
          logged: false,
        }),
      );
      clearPending();
      showMessage('您未登录，或者登录已经超时，请先登录！');
      history.replace('/login');
    } else if (code === 200) {
      return dataAxios;
    } else if (code === 1) {
      ///main/logcustomevent/edit/ 这接口成功返回的是1
      return dataAxios;
    } else {
      showMessage(msg);

      return Promise.resolve();
    }
  },
  error => {
    if (axios.isCancel(error)) {
      //处理手动cancel
      console.log('这是手动cancel的');
    }

    // 将当前请求从请求列表中移除
    const config = error.config;

    config && removePending(error.config);
    httpErrorStatusHandle(error); // 处理错误状态码

    return Promise.reject(error);
  },
);

export type Response<T = any> = {
  code: number;
  msg: string;
  data: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 * @param config
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else if (method === 'delete') {
    return axiosInstance.delete(url, data);
  } else if (method === 'put') {
    return axiosInstance.put(url, data);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
