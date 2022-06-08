/** MARK - Models */

import * as service  from "./services";

const initialState = {
  registerInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "sceneManage",
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
    // 获取场景列表
    *getSceneLists({ opt, callback }, { put, call }) {
      const res = yield call(service.getSceneLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },

    // 修改场景信息
    *modifySceneInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.modifySceneInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 删除场景
    *deleteSceneInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.deleteSceneInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增场景
    *saveSceneInfo({ opt, callback }, { put, call }) {
      const res = yield call(service.saveSceneInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
   
  },
};

export default modelConfig;
