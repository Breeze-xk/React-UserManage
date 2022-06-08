import http from "../../utils/api";

// 城市列表

export const getCountryLists = (params) => {
  return http("get", `/i12e/country-info/list?standardFlag=true`, { ...params });
};
// 获取单个城市
export const getCountry = (params) => {
  return http("get", `/city/standard/info/get`, { ...params });
};
// 修改城市信息
export const modifyCountryInfo = (params) => {
  return http("post", "/city/standard/info/modify", { ...params });
};
// 删除城市信息
export const deleteCountryInfo = (params) => {
  return http("get", "/city/standard/info/delete", { ...params });
};
// 新增城市信息
export const saveCountryInfo = (params) => {
  return http("post", "/i12e/country-info/save", { ...params });
};

