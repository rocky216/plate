import React from "react"
import ReactDom from 'react-dom'
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"
import _ from "lodash"
import Index from "./views"
import Login from "./views/auth/login"
import store from "./store"

global._ = _;



if( module.hot) { 
  module.hot.accept()
}


ReactDom.render(
  <Provider store={store} >
    <Router>
      <Switch>
        <Route path="/login" component={Login} /> 
        <Index/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

