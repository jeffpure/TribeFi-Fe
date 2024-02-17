import Cookies from 'js-cookie';

const cookies: Record<string, any> = {};

/**
 * @description  cookie
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} cookieSetting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  const currentCookieSetting: Record<string, any> = {};

  if (window?.config.cookiesExpires !== 0) currentCookieSetting.expires = window?.config?.cookiesExpires;

  Object.assign(currentCookieSetting, cookieSetting);
  Cookies.set(`${window?.config?.appID}-${name}`, value, currentCookieSetting);
};


cookies.get = function (name = 'default') {
  return Cookies.get(`${window?.config?.appID}-${name}`);
};


cookies.getAll = function () {
  return Cookies.get();
};

cookies.remove = function (name = 'default') {
  return Cookies.remove(`${window?.config?.appID}-${name}`);
};

export default cookies;
