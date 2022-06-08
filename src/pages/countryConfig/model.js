/** MARK - Models */

import * as service  from "./services";

const initialState = {
  countryInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "countryConfig",
  state: initialState,
  reducers: {
    save2state(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    // 获取城市列表
    *getCountryLists({ opt, callback }, { put, call }) {
      const res = yield call(service.getCountryLists, { ...opt });
      callback?.call(null, res);
    },
    // 获取单个城市
    *getCountry({ opt, callback }, { put, call }) {
      const res = yield call(service.getCountry, { ...opt });
      callback?.call(null, res);
    },
    // 修改城市信息
    *modifyCountryInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.modifyCountryInfo, { ...opt });
      callback?.call(null, res);
    },
    // 删除城市
    *deleteCountryInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.deleteCountryInfo, { ...opt });
      callback?.call(null, res);
    },
    // 新增城市
    *saveCountryInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.saveCountryInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { countryInfo: res?.data?.data || {}, params: opt },
      });
      callback?.call(null, res);
    },
   
  },
};

export default modelConfig;
