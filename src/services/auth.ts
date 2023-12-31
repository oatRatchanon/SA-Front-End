import { ICredential } from "../types/auth";
import Cookies from "js-cookie";
import { GATEWAY_URL } from "../config/env";
import { setCookie } from "../utils/cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../utils/axios";
import { User } from "../types";
import { deleteCookie } from "../utils/cookie";
import { getAllBookmark } from "./files";

const renewAccessToken = async (refreshToken: string) => {
  let res: AxiosResponse;
  try {
    res = await apiClient.get<ICredential>("api/auth/refreshToken", {
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

const fetchUserDetailsService = async (
  setUser: (user: User | undefined) => void,
  setBookmarkFiles: (bookmarkFiles: string[]) => void
) => {
  try {
    const res = await apiClient.get(`/api/auth/me`);
    const email = res?.data?.email ?? "";
    const displayName = res?.data?.displayName ?? "";
    setUser({ email, displayName });
    const resBookmarkFiles = await getAllBookmark();
    setBookmarkFiles(resBookmarkFiles.fileIds);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.status === 401) {
        // If a 401 error occurs, renew the token
        try {
          // Call your renewToken function to refresh the token
          const refreshToken = getRefreshToken() ?? "";
          await renewAccessToken(refreshToken);
          // Retry fetching user details after token renewal
          const newAccessToken = getAccessToken() ?? "";
          const res = await axios.get(`${GATEWAY_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          const email = res?.data?.email ?? "";
          const displayName = res?.data?.displayName ?? "";
          setUser({ email, displayName });
        } catch (renewError) {
          console.log("Token renewal failed:", renewError);
          // Handle token renewal failure, e.g., redirect to login
        }
      }
    }
  }
};

const logoutService = async (setUser: (user: User | undefined) => void) => {
  try {
    const accessToken = getAccessToken() ?? "";
    await axios.get(`${GATEWAY_URL}/api/auth/logout`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setUser(undefined);
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  } catch (err) {
    console.log(err);
  }
};

export {
  renewAccessToken,
  getAccessToken,
  getRefreshToken,
  fetchUserDetailsService,
  logoutService,
};
