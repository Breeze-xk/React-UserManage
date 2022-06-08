import http from "../../utils/api";

export const getRoleLists = ({currentPage, pageSize,...params}) => {
  return http("post", `/role/list?currentPage=${currentPage}&pageSize=${pageSize}`, { ...params });
};

export const createRole = (params) => {
  return http("post", "/role/save", { ...params });
};
// 团队详情
export const getRoleInfo = (params) => {
  return http("get", "/role/get", { ...params });
};
// 团队编辑
export const modifyRoleInfo = (params) => {
  return http("post", "/role/modify", { ...params });
};

export const delRole = (params) => {
  return http("get", "/role/delete", { ...params });
};
// 角色下权限列表
export const getPermissionList = ({currentPage, pageSize,...params}) => {
  return http("post", `/permission/list?currentPage=${currentPage}&pageSize=${pageSize}`, { ...params });
};

// 添加角色权限
export const addRolePermission = (params) => {
  return http("post", "/role/permission/add", { ...params });
};
// 角色删除成员
export const deleteRolePermission = (params) => {
  return http("post", "/role/permission/delete", { ...params });
};
