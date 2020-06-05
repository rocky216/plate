import React from 'react'
import * as ReactDOM from "react-dom"
import {Provider } from "react-redux"
import {HashRouter, Route, Switch} from "react-router-dom"
import "./index.less"
import Index from "@/views/index"
import store from "@/store"
import {ConfigProvider } from "antd"
import zhCN from 'antd/es/locale/zh_CN';



//热更新
if( (module as any).hot) { 
  (module as any).hot.accept()
}

ReactDOM.render(
  <Provider store={store} >
    <HashRouter>
      <ConfigProvider  locale={zhCN}>
        <Index/>
      </ConfigProvider>
    </HashRouter>
  </Provider>
  ,
  document.getElementById("root")
)
