import React from 'react'
import * as ReactDOM from "react-dom"
import {Provider } from "react-redux"
import {HashRouter, Route, Switch} from "react-router-dom"
import "./index.less"
import {ConfigProvider } from "antd"
import zhCN from 'antd/es/locale/zh_CN';
import Index from "./views/index"
import store from "./store"
import Login from "@public/pages/login"


//热更新
if( (module as any).hot) { 
  (module as any).hot.accept()
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter> 
      <ConfigProvider  locale={zhCN}>
        <Switch>
          <Route path="/login" component={Login} />
          <Index/>
        </Switch>
      </ConfigProvider>
    </HashRouter>
  </Provider>
  ,
  document.getElementById("root")
)
