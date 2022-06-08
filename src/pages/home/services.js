import http from "../../utils/api";

export const goHome = (params) => {
  console.log("servers--goHome::", params);
  return http("post", "/user/info/save", { ...params });
};
