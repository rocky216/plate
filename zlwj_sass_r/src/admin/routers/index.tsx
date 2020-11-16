import React, {Suspense } from "react"
import {Switch, Route} from "react-router-dom"
import loadable from 'loadable-components'
import routeData from "./routeData"
import ErrorPage from "@public/pages/error"
import _ from "lodash"

interface RouteConf {
  path: string;
  componet?: any;
  exact?: boolean;
  key?: string
}

class Routers extends React.Component {

  

  render() {
    return (
      <Switch>
        {routeData.map((item:any, index:number)=>(
          <Route key={index} {...item} />
        ))}
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default Routers