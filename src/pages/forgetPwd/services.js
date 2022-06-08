import http from "../../utils/api";

// 获取验证码
export const getVerification  = (params) => {
  return http("post", "/user/auth/send-sms-code", { ...params });
};
// 修改密码
export const updatPeassword  = (params) => {
  return http("post", "/user/auth/update/password", { ...params });
};
