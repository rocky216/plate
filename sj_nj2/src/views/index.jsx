import React from "react"
import {Switch, Route, withRouter} from "react-router-dom"
import App from "@/views/app"
import {ConfigProvider} from "antd"
import zh_CN from 'antd/es/locale-provider/zh_CN';

class Index extends React.Component {
  constructor(props){
    super(props)
    window._navigation = props.history
  }
  render (){
    return (
      <ConfigProvider locale={zh_CN}>
        <App/>
      </ConfigProvider>
    )
  }
}

export default withRouter(Index)