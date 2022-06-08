import http from "../../utils/api";

export const create = (params) => {
  console.log("servers---create::", params);
  return http("post", "/basic/config/save", { ...params });
};

export const getList = (params) => {
  console.log("servers---getList::", params);
  return http("get", "/basic/config/list-all", { ...params });
};
