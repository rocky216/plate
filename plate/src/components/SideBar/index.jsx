import React from "react"
import {
  Layout,
  Menu,
  Icon
} from "antd"
import {Link} from "react-router-dom"
import menus from "./menus"

const {Sider } = Layout
const {SubMenu } = Menu

class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      menus
    }
  }

  render(){
    const {menus } = this.state
    return (
      <Sider trigger={null} collapsible >
        <div className="logo" style={{height: 80}} />
        <Menu theme="dark" mode="inline" >
          {menus.map(item=>(
            item.children && item.children.length?
            <SubMenu 
              key={item.key} 
              title={<span>
                      <i className={item.icon} style={{fontSize: 18, marginRight:10}} />
                      {item.title}
                    </span>}>
              {item.children.map(elem=>( 
                <Menu.Item key={elem.key}>
                  <Link to={elem.link}>
                    <span>{elem.title}</span>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>:
            <Menu.Item key={item.key}>
              <Link to={item.link}>
                <i className={item.icon} style={{fontSize: 18, marginRight:10}} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    )
  }
}

export default SideBar