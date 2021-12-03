import axios from "axios";
import { getToken } from "./auth";

const baseURL =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? process.env.REACT_APP_ADMIN_LOCAL_URL
    : process.env.REACT_APP_ADMIN_HOM_URL;

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer: ${getToken()}`,
    "Access-Control-Allow-Origin": "*",
  },
});

const motorApi = axios.create({
  baseURL: process.env.REACT_APP_MOTOR_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  function (config) {
    if (getToken() === null) {
      window.href.location = "/login";
      return false;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    try {
      if (error?.response?.status === 401) {
        window.href.location = "/login";
      }
    } catch (error) {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export { api, motorApi };
