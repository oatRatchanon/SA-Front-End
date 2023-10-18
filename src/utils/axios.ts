import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { GATEWAY_URL } from "../config/env";
import { getAccessToken } from "../services/auth";

export const apiClient: AxiosInstance = axios.create({
  baseURL: GATEWAY_URL,
  timeout: 10000,
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  if (!config.headers.get("Content-Type"))
    config.headers.set("Content-Type", "application/json");
  if (!config.headers.get("Cache-Control"))
    config.headers.set("Cache-Control", "no-cache");
  // config.withCredentials = true;
  const accessToken = getAccessToken();
  console.log(accessToken);

  if (!accessToken) return config;
  if (!config.headers.get("Authorization"))
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse) => {
  // if (response && response.status === 401) {
  //   try {
  //     const refreshToken = getRefreshToken() || "";
  //     if (!refreshToken) {
  //       // TODO: Handle refresh token is not exist make user login again
  //       // return handleLogin();
  //     }
  //     const newToken = await renewAccessToken(refreshToken);

  //     // Set the new token in the request headers
  //     response?.config?.headers.set("Authorization", `Bearer ${newToken}`);
  //     // Retry the request
  //     // return apiClient.request(error.config);
  //     return response;
  //   } catch (refreshError) {
  //     // Handle token refresh failure (e.g., log the user out)
  //     // return handle401Error(refreshError);
  //   }
  // }
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

apiClient.interceptors.request.use(onRequest, onRequestError);
apiClient.interceptors.response.use(onResponse, onResponseError);
