import http from "../../utils/api";

// 解决方列表
export const getSolverLists = (params) => {
  const { currentPage, pageSize } = params;
  return http(
    "post",
    `/solver/list?currentPage=${currentPage}&pageSize=${pageSize}`,
    { ...params }
  );
};
// 团队下用户列表
export const getGroupUserList = (params) => {
  return http("post", `/user/info/group/list`, { ...params });
};
// 修改解决方信息
export const modifySolverInfo = (params) => {
  return http("post", "/solver/modify", { ...params });
};
// 获取解决方信息
export const getSolverInfo = (params) => {
  return http("get", "/solver/get", { ...params });
};
// 删除解决方信息
export const deleteSolverInfo = (params) => {
  return http("get", "/solver/delete", { ...params });
};
// 添加解决方信息
export const addSolverInfo = (params) => {
  return http("post", "/solver/save", { ...params });
};

export const getGroupLists = (params) => {
  const { currentPage, pageSize } = params;
  return http(
    "post",
    `/group/get/list/by/user?currentPage=${currentPage}&pageSize=${pageSize}`,
    { ...params }
  );
};
// 产品列表
export const getProductLists = (params) => {
  const { currentPage, pageSize } = params;
  return http(
    "post",
    `/service/list?currentPage=${currentPage}&pageSize=${pageSize}`,
    { ...params }
  );
};

// 获取用户信息
export const getUserInfoList = (params) => {
  const { currentPage, pageSize } = params;
  return http(
    "post",
    `/user/info/list?currentPage=${currentPage}&pageSize=${pageSize}`,
    { ...params }
  );
};
