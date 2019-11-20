import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button} from "antd";
import {setCookie, getCookie, removeCookie} from "@/utils"


class Home extends React.Component {

  handlenAdd(){
    setCookie("token","12")
  }

  handlenGet(){
    let token = getCookie("token")
    console.log(token)
  }


  render(){
    return (
      <div>Home <i className="icon iconfont icon-wode"></i>
        <Button onClick={this.handlenAdd.bind(this)}>add</Button>
        <Button onClick={this.handlenGet.bind(this)}>get</Button>
        <Button >remove</Button>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Home)