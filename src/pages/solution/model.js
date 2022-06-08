/** MARK - Models */

import {
  getGroupLists,
  getProductLists,
  getSolverLists,
  modifySolverInfo,
  deleteSolverInfo,
  addSolverInfo,
  getSolverInfo,
  getUserInfoList,
  getGroupUserList,
} from "./services";

const initialState = {
  registerInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "solutionManage",
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
    *getGroupUserList({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getGroupUserList, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    // 获取产品列表
    *getSolverLists({ opt, callback }, { put, call }) {
      const res = yield call(getSolverLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 产品信息
    *getSolverInfo({ opt, callback }, { put, call }) {
      const res = yield call(getSolverInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 添加产品信息
    *addSolverInfo({ opt, callback }, { put, call }) {
      const res = yield call(addSolverInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 修改产品信息
    *modifySolverInfo({ opt, callback }, { put, call }) {
      const res = yield call(modifySolverInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 删除产品
    *deleteSolverInfo({ opt, callback }, { put, call }) {
      const res = yield call(deleteSolverInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 用户列表
    *getUserInfoList({ opt, callback }, { put, call }) {
      const res = yield call(getUserInfoList, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 产品列表
    *getProductLists({ opt, callback }, { put, call }) {
      const res = yield call(getProductLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getGroupLists({ opt, callback }, { put, call }) {
      const res = yield call(getGroupLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
