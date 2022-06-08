/** MARK - Models */

import {
  getUserLists,
  getUserInfo,
  modifyUserInfo,
  deleteUserInfo,
} from "./services";

const initialState = {
  registerInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "userCenter",
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
    // 获取用户列表
    *getUserLists({ opt, callback }, { put, call }) {
      const res = yield call(getUserLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 获取用户信息
    *getUserInfo({ opt, callback }, { put, call }) {
      const res = yield call(getUserInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 修改用户信息
    *modifyUserInfo({ opt, callback }, { put, call }) {
      const res = yield call(modifyUserInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 删除用户
    *deleteUserInfo({ opt, callback }, { put, call }) {
      const res = yield call(deleteUserInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
