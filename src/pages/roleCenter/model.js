/** MARK - Models */

import {
  getRoleLists,
  getPermissionList,
  deleteRolePermission,
  modifyRoleInfo,
  createRole,
  getRoleInfo,
  addRolePermission,
  delRole,
} from "./services";

const initialState = {
  List: [],
};
// /** MARK -  Dva */
const modelConfig = {
  namespace: "roleManage",
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
    *getRoleLists({ opt, callback }, { put, call }) {
      const res = yield call(getRoleLists, { ...opt });
      callback?.call(null, res);
    },
    *createRole({ opt, callback }, { put, call }) {
      const res = yield call(createRole, { ...opt });
      callback?.call(null, res);
    },
    *getRoleInfo({ opt, callback }, { put, call }) {
      const res = yield call(getRoleInfo, { ...opt });
      yield put({
        type: "save2state",
        payload: { List: res || [], params: opt },
      });
      callback?.call(null, res);
    },
    *modifyRoleInfo({ opt, callback }, { put, call }) {
      const res = yield call(modifyRoleInfo, { ...opt });
      callback?.call(null, res);
    },
    *delRole({ opt, callback }, { put, call }) {
      const res = yield call(delRole, { ...opt });
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
    *getPermissionList({ opt, callback }, { put, call }) {
      const res = yield call(getPermissionList, { ...opt });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
