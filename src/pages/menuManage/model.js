/** MARK - Models */

import {
  getMenuLists,
  createMenuLists,
  updateMenuLists,
  delMenuLists,
  getMenuInfo,
  getProduct,
  getPermission,
  addRolePermission,
  deleteRolePermission,
} from "./services";

const initialState = {
  List: [],
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "menuManage",
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
    *getMenuLists({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getMenuLists, { ...opt });
      console.log("res::", res);
      yield put({
        type: "save2state",
        payload: { List: res?.data?.data?.list || [], params: opt },
      });
      callback?.call(null, res);
    },
    *createMenuLists({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(createMenuLists, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *updateMenuLists({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(updateMenuLists, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *delMenuLists({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(delMenuLists, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *getMenuInfo({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getMenuInfo, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *getProduct({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getProduct, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *getPermission({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(getPermission, { ...opt });
      console.log("res::", res);
      callback?.call(null, res);
    },
    *addRolePermission({ opt, callback }, { put, call }) {
      const res = yield call(addRolePermission, { ...opt });
      callback?.call(null, res);
    },
    *deleteRolePermission({ opt, callback }, { put, call }) {
      const res = yield call(deleteRolePermission, { ...opt });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
