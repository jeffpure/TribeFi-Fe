import axios from 'axios';

import { message } from '@/components/my-message';

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */

export const addPending = (config: any) => {
  const url = [config.method, config.url].join('&');

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};

/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config: any) => {
  const url = [config.method, config.url].join('&');

  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);

    cancel(url);
    pending.delete(url);
  }
};

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }

  pending.clear();
};

/**
 * 处理异常
 * @param {*} error
 */
export function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
  let message = '';

  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！';
        break;
      case 400:
        message = '参数不正确！';
        break;
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！';
        break;
      case 403:
        message = '您没有权限操作！';
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = '请求超时！';
        break;
      case 409:
        message = '系统已存在相同数据！';
        break;
      case 500:
        message = '服务器内部错误！';
        break;
      case 501:
        message = '服务未实现！';
        break;
      case 502:
        message = '网关错误！';
        break;
      case 503:
        message = '服务不可用！';
        break;
      case 504:
        message = '服务暂时无法访问，请稍后再试！';
        break;
      case 505:
        message = 'HTTP版本不受支持！';
        break;
      default:
        message = '异常问题，请联系管理员！';
        break;
    }
  }

  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
  showMessage(message);
}

const messageList1: any[] = [];
/**
 * 处理相同内容多次弹出弹框
 */

export function showMessage(msg: any) {
  // 1：判断同时只能存在消息相同的一个弹框
  // 2：或是通过判断弹框元素来判断
  if (!messageList1.includes(msg)) {
    messageList1.push(msg);
    message.error(msg).then((e: any) => {
      const index = messageList1.findIndex(i => i == msg);

      messageList1.splice(index, 1);
    });
  }
}
