/** MARK - Models */

import {
  getPermissionLists,
  getPermissionInfo,
  modifyPermissionInfo,
  savePermissionInfo,
  deletePermissionInfo,
  getProduct,
} from "./services";

const initialState = {
  registerInfo: {},
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "permissionManage",
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
    // 获取权限列表
    *getPermissionLists({ opt, callback }, { put, call }) {
      const res = yield call(getPermissionLists, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 获取用户信息
    *getPermissionInfo({ opt, callback }, { put, call }) {
      const res = yield call(getPermissionInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 修改用户信息
    *modifyPermissionInfo({ opt, callback }, { put, call }) {
      const res = yield call(modifyPermissionInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 删除用户
    *deletePermissionInfo({ opt, callback }, { put, call }) {
      const res = yield call(deletePermissionInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 新增用户
    *savePermissionInfo({ opt, callback }, { put, call }) {
      const res = yield call(savePermissionInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getProduct({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getProduct, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
