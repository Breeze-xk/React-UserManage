import http from "../../utils/api";

// 权限列表
export const getPermissionLists = ({pageSize,currentPage, ...params}) => {
  // return http("post", `/permission/list?pageSize=${pageSize}&currentPage=${currentPage}`, { ...params });
  return http("post", `/permission/list?pageSize=1000&currentPage=1`, { ...params });
};
// 权限信息
export const getPermissionInfo = (params) => {
  return http("get", "/permission/get", { ...params });
};
// 修改权限信息
export const modifyPermissionInfo = (params) => {
  return http("post", "/permission/modify", { ...params });
};
// 删除权限信息
export const deletePermissionInfo = (params) => {
  return http("get", "/permission/delete", { ...params });
};
// 新增权限信息
export const savePermissionInfo = (params) => {
  return http("post", "/permission/save", { ...params });
};

// 获取权限下产品列表
export const getProduct = (params) => {
  console.log("servers--getProduct::", params);
  return http("get", "/product/list", { ...params });
};