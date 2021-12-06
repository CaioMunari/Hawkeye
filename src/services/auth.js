export const USER_KEY = "sabis-token";

export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export const setToken = (token) =>
  localStorage.setItem(USER_KEY, JSON.stringify(token));

export const getToken = () => JSON.parse(localStorage.getItem(USER_KEY));

export const getUserId = () => JSON.parse(localStorage.getItem(USER_KEY)).id;

export const clearToken = (token) => localStorage.removeItem(USER_KEY);

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
