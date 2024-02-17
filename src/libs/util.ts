import CryptoJS from 'crypto-js';
import dayjs from 'dayjs/esm';

import __BASE64 from './util.base64';
import cookies from './util.cookies';
import db from './util.db';
import time from './util.time';

const util: Record<string, any> = {
  cookies,
  db,
  time,
  base64: __BASE64,
};

util.enFrontSecurity = function (message: any, key: any) {
  if (undefined === key) key = '53607f07f2819ebc';
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(key);
  const messageHex = CryptoJS.enc.Utf8.parse(message);
  const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

util.formatNumber = function (num: any, length: number) {
  if (undefined === length) {
    length = 2;
  }

  const rate = parseInt('1' + '000000000000'.substr(-length), 10);

  // @ts-ignore
  return Math.floor(parseFloat(num).toPrecision(12) * rate) / rate;
};

function tTitle(title = '') {
  const $t = window ? window['$app'].$t : null;

  if ($t) {
    if (title.indexOf('$t:') === 0) {
      return $t(title.split('$t:')[1]);
    } else {
      return title;
    }
  } else {
    return title;
  }
}


util.getGlobalState = () => {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';

  return {
    device,
    collapsed,
  } as const;
};

util.formatNumber = (num: string, length: number) => {
  if (undefined === length) {
    length = 2;
  }

  const rate = parseInt('1' + '000000000000'.substr(-length), 10);

  return Math.floor(parseFloat(num) * rate) / rate;
};

util.parseDate = (data: number) => {
  if (data === 0) {
    return 'N/A';
  }

  return dayjs(data * 1000).format('YYYY-MM-DD HH:mm:ss');
};

util.address = (address: string, len1 = 4, len2 = 4) => {
  if (!address) return '-';
  const match = address.match('^([a-zA-Z0-9]{' + len1 + '})[a-zA-Z0-9]+([a-zA-Z0-9]{' + len2 + '})$');

  if (!match) return address;

  return `${match[1]}…${match[2]}`;
};

util.currency = (amount: number | string, symbol = `￥`, precision = 2) => {
  if (typeof amount == 'string') amount = parseFloat(amount);

  return `${symbol} ${amount}`;
};

util.coin = (amount: number | string, symbol = `USDT`, precision = 6) => {
  if (!amount) return '-';
  if (typeof amount == 'string') amount = parseFloat(amount);

  return `${amount} ${symbol}`;
};

util.percent = (num: number | undefined) => {
  if (!num) return '-';

  return parseFloat((num * 100).toFixed(2)) + '%';
};


util.toArrayBuffer = (buf: any) => {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);

  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }

  return ab;
};

util.dec2Bin = (d: any) => {
  let b = '';

  for (let i = 0; i < 16; i++) {
    b = (d % 2) + b;
    d = Math.floor(d / 2);
  }

  return b;
};

util.trimStr = (str: any) => {
  return undefined !== str && '' !== str ? str.replace(/(^\s*)|(\s*$)/g, '') : str;
};

util.profitColor = (profit: any) => {
  profit = util.formatNumber(profit);
  const style = profit > 0 ? 'green' : 'red';

  return '<span class="' + style + '">' + profit + '</span>';
};

util.isMobile = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const re =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

  return re.test(ua);
};

util.sleep = (time: any) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

util.getRandom = (start: any, end: any, fixed: any) => {
  fixed = undefined == fixed ? 0 : fixed;
  const differ = end - start;
  const random = Math.random();

  return (start + differ * random).toFixed(fixed);
};

util.formatNumberV1 = (num: any, length: any) => {
  if (undefined === length) {
    length = 1;
  }

  const rate = parseInt('1' + '000000000000'.substr(-length), 10);

  return Math.floor(Number(parseFloat(num).toPrecision(12)) * rate) / rate;
};

util.getQueryString = function (name: any, defaultValue: any) {
  //let r = (document.location.href)?document.location.href.substr(1).match(reg):(window.location.search + window.location.hash).substr(1).match(reg);
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = (window.location.search + window.location.hash).substr(1).match(reg);

  if (r != null) {
    return unescape(r[2]);
  }

  if (undefined != defaultValue) return defaultValue;

  return null;
};

export default util;
