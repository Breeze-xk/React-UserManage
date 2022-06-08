import http from "../../utils/api";

// 服务列表
export const getServiceLists = (params) => {
  return http("post", `/service/list?pageSize=${params.pageSize}&currentPage=${params.currentPage}`, { ...params });
};
// 修改服务信息
export const modifyServiceInfo = (params) => {
  return http("post", "/service/modify", { ...params });
};
// 删除服务信息
export const deleteServiceInfo = (params) => {
  return http("get", "/service/delete", { ...params });
};
// 新增服务信息
export const saveServiceInfo = (params) => {
  return http("post", "/service/save", { ...params });
};

