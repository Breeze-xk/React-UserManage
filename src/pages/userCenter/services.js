import http from "../../utils/api";

// 用户列表
export const getUserLists = ({pageSize,currentPage, ...params}) => {
  return http("post", `/user/info/list?pageSize=${pageSize}&currentPage=${currentPage}`, { ...params });
};
// 用户信息
export const getUserInfo = (params) => {
  return http("get", "/user/info/get", { ...params });
};
// 修改用户信息
export const modifyUserInfo = (params) => {
  return http("post", "/user/info/modify", { ...params });
};
// 删除用户信息
export const deleteUserInfo = (params) => {
  return http("get", "/user/info/delete", { ...params });
};
