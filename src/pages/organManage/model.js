/** MARK - Models */

import {
  getOrganLists,
  deleteOrganUser,
  modifyOrganInfo,
  createOrgan,
  getOrganUserList,
  getOrganInfo,
  addOrganUser,
  deleteOrgan,
} from "./services";

const initialState = {
  List: [],
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "organManage",
  state: initialState,
  reducers: {
    save2state(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *getOrganLists({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getOrganLists, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *createOrgan({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(createOrgan, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *getOrganInfo({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getOrganInfo, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { List: res || [], params: opt },
      });
      callback?.call(null, res);
    },
    *modifyOrganInfo({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(modifyOrganInfo, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *deleteOrgan({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(deleteOrgan, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *getOrganUserList({ opt, callback }, { put, call }) {
      console.log("opt11111::", opt);
      const res = yield call(getOrganUserList, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *addOrganUser({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(addOrganUser, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *deleteOrganUser({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(deleteOrganUser, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
