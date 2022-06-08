/** MARK - Models */
import * as service from "./services";

// /** MARK -  Dva */
const modelConfig = {
  namespace: "jsonConfig",
  state: {},
  reducers: {},
  effects: {
    *create({ opt, callback }, { put, call }) {
      const res = yield call(service.create, { ...opt });
      callback?.call(null, res);
      return res;
    },
    *getList({ opt, callback }, { put, call }) {
      const res = yield call(service.getList, { ...opt });
      callback?.call(null, res);
      return res;
    },
  },
};

export default modelConfig;
