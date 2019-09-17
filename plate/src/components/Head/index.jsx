import React from "react"
import {
  Dropdown,
  Icon,
  Menu,
  Row,
  Col
} from "antd"

class Head extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  handleMenuClick(){
    console.log(arguments)
  }
  render(){
    const menu = (
      <Menu 
        onClick={this.handleMenuClick.bind(this)}
        theme="dark">
        <Menu.Item key="1">
          <Icon type="home" />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="home" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="home" />
          3rd item
        </Menu.Item>
      </Menu>
    );

    return (
      <div style={{display: "flex", justifyContent: "flex-end", paddingRight:24}}>
        <div style={{display: "flex", marginRight: 30}}>
          <Dropdown.Button trigger={["click"]} overlay={menu} icon={<Icon type="home" />}>选择房屋</Dropdown.Button>
        </div>
        <div>
          <Icon type="logout" style={{fontSize: 20}} />
          <span>退出</span>
        </div>
      </div>
    )
  }
}


export default Head

