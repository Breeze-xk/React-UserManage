/** MARK - Models */

import { goRegister, getVerification, groupAddUser, getPermission ,checkKey} from "./services";

const initialState = {
  registerInfo: {},
};

// /** MARK -  Dva */
const modelConfig = {
  namespace: "register",
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
    *goRegister({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(goRegister, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      return res
    },
    *getVerification({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getVerification, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *groupAddUser({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(groupAddUser, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getPermission({ opt, callback }, { put, call }) {
      console.log('opt::', opt);
      const res = yield call(getPermission, { ...opt });
      console.log('res::', res);
      return res
    },
    *checkKey({ opt, callback }, { put, call }) {
      const res = yield call(checkKey, { ...opt });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
