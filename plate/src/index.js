import "@babel/polyfill"
import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import {HashRouter, BrowserRouter, Route, Switch } from "react-router-dom"
import store from "@/store"
import Index from "@/views/index"
import _ from "lodash"
import Login from "@/views/auth/login"

if (module.hot) {
  module.hot.accept();
}


window._ = _;

render(
  <Provider store={store}>
    <HashRouter >
      <Switch>
        <Route path="/login" component={Login} />
        <Index/>
      </Switch>
    </HashRouter>
  </Provider>
  
  ,document.getElementById("root")
)