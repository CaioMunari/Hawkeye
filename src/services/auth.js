export const USER_KEY = "sabis-token";

export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export const setToken = (token) =>
  localStorage.setItem(USER_KEY, JSON.stringify(token));

export const clearToken = (token) => localStorage.removeItem(USER_KEY);
