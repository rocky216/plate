
import "@babel/polyfill"
import React from "react"
import {render } from "react-dom"
import {HashRouter,Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"
import App from "@/views"
import "./index.less"
import store from "@/store"
import Login from "@/views/auth/login"
import _ from "lodash"

window._ = _;

if (module.hot) {
  module.hot.accept();
}

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <App/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
)



