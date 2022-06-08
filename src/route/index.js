import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import Admin from "../layouts/index";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { ConfigProvider } from "antd";

import { routes, homeRoute } from "./routeConfig";

function RouterCompontent({ history, app }) {
  return (
    <Router history={history}>
      <ConfigProvider locale={zh_CN}>
        <Switch>
          {routes.map(({ path, ...dynamics }, index) => {
            if (path == "/") {
              return <Redirect from="/" to="/login" />;
            }
            return (
              <Route
                key={index}
                path={path}
                exact={false}
                component={dynamic({ app, ...dynamics })}
              />
            );
          })}

          {/* <Redirect from="/" to="/login" /> */}
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Admin>
            {homeRoute.map(({ ...dynamics }, index) => {
              return (
                <Route
                  key={index}
                  path={dynamics.path}
                  exact={false}
                  detail={dynamics}
                  component={dynamic({ app, ...dynamics })}
                />
              );
            })}
          </Admin>
          {/* <Redirect from="/" to="/userCenter" /> */}
        </Switch>
      </ConfigProvider>
    </Router>
  );
}

export default RouterCompontent;
