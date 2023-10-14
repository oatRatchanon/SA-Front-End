import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { GATEWAY_URL } from "../config/env";
import { getAccessToken, getRefreshToken, renewAccessToken } from "./auth";

const apiClient = axios.create({
  baseURL: GATEWAY_URL,
  timeout: 10000,
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return config;
  }
  const configs = config || {};
  const headers = configs?.headers || {};
  return {
    ...configs,
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
  };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (
  response: AxiosResponse
  // error: AxiosError
): AxiosResponse => {
  // if (error.response && error.response.status === 401) {
  //   try {
  //     const refreshToken = getRefreshToken() || "";
  //     if (!refreshToken) {
  //       // TODO: Handle refresh token is not exist make user login again
  //       // return handleLogin();
  //     }
  //     const newToken = await renewAccessToken(refreshToken);
  //     // Set the new token in the request headers
  //     error?.config?.headers.Authorization = `Bearer ${newToken}`;
  //     // Retry the request
  //     return apiClient.request(error.config);
  //   } catch (refreshError) {
  //     // Handle token refresh failure (e.g., log the user out)
  //     return handle401Error(refreshError);
  //   }
  // }
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

apiClient.interceptors.request.use(onRequest, onRequestError);
apiClient.interceptors.response.use(onResponse, onResponseError);
