import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Switch, Route, withRouter} from "react-router-dom"
import {ConfigProvider} from "antd"
import App from "@/views/app"
import zh_CN from 'antd/es/locale-provider/zh_CN';


class Index extends React.Component {
  constructor(props){
    super(props)
    window._navigation = props.history
    this.verfiToken()
  }

  async verfiToken(){
    let token = await this.props.utils.getCookie("token")
    if(!token || token.length<10){
      this.props.history.push("/")
    }
  }

  render (){
    return (
      <ConfigProvider locale={zh_CN}>
        <App/>
      </ConfigProvider>
    )
  }
}


function mapStateProps(state){
  
  return {
    utils: state.app.utils
  }
}

export default withRouter(connect(mapStateProps)(Index))