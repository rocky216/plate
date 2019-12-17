import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withRouter} from "react-router-dom"
import {Layout, Icon, Button, Dropdown, Menu, Modal} from "antd"
import {setCollapsedTrue, setCollapsedFalse} from "@/actions/appAction"
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
        _this.props.history.push("/login")
      }
    });
  }

  render(){
    const {collapsed} = this.props

    const menu = (
      <Menu theme="dark" onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1">
          <Icon type="project" />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="project" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="project" />
          3rd item
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handlenToggle.bind(this, collapsed)}
        />
        <div className="header_right">
          <Dropdown.Button overlay={menu} icon={<Icon type="project" />}>
            选择小区
          </Dropdown.Button>
          <Button type="link" onClick={this.loginOut.bind(this)} style={{margin: "15px 10px 0 0"}}>
            <Icon type="logout" />
            <span>退出</span>
          </Button>
        </div>
      </Header>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({setCollapsedTrue, setCollapsedFalse}, dispatch)
  }
}

function mapStateProps(state){
  return {
    collapsed: state.app.collapsed
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Head) )