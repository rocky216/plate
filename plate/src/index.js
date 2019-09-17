import "@babel/polyfill"
import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import {HashRouter, BrowserRouter, Route, Switch } from "react-router-dom"
import store from "@/store"
import Index from "@/views/index"

if (module.hot) {
  module.hot.accept();
}

render(
  <Provider store={store}>
    <HashRouter >
      <Switch>
        <Index/>
      </Switch>
    </HashRouter>
  </Provider>
  
  ,document.getElementById("root")
)