import React from 'react'
import * as ReactDOM from "react-dom"
import {Provider } from "react-redux"
import {HashRouter, Route, Switch} from "react-router-dom"
import {Button} from "antd"
import "./index.less"
import  App from "@/views/app"
import store from "@/store"


//热更新
if( (module as any).hot) {
  (module as any).hot.accept()
}

ReactDOM.render(
  <Provider store={store} >
    <HashRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>
  ,
  document.getElementById("root")
)

// interface IProps {
//   color: string,
//   size?: string,
// }
// interface IState {
//   count: number,
// }
// class App extends React.Component<IProps, IState> {
//   public state = {
//     count: 1,
//   }
//   public render () {
//     return (
//       <div>Hello world</div>
//     )
//   }
// }