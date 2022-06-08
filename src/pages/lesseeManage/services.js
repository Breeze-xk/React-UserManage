import http from "../../utils/api";

// 租户列表
export const getLesseeLists = (params) => {
  return http("post", "/tenant/list", { ...params });
};
// 租户信息
export const getLesseeInfo = (params) => {
  return http("get", "/tenant/get", { ...params });
};
// 修改租户信息
export const modifyLesseeInfo = (params) => {
  return http("post", "/tenant/modify", { ...params });
};
// 删除租户信息
export const deleteLesseeInfo = (params) => {
  return http("get", "/tenant/delete", { ...params });
};
// 新增租户信息
export const saveLesseeInfo = (params) => {
  return http("post", "/tenant/save", { ...params });
};

// 获取用户信息
export const getUserInfoList = (params) => {
  return http("post", "/user/info/list?pageSize=" + params.pageSize + "&currentPage=" + params.currentPage, { ...params });
};
// 获取用户信息
export const delUser = (params) => {
  return http("get", "/user/info/delete", { ...params });
};
// 获取用户信息
export const accessUser = (params) => {
  return http("post", "/tenant/user/access", { ...params });
};
