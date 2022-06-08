/** MARK - Models */

import { goHome } from "./services";

const initialState = {
  homeInfo: {},
};

// /** MARK -  Dva */
const modelConfig = {
  namespace: "home",
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
    *goHome({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(goHome, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { homeInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
