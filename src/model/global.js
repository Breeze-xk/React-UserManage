import { goLogin, getMenu } from "../services/index";

const initState = {
  text: "我是全局的state",
  userInfo: {},
  menuList: []
};

export default {
  namespace: "global",
  state: initState,
  subscriptions: {},
  reducers: {
    save2state(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *goLogin({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(goLogin, {
        ...opt,
        authKey: "",
        authType: "SIMPLE",
        authValue: "",
        username: "看客",
      });
      // const res = yield call(goLogin, {...opt})
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { userInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getMenu({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getMenu, { ...opt });
      // const res = yield call(goLogin, {...opt})
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { menuList: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
  subscriptions: {
    // setup({ dispatch }) {
    //   dispatch({ type: "goLogin" });
    //   // dispatch({ type: "getMenu" });
    // },
  },
};
