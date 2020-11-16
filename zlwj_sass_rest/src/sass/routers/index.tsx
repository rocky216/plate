import React from 'react';
import {Switch, Route} from "react-router-dom"
import routerData from "./routerData"
import ErrorPage from "@common/views/auth/error"


class Routers extends React.Component {
  render() {
    return (
      <Switch>
        {routerData.map((item, index)=>(
          <Route key={index} exact={item.exact} path={item.path} component={item.component}  />
        ))}
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default Routers;