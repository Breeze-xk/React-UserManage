/** MARK - Models */

import * as service from './services';

const initialState = {
  homeInfo: {},
};

// /** MARK -  Dva */
const modelConfig = {
  namespace: 'formEngine',
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
    *workflowList({ opt, callback }, { put, call }) {
      const res = yield call(service.workflowList, { ...opt });
      yield put({
        type: 'save2state',
        payload: { homeInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getWorkflow({ opt, callback }, { put, call }) {
      const res = yield call(service.getWorkflow, { ...opt });
      yield put({
        type: 'save2state',
        payload: { homeInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *getProcess({ opt, callback }, { put, call }) {
      const res = yield call(service.getProcess, { ...opt });
      yield put({
        type: 'save2state',
        payload: { homeInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    *saveWorkflow({ opt, callback }, { put, call }) {
      const res = yield call(service.saveWorkflow, { ...opt });
      yield put({
        type: 'save2state',
        payload: { homeInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    
    *getNodes({ opt, callback }, { put, call }) {
      console.log("opt::", opt);
      const res = yield call(service.getNodes, { ...opt });
      
      callback?.call(null, res);
    },
    // 获取用户列表
    *getUserLists({ opt, callback }, { put, call }) {
      const res = yield call(service.getUserLists, { ...opt });
      yield put({
        type: 'save2state',
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
    // 群组
    *getGroupLists({ opt, callback }, { put, call }) {
      const res = yield call(service.getGroupLists, { ...opt });
      yield put({
        type: 'save2state',
        payload: { registerInfo: res?.data?.data || [], params: opt },
      });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
