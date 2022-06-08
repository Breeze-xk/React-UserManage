import http,{uploadFile2} from "../../utils/api";


// 获取应用列表
export const getBusinessList = (params) => {
  return http("get", "/business/definition/list", { ...params });
};
// 添加应用列表
export const addBusinessList = (params) => {
  return http("post", "/business/definition/save", { ...params });
};

// 删除应用列表
export const deleteBusinessList = (params) => {
  return http("get", "/business/definition/delete", { ...params });
};
// 上架，下架
export const storeUpDefinition = (params) => {
  return http("get", `/business/definition/store-up?storeUpFlag=${params?.storeUpFlag}`, { ...params });
};
// 获取类型
export const getBusinessType = (params) => {
  return http("get", `/business/definition/types?productDefinitionId=10`, { ...params });
};


export const convertFile = (params) => {
  return uploadFile2("/file/upload-images", params?.file, {
    ...params?.data,
    businessType: 'APP_MARKET'
  });
};