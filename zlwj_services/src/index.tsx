import React from 'react'
import * as ReactDOM from "react-dom"
import {Provider } from "react-redux"
import {HashRouter, Route, Switch} from "react-router-dom"
import "./index.less"
import Index from "@/views/index"
import store from "@/store"
import _ from "lodash"

window._ = _;


//热更新
if( (module as any).hot) {
  (module as any).hot.accept()
}

ReactDOM.render(
  <Provider store={store} >
    <HashRouter>
      <Index/>
    </HashRouter>
  </Provider>
  ,
  document.getElementById("root")
)
