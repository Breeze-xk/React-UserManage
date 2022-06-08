/** MARK - Models */

import { getVerification, updatPeassword } from "./services";

const initialState = {
  userInfo: {},
};

// /** MARK -  Dva */
const modelConfig = {
  namespace: "forgetPwd",
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
    *getVerification({ opt, callback }, { put, call }) {
      const res = yield call(getVerification, { ...opt });
      callback?.call(null, res);
    },
    *updatPeassword({ opt, callback }, { put, call }) {
      const res = yield call(updatPeassword, { ...opt });
      callback?.call(null, res);
    },
    
  },
};

export default modelConfig;
