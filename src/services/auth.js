export const USER_KEY = "sabis-token";
export const SERIAL_NUMBER_KEY = "sabis-sn";
export const APP_ID_KEY = "sabis-appId";

export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export const setToken = (token) =>
  localStorage.setItem(USER_KEY, JSON.stringify(token));

export const getToken = () => JSON.parse(localStorage.getItem(USER_KEY));

export const getUserId = () => JSON.parse(localStorage.getItem(USER_KEY)).id;

export const clearToken = () => localStorage.removeItem(USER_KEY);

export const setSNToken = (sn) =>
  localStorage.setItem(SERIAL_NUMBER_KEY, JSON.stringify(sn));

export const getSNToken = () =>
  JSON.parse(localStorage.getItem(SERIAL_NUMBER_KEY));

export const setAppID = (appId) =>
  localStorage.setItem(APP_ID_KEY, JSON.stringify(appId));

export const getAppID = () => JSON.parse(localStorage.getItem(APP_ID_KEY));
export const isSNRegistered = () =>
  localStorage.getItem(SERIAL_NUMBER_KEY) !== null;

export const setProperty = (key, value) => {
  let payload = JSON.parse(localStorage.getItem(USER_KEY));
  if (payload === null) {
    payload = { [key]: value };
  } else {
    payload[key] = value;
  }
  setToken(payload);
};

export const getProperty = (key) => {
  let payload = JSON.parse(localStorage.getItem(USER_KEY));
  return payload[key];
};
