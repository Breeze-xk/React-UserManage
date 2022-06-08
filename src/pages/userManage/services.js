import http from "../../utils/api";

// 用户列表
export const getUserLists = ({pageSize,currentPage, ...params}) => {
  return http("post", `/identify/list?pageSize=${pageSize}&currentPage=${currentPage}`, { ...params });
};
// 用户信息
export const getUserInfo = (params) => {
  return http("get", "/identify/get", { ...params });
};
// 修改用户信息
export const modifyUserInfo = (params) => {
  return http("post", "/identify/modify", { ...params });
};
// 删除用户信息
export const deleteUserInfo = (params) => {
  return http("get", "/identify/delete", { ...params });
};
// 新增用户信息
export const saveUserInfo = (params) => {
  return http("post", "/identify/save", { ...params });
};
// 租户信息
export const getTenantList = (params) => {
  return http("post", "/tenant/list", { ...params });
};
// 删除用户
export const handleDelUser = (params) => {
  return http("get", "/user/info/delete", { ...params });
};
// 添加用户
export const handleSaveUser = (params) => {
  return http("post", "/user/info/save", { ...params });
};
