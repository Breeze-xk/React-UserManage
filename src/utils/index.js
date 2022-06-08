/**
 * 获取浏览器url参数
 */
 import moment from "moment";
 import md5 from 'js-md5'
import JSEncrypt from 'jsencrypt'
export const qs = (search) => {
  search = decodeURIComponent(search);
  const obj = {};
  if (search) {
    let str = "";
    if (search.indexOf("?") == 0) {
      str = search.slice(1);
    } else {
      str = search;
    }
    const paramsArr = str.split("&");
    paramsArr.forEach((item) => {
      const [key, value] = item.split("=");
      if (obj[key]) {
        obj[key] = Array.prototype.concat.call(obj[key], value);
      } else {
        obj[key] = value;
      }
    });
  }
  return obj;
};

// json转tree
export const setTreeData = (arr, name, parentIdName) => {
  if (arr && arr.length > 0) {
    arr.map((item) => {
      return (item.title = item[name]), (item.key = item.id);
    });

    // 删除所有的children,以防止多次调用
    arr.forEach(function(item) {
      // if(item?.roleCode == 'role_team_member'){
      //   item['disabled'] = true;
      // }
      delete item.children;
    });
    let map = {}; //构建map
    arr.forEach((i) => {
 
      map[i.id] = i; //构建以id为键 当前数据为值

    });
    let treeData = [];
    arr.forEach((child) => {
      const mapItem = map[child[parentIdName]]; //判断当前数据的父节点id是否存在map中
      if (mapItem) {
        //存在则表示当前数据不是最顶层的数据
        //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
        (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
      } else {
        //不存在则是顶层数据
        treeData.push(child);
      }
    });
    return treeData;
  } else {
    return arr;
  }
};

/**
 * @description 根据路径获取对象的值（也可用插件@babel/plugin-proposal-optional-chaining）
 * @param {object} obj - 对象
 * @param {string} keypath - 路径
 * @param {any} defaultValue - 默认值
 */
export const getValue = (obj, keypath, defaultValue = undefined) => {
  if (!obj) {
    throw new Error("the first param obj is required");
  }
  if (!keypath) {
    throw new Error("the second param keypath is required");
  }
  if (getDataType(obj) !== "Object") {
    throw new Error("the first param obj must be object");
  }
  if (getDataType(keypath) !== "String") {
    throw new Error("the second param keypath must be string");
  }
  // return String.prototype.split.call(keypath, /[,[\].]+?/)
  //   .filter(Boolean)
  //   .reduce((a, c) => (Object.hasOwnProperty.call(a,c) ? a[c] : defaultValue), obj)

  keypath = keypath
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter((item) => !["", null, undefined].includes(item));
  for (const key of keypath) {
    obj = Object(obj)[key];
    if (obj === undefined) {
      return defaultValue;
    }
  }
  return obj;
};
export const timeShow = (d) => {
  return moment(d)
    .utcOffset(8)
    .format("YYYY-MM-DD HH:mm:ss");
};

// 密码加密
export const encryptorPassword = (password) => {
  const pubKey =  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybhjHZ8h4wwmC8KwQvrW\n" +
  "nbhcX26jp+KQdFnfOaRXpTJQeVshkIJ32mEoF0dI9xQlTmACy9payQHhCp41QTav\n" +
  "t83jsiEPlavngJkWZbwKaUuXFdNA7Jjw04+uDyI7FsBkGcNN2KIFa8WTiqpGV4GJ\n" +
  "zwMViTpZY3zQAKWoKLThr1zB0LvHHOmJySBiQYbYn8YtH/HKzVowunJQJJoWF7RA\n" +
  "unob6EjsbrqIRjaaxDMKFuZxv9euC1ViLPeXlR9XF1yEdk/r8+bazEOik4hzb/55\n" +
  "SYWSyCrE/hGvknF0Drp41Z+/+SyjEvokUxoAQg7kLlcJboY4wdvDtJBROxQ7XORz\n" +
  "+wIDAQAB";
  
  let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
  encryptor.setPublicKey(pubKey.replace("\n", ""));  // 设置公钥

  console.log(md5(password),'md5(password)')
  return encryptor.encrypt(md5(password));
};

// 校验解密
export const decryptVerify = (key) => {
  const publicKeyStr = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAljtIR95iWGJYSxaf2wNw\n'+
  'mSzeR8mH/q1fPuR1RnRuySqL+nuB0hX4AUHhbN41veIONhs1l7TA9O37eEp6lBSw\n'+
  'uTsuKLFVDC4llZspwr9r3PuQq3+1wKncE7C0vsPsPbTtNAZVkH447Ovr8UMD3e4E\n'+
  'cvY3r3nr2ShcNrR8SqEwa0rqP1zi+wT94TzhLHk3tgYg2KOQO1tnHxlBVzTokIuY\n'+
  '8G+rRvkzteq6WyaVRvITqtOGXoCHosqiLstu0yjOpggxYSWEgmXzAFdTd+wIifdH\n'+
  'cgCVaqgFOFGyfxfo9nLO9Xnj/Ou0FarUHlyHcUXTwAc/QDDoJ8a3FYercff9aQNw\n'+
  '9QIDAQAB';
  const privateKeyStr =  'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWO0hH3mJYYlhL\n'+
  'Fp/bA3CZLN5HyYf+rV8+5HVGdG7JKov6e4HSFfgBQeFs3jW94g42GzWXtMD07ft4\n'+
  'SnqUFLC5Oy4osVUMLiWVmynCv2vc+5Crf7XAqdwTsLS+w+w9tO00BlWQfjjs6+vx\n'+
  'QwPd7gRy9jeveevZKFw2tHxKoTBrSuo/XOL7BP3hPOEseTe2BiDYo5A7W2cfGUFX\n'+
  'NOiQi5jwb6tG+TO16rpbJpVG8hOq04ZegIeiyqIuy27TKM6mCDFhJYSCZfMAV1N3\n'+
  '7AiJ90dyAJVqqAU4UbJ/F+j2cs71eeP867QVqtQeXIdxRdPABz9AMOgnxrcVh6tx\n'+
  '9/1pA3D1AgMBAAECggEAMQaZmPKGr4cwfxicBDIELciJpW2sFr1nRrPxXZOjj7x1\n'+
  'v8FMZU3MCEUClq+RZC0ALEIG5EIVchizptbPV8HExj3820S7l2T72O2w3B/xyETE\n'+
  'OmNL4drMuhRBd7uiPaTsf7zNcYDvfMmkzq/q9CK3ivi0xWwJPm3AYg3WPdiKX4is\n'+
  'FN88fC0yYtqNSwXlDhpR6nuSbX30jnUrQo8NJMo1PHgDKmcta8JDzLwSPj0ib9iX\n'+
  'NgNGe7cHsuFlNQX9uyM31rpaJjyFhWeOdWN5M1Ks08dAXTKIwriAxsr8pxuh4ikV\n'+
  'gYSJpite717ZjXgo/LdYJuN8wnWimAqdN36ciFJFYQKBgQDGvMb7iJ9aHCAQ54o1\n'+
  '9RerGCdgqHJK9+DjLUfCTszRu06jXFT7npTyQ9/Mbp9xFalxWkH5ZJJtqUR+ScBA\n'+
  'gn/vgbE0tT80MJGVnwyxKt5fgfWATZ01VADGagNwy3nJnR5Fjqy21pecOUY6E71X\n'+
  'DKIFCr3M3BQF574iEhjRA18yuQKBgQDBhKDskKYUMMhN7BpTL1A0sqp/l4Cfzhh+\n'+
  '0iW/I1yHbIK+2O8UtXwpj82HpC1ssci35UW+XLNh4GbAY4uYEn/tMtKEJo7yNhDw\n'+
  'JTF4u+a9CDvGNuwfLWatcLx5MjYLIQugyyHBvFDWi/9wzev/0gW7sj1zJ8J60MRK\n'+
  'bG4kNd9CHQKBgD6d8jAEjvjMTcolueVgUNHGrXmF+WTnjwLlHGv7egtG8fMEv338\n'+
  'LD/c5OG7pR7zTUz6vDjA2GYW5A7KW/m3ZGnpOhU6WiyudOBomY4kzKXZA6omSjco\n'+
  'PYpGksjyQ3Ajwgr2djKxkFlXrmnUGF8aCt590OmAGgr2RnDjtM/+OPt5AoGBAI69\n'+
  'GUXk29uAr/5p7HD3MR3tuz0prsIw7nh84UK+/n0VWMsUkCSiSNcPLvah7q+B4x9h\n'+
  'ibQEBHxpXOEDi++7lYiMOCMpnb6iipPXm0oGrwc3j3+A+2Fzx4ye3yY2Fw7WbRFJ\n'+
  'Q7j3All+Igg+m5iyfXAY5KKP7S9R1bdfi05CPk8xAoGAByZyJ9+LLvUqhmQjJP/5\n'+
  'DuYbOXH0uYuCHojAMTVxaz1n24TWujzU3e+NumGwoTFzfytuRd5gWGmXIWus9Cn7\n'+
  '8I8ZbhmXIdNsJON7iXuntXYu98WIRmtoUrMfzvwrCiC32wxBiZa0scSnh69OO4Sh\n'+
  'UubiPwLcxhgUVWLw1ZwOUTM=';
  let decrypt = new JSEncrypt();  // 新建JSEncrypt对象
  decrypt.setPrivateKey(privateKeyStr.replace("\n", ""));  // 设置
  return decrypt.decrypt(key);
};

//判断字符是否为空的方法
export const isEmpty=(str)=>{
  if(typeof str == "undefined" || str == null || str == ""){
      return true;
  }else{
      return false;
  }
}