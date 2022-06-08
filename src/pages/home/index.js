import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import { secroutes } from "../../route/routeConfig";
import Admin from "../../layouts/index";
import { connect } from "dva";

const mapState2Props = ({ global, home }) => ({ global, home });

@connect(mapState2Props)
export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("home::::--------", this);
    console.log("secroutes::::--------", secroutes);
  }

  render() {
    return (
      <div>
        {/* <Admin _this={this}>
          {
            secroutes.map(item=>{
              return <Route  key={item.path} exact={false} path={item.path} component={item} />
            })
          }
          <Redirect from="/home" to="/home/userList" />
        </Admin> */}
      </div>
    );
  }
}

// export default RouterCompontent;
