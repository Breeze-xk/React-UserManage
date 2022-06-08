import http from "../../utils/api";

// 场景列表
export const getSceneLists = (params) => {
  return http("post", `/message/scene/list?pageSize=${params.pageSize}&currentPage=${params.currentPage}`, { ...params });
};
// 修改场景信息
export const modifySceneInfo = (params) => {
  return http("post", "/message/scene/modify", { ...params });
};
// 删除场景信息
export const deleteSceneInfo = (params) => {
  return http("get", "/message/scene/delete", { ...params });
};
// 新增场景信息
export const saveSceneInfo = (params) => {
  return http("post", "/message/scene/save", { ...params });
};

