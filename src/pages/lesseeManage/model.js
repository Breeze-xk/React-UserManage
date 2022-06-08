/** MARK - Models */

import {
  accessUser,
  delUser,
  getUserInfoList,
  getLesseeLists,
  getLesseeInfo,
  modifyLesseeInfo,
  saveLesseeInfo,
  deleteLesseeInfo,
} from "./services";

const initialState = {
  registerInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "lesseeManage",
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
    // 获取租户列表
    *getLesseeLists({ opt, callback }, { put, call }) {
      const res = yield call(getLesseeLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 获取租户信息
    *getLesseeInfo({ opt, callback }, { put, call }) {
      const res = yield call(getLesseeInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 修改租户信息
    *modifyLesseeInfo({ opt, callback }, { put, call }) {
      const res = yield call(modifyLesseeInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 删除租户
    *deleteLesseeInfo({ opt, callback }, { put, call }) {
      const res = yield call(deleteLesseeInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增租户
    *saveLesseeInfo({ opt, callback }, { put, call }) {
      const res = yield call(saveLesseeInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增租户
    *getUserInfoList({ opt, callback }, { put, call }) {
      const res = yield call(getUserInfoList, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增租户
    *accessUser({ opt, callback }, { put, call }) {
      const res = yield call(accessUser, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增租户
    *delUser({ opt, callback }, { put, call }) {
      const res = yield call(delUser, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
