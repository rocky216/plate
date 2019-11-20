import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Switch, Route, withRouter} from "react-router-dom"
import App from "@/views/app"


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
    return <App/>
  }
}


function mapStateProps(state){
  console.log(state)
  return {
    utils: state.app.utils
  }
}

export default withRouter(connect(mapStateProps)(Index))