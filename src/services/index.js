import http from "../utils/api";

export const goLogin = (params) => {
  console.log("servers---goLogin::", params);
  return http("post", "/user/auth/login", { ...params });
};

export const getMenu = (params) => {
  console.log("servers---getMenu::", params);
  return http("get", "/", { ...params });
};
