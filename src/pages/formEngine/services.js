import http from '../../utils/api';

export const workflowList = (params) => {
  return http('post', '/workflow/proc-form-def/list', { ...params });
};
export const getWorkflow = (params) => {
  return http('post', `/workflow/proc-form-def/get?procDefId=${params?.procDefId}`, { ...params });
};
// 关联流程
export const getProcess = (params) => {
  return http('post', `/workflow/process-definition/simple-list`, { ...params });
};
// 通过流程获取任务
export const getNodes = (params) => {
  console.log("servers--",params);
  return http('post', `/workflow/process-definition/nodes/list?procDefId=${params?.procDefId}`, { ...params });
};
// 用户列表
export const getUserLists = ({ pageSize, currentPage, ...params }) => {
  return http('post', `/identify/list?pageSize=10000&currentPage=1`, { ...params });
};
// 群组
export const getGroupLists = (params) => {
  return http('post', `/group/get/list/by/user?pageSize=10000&currentPage=1`, { ...params });
};
export const saveWorkflow = (params) => {
  return http('post', `/workflow/proc-form-def/save`, { ...params });
};
