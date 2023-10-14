import Cookies from "js-cookie";
import { DOMAIN } from "../config/env";

const setCookie = (name: string, value: string) => {
  Cookies.set(name, value, {
    sameSite: "none",
    secure: true,
    path: "/",
    domain: DOMAIN,
  });
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost; secure; samesite=none;`;
};

export { deleteCookie, setCookie };
