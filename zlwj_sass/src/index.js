
import "@babel/polyfill"
import React from "react"
import {render } from "react-dom"
import {HashRouter,Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"
import Index from "@/views"
import "./index.less"
import store from "@/store"
import Login from "@/views/auth/login"


if (module.hot) {
  module.hot.accept();
}

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Index/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
)



