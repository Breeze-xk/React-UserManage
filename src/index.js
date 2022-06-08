import dva from "dva";
import "./index.css";
import createLoading from "dva-loading";

const createHistory = require("history").createHashHistory; // 这里使用的hash路由模式
// const createHistory=require("history").createBrowserHistory   // 使用history路由模式

// 创建应用
const app = dva({ history: createHistory() });

app.use(createLoading());

// 注册model, 会这样会自动导入global的model
app.model(require("./model/global").default);

// 注册路由
app.router(require("./route/index").default);

// 启动应用
app.start("#root");
