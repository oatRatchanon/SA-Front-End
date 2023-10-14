import axios, { AxiosResponse } from "axios";
import { ICredential } from "../types/auth";
import Cookies from "js-cookie";
import { GATEWAY_URL } from "../config/env";
import { setCookie } from "./cookie";

const authClient = axios.create({
  baseURL: GATEWAY_URL,
  timeout: 10000,
});

const renewAccessToken = async (refreshToken: string) => {
  let res: AxiosResponse;
  try {
    res = await authClient.get<ICredential>("api/auth/refreshToken", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    setCookie("accessToken", res.data.accessToken);
    setCookie("refreshToken", res.data.refreshToken);
    return res.data;
  } catch (err) {
    return null;
  }
};

const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

const getRefreshToken = () => {
  const refreshToken = Cookies.get("refreshToken");
  return refreshToken;
};

export { renewAccessToken, getAccessToken, getRefreshToken };
