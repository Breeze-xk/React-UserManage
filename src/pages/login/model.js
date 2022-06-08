/** MARK - Models */

import { getLoginType, goLogin, getVerification,updatPeassword, checkCode,getLessee, getuserId,checkKey, getPermission } from "./services";

const initialState = {
  typeList: [],
  loginInfo: {},
};

// /** MARK -  Dva */
const modelConfig = {
  namespace: "login",
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
    *getLoginType({ opt, callback }, { call, put }) {
      console.log("opt::::", opt);
      const res = yield call(getLoginType, opt);
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { typeList: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *goLogin({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(goLogin, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { loginInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getLessee({ opt, callback }, { put, call }) {
      const res = yield call(getLessee, { ...opt });
      callback?.call(null, res);
    },
    *getVerification({ opt, callback }, { put, call }) {
      const res = yield call(getVerification, { ...opt });
      callback?.call(null, res);
    },
    *updatPeassword({ opt, callback }, { put, call }) {
      const res = yield call(updatPeassword, { ...opt });
      callback?.call(null, res);
    },
    *checkCode({ opt, callback }, { put, call }) {
      const res = yield call(checkCode, { ...opt });
      callback?.call(null, res);
    },
    *checkKey({ opt, callback }, { put, call }) {
      const res = yield call(checkKey, { ...opt });
      callback?.call(null, res);
    },
    
    *getuserId({ opt, callback }, { put, call }) {
      const res = yield call(getuserId, { ...opt });
      callback?.call(null, res);
      return res
    },
    *getPermission({ opt, callback }, { put, call }) {
      console.log('opt::', opt);
      const res = yield call(getPermission, { ...opt });
      console.log('res::', res);
      return res
    },
  },
};

export default modelConfig;
