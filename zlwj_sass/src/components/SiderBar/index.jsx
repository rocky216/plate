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

  check(arr, item){
    
    let index = _.findIndex(arr, o=>{
      return o.key.replace(/-/g,'')==item.key
    })
    return index>-1?true:false
  }

  render(){
    const {collapsed, baseInfo} = this.props
    const {menus} = this.state
    
    return (
      <Sider
      className="sidebar"
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
        {baseInfo && baseInfo.userMenuList.length?<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {menus.map(item=>
            item.children && item.children.length?
            this.check(baseInfo.userMenuList, item)?
            <SubMenu
              key={item.key}
              title={
                <span>
                  <i className={item.icon} ></i>
                  <span className="nav-text" >{item.title}</span>
                </span>
              }
            >
            {item.children.map(elem=> this.check(baseInfo.userMenuList, elem)? <Menu.Item key={elem.key}>
              <Link to={elem.link}>{elem.title}</Link>
            </Menu.Item>:null)}
            </SubMenu>:null
            : this.check(baseInfo.userMenuList, item)?<Menu.Item key={item.key}>
              <Link to={item.link}>
                <i className={item.icon} ></i>
                <span className="nav-text">{item.title}</span>
              </Link>
            </Menu.Item>:null
          )}
        </Menu>:null}
        
      </Sider>
    )
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    collapsed: state.app.collapsed
  }
}

export default connect(mapStateProps)(SideBar)