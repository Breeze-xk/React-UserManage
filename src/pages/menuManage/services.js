import http from "../../utils/api";

export const getMenuLists = (params) => {
  console.log("servers--getMenuLists::", params);
  return http("post", "/menu/info/list?pageSize=1000&currentPage=1", { ...params });
};

export const createMenuLists = (params) => {
  console.log("servers--createMenuLists::", params);
  return http("post", "/menu/info/save", { ...params });
};

export const updateMenuLists = (params) => {
  console.log("servers--updateMenuLists::", params);
  return http("post", "/menu/info/modify", { ...params });
};

export const delMenuLists = (params) => {
  console.log("servers--delMenuLists::", params);
  return http("get", "/menu/info/delete", { ...params });
};

export const getMenuInfo = (params) => {
  console.log("servers--getMenuInfo::", params);
  return http("get", "/menu/info/get", { ...params });
};

export const getProduct = (params) => {
  console.log("servers--getProduct::", params);
  return http("get", "/product/list?pageSize=1000&currentPage=1", { ...params });
};

// 获取菜单下权限列表
export const getPermission = (params) => {
  console.log("servers--getPermission::", params);
  return http("post", "/permission/list?pageSize=1000&currentPage=1", { ...params });
};

// 添加菜单权限
export const addRolePermission = (params) => {
  return http("post", "/menu/info/permission/add", { ...params });
};
// 菜单删除成员
export const deleteRolePermission = (params) => {
  return http("post", "/menu/info/permission/delete", { ...params });
};