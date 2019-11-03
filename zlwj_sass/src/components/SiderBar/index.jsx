import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import "./index.less"
import  menus from "./menus"

const { SubMenu } = Menu;


class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      menus
    }
  }

  render(){
    const {collapsed} = this.props
    const {menus} = this.state

    return (
      <Sider
      trigger={null}
        collapsible 
        collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        
      >
        {/* <div className="logo" >
          <img src={require("@/assets/images/logo.png")}  />
        </div> */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {menus.map(item=>
            item.children && item.children.length?
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type="notification" />
                  <span>{item.title}</span>
                </span>
              }
            >
            {item.children.map(elem=><Menu.Item key={elem.key}>
              <Link to={elem.link}>{elem.title}</Link>
            </Menu.Item>)}
            </SubMenu>
            :<Menu.Item key={item.key}>
              <Link to={item.link}>
                <Icon type="user" />
                <span className="nav-text">{item.title}</span>
              </Link>
             
            </Menu.Item>
          )}
          
        </Menu>
      </Sider>
    )
  }
}

function mapStateProps(state){
  return {
    collapsed: state.app.collapsed
  }
}

export default connect(mapStateProps)(SideBar)