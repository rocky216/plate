import { Menu } from "antd"
import React from "react"
import {UserOutlined} from "@ant-design/icons"

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 112
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            nav 
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SideBar;