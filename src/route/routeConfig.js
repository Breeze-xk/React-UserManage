export const routes = [
  {
    path: "/login",
    models: () => [import("../pages/login/model")],
    component: () => import("../pages/login/index"),
  },
  {
    path: "/register",
    models: () => [import("../pages/register/model")],
    component: () => import("../pages/register/index"),
  },
];

export const homeRoute = [
  // {
  //   name: "个人主页",
  //   path: "/personalCenter",
  //   // models: () => [import("../pages/personalCenter/model")],
  //   component: () => import("../pages/personalCenter/index"),
  // },
  {
    name: "用户管理",
    path: "/userCenter", //用户租户关系
    models: () => [import("../pages/userCenter/model")],
    component: () => import("../pages/userCenter/index"),
  },
  {
    name: "机构管理",
    path: "/organManage",
    models: () => [import("../pages/organManage/model")],
    component: () => import("../pages/organManage/index"),
  },
  
  {
    name: "权限管理",
    path: "/permissionManage",
    models: () => [import("../pages/permissionManage/model")],
    component: () => import("../pages/permissionManage/index"),
  },
  {
    name: "角色管理",
    path: "/roleCenter",
    models: () => [import("../pages/roleCenter/model")],
    component: () => import("../pages/roleCenter/index"),
  },
  {
    name: "表单引擎",
    path: "/formEngine",
    models: () => [import("../pages/formEngine/model")],
    component: () => import("../pages/formEngine/index"),
  },
  
  {
    name: "解决方管理(内部)",
    path: "/solution", //用户
    models: () => [import("../pages/solution/model")],
    component: () => import("../pages/solution/index"),
  },
  {
    name: "身份管理(内部)",
    path: "/userManage", //用户
    models: () => [import("../pages/userManage/model")],
    component: () => import("../pages/userManage/index"),
  },
  {
    name: "租户管理(内部)",
    path: "/lesseeManage", //租户
    models: () => [import("../pages/lesseeManage/model")],
    component: () => import("../pages/lesseeManage/index"),
  },
  {
    name: "场景管理(内部)",
    path: "/sceneManage",
    models: () => [import("../pages/sceneManage/model")],
    component: () => import("../pages/sceneManage/index"),
  },
  {
    name: "修改密码",
    path: "/forgetPwd",
    models: () => [import("../pages/forgetPwd/model")],
    component: () => import("../pages/forgetPwd/index"),
  },
  
  {
    name: "服务管理(内部)",
    path: "/productConfig",
    models: () => [import("../pages/productConfig/model")],
    component: () => import("../pages/productConfig/index"),
  },
  {
    name: "菜单管理(内部)",
    path: "/menuManage",
    models: () => [import("../pages/menuManage/model")],
    component: () => import("../pages/menuManage/index"),
  },
  {
    name: "城市配置(内部)",
    path: "/countryConfig",
    models: () => [import("../pages/countryConfig/model")],
    component: () => import("../pages/countryConfig/index"),
  },
  {
    name: "系统集成工具",
    path: "/IntegrationTools",
    models: () => [import("../pages/IntegrationTools/model")],
    component: () => import("../pages/IntegrationTools/index"),
  },
  // {
  //   name: "JSON配置(内部)",
  //   path: "/jsonConfig",
  //   models: () => [import("../pages/jsonConfig/model")],
  //   component: () => import("../pages/jsonConfig/index"),
  // },
];
