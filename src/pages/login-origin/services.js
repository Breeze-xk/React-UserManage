import http from "../../utils/api";

export const getLoginType = (params) => {
  console.log("servers---getLoginType::", params);
  return http("get", "/basic/config/get", { ...params });
};

export const goLogin = (params) => {
  console.log("servers---goLogin::", params);
  return http("post", "/user/auth/login", { ...params });
};

export const getLessee = (params) => {
  console.log("servers---getLessee::", params);
  return http("get", "/tenant/list-by-identify", { ...params });
};
// 获取验证码
export const getVerification  = (params) => {
  return http("post", "/user/auth/send-sms-code", { ...params });
};
// 修改密码
export const updatPeassword  = (params) => {
  return http("post", "/user/auth/update/password", { ...params });
};
// 验证验证码
export const checkCode  = (params) => {
  return http("post", "/user/auth/check/code", { ...params });
};
// 验证
export const checkKey  = (params) => {
  return http("post", "/user/auth/get/key?username="+params.username, { ...params });
};
// 获取userId
export const getuserId  = (params) => {
  return http("get", "/user/info/get-by-identify", { ...params });
};

// 获取权限
export const getPermission = (params) => {
  return http("get", '/user/info/permissions', { ...params, businessType: 'UNDERGROUND_GARAGE' })
};
