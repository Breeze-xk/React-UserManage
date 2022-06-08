import http from "../../utils/api";

export const getOrganLists = (params) => {
  console.log("servers--getOrganLists::", params);
  return http("post", "/organization/list", { ...params });
};

export const createOrgan = (params) => {
  console.log("servers--createGroup::", params);
  return http("post", "/organization/save", { ...params });
};
// 机构详情
export const getOrganInfo = (params) => {
  console.log("servers--createGroup::", params);
  return http("get", "/organization/get", { ...params });
};
// 机构编辑
export const modifyOrganInfo = (params) => {
  console.log("servers--createGroup::", params);
  return http("post", "/organization/modify", { ...params });
};

export const deleteOrgan = (params) => {
  console.log("servers--deleteOrgan::", params);
  return http("get", "/organization/delete", { ...params });
};
// 机构下用户列表
export const getOrganUserList = ({currentPage,pageSize, ...params }) => {
  console.log("servers--getOrganUserList::", params);
  return http("post", `/user/info/list?pageSize=${pageSize}&currentPage=${currentPage || 1}`, { ...params });
};
// 机构添加成员
export const addOrganUser = (params) => {
  console.log("servers--addOrganUser::", params);
  return http("post", "/organization/user/add", { ...params });
};
// 机构删除成员
export const deleteOrganUser = (params) => {
  console.log("servers--deleteOrganUser::", params);
  return http("post", "/organization/user/delete", { ...params });
};
