import http from "../../utils/api";

export const goRegister = (params) => {
  return http("post", "/identify/save", { ...params });
};
// 获取验证码
export const getVerification  = (params) => {
  return http("post", "/user/auth/send-sms-code", { ...params });
};
// 获取验证码
export const groupAddUser  = (params) => {
  return http("post", "/group/user/add", { ...params });
};
// 获取权限
export const getPermission = (params) => {
  return http("get", '/user/info/permissions', { ...params, businessType: 'UNDERGROUND_GARAGE' })
};
// 验证
export const checkKey  = (params) => {
  return http("post", "/user/auth/get/key?username="+params.username, { ...params });
};