/** MARK - Models */

import * as service from "./services";
import { message } from "antd";

const initialState = {
  list: [],
  moduleData: {},
};

// /** MARK -  Dva */
const modelConfig = {
  namespace: "integrationTools",
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
    *getBusinessList({ opt, callback }, { put, call }) {
      const res = yield call(service.getBusinessList, { ...opt });
      callback?.call(null, res);
    },
    *getBusinessType({ opt, callback }, { put, call }) {
      const res = yield call(service.getBusinessType, { ...opt });
      callback?.call(null, res);
    },
    
    *addBusinessList({ opt, callback }, { put, call }) {
      const res = yield call(service.addBusinessList, { ...opt });
      callback?.call(null, res);
    },
    *deleteBusinessList({ opt, callback }, { put, call }) {
      const res = yield call(service.deleteBusinessList, { ...opt });
      callback?.call(null, res);
    },
    *storeUpDefinition({ opt, callback }, { put, call }) {
      const res = yield call(service.storeUpDefinition, { ...opt });
      callback?.call(null, res);
    },
    *convertFile({ opt, callback }, { put, call }) {
      const res = yield call(service.convertFile, { ...opt });
      callback?.call(null, res);
    },
  },
};

export default modelConfig;
