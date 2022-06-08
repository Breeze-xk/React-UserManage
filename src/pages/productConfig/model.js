/** MARK - Models */

import * as service  from "./services";

const initialState = {
  registerInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "productConfig",
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
    // 获取服务列表
    *getServiceLists({ opt, callback }, { put, call }) {
      const res = yield call(service.getServiceLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 修改服务信息
    *modifyServiceInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.modifyServiceInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 删除服务
    *deleteServiceInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.deleteServiceInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增服务
    *saveServiceInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.saveServiceInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
