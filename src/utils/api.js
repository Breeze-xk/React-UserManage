/**
 * 网络请求配置
 */
import axios from "axios";

import serverEnvConfig from 'serverEnvConfig';
axios.defaults.timeout = 100000;
axios.defaults.baseURL = serverEnvConfig.baseURL;



/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    if(config.url == '/user/info/get-by-identify') {
      config.headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      };
    } else {
      config.headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        userId: sessionStorage.getItem("userId") || 0,
        tenantId: sessionStorage.getItem("tenantId") || 0,
      };
    }
    return config;
  },
  (error) => {
    console.log("api---error::", error);
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("请求出错: ", error);
    return error;
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 上传文件的请求
 * @param url
 * @returns {AxiosPromise}
 */
 export function uploadFile(file, data) {
  let FD = require('form-data');
  let formData = new FD();
  formData.append('file', file)

  for (let key in data) {
    console.log(key + '---' + data[key])
    formData.append(key, data[key])
  }
  let config = {
    method: 'post',
    url: '/fileUpload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  };
  const ax = axios.create();
  return ax(config)
};
export function uploadFile2(url, file, data) {
  let FD = require("form-data");
  let formData = new FD();
  formData.append("file", file);
  for (let key in data) {
    formData.append(key, data[key]);
  }

  // upload-file
  // upload-images
  let config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
      userId: sessionStorage.getItem("userId") || 0,
      tenantId: sessionStorage.getItem("tenantId") || 0,
    },
    data: formData,
  };
  const ax = axios.create();
  return ax(config);
}

//统一接口处理，返回数据
export default function (fecth, url, param) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}
