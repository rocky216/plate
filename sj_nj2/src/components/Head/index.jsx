import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withRouter} from "react-router-dom"
import {Layout, Icon, Button, Dropdown, Menu, Modal} from "antd"
import {goLoginOut } from "@/actions/appAction"
import "./style.less"

const {Header} = Layout
const { confirm } = Modal;

class Head extends React.Component {

  handlenToggle(collapsed){
    collapsed?this.props.actions.setCollapsedFalse():this.props.actions.setCollapsedTrue()
  }
  handleMenuClick({key}){
    console.log(key)
  }

  loginOut(){
    let _this = this
    confirm({
      title: '是否退出?',
      content: '退出后需重新登录',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _this.props.actions.goLoginOut({}, res=>{
          _this.props.history.push("/login")
        })
        
      }
    });
  }

  render(){
    const {collapsed} = this.props


    return (
      <Header style={{ background: '#1e9eff', padding: 0}} >
        <div className="header">
          <div className="left">
            <div className="logo">
              <img src={require("@/assets/images/system-logo.png")} style={{width: "50%"}} />
            </div>
            <div className="mgl10">
              <img src={require("@/assets/images/system-name.png")} />
            </div>
          </div>
          
          
          <div className="right">
            <ul className="rightUl">
              <li onClick={this.loginOut.bind(this)}>
                <i className="icon iconfont icon-tuichudenglu"></i>
              </li>
            </ul>
          </div>
        </div>
      </Header>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({goLoginOut }, dispatch)
  }
}

function mapStateProps(state){
  return {
    collapsed: state.app.collapsed
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Head) )