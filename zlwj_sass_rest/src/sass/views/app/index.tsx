import React from 'react';
import Routers from "@sass/routers"
import { Layout, } from 'antd';
import "./index.less"
import SideBar from "@sass/components/SideBar"

const {Header, Sider, Content} = Layout

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sider>
        <SideBar/> 
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background"></Header>
          <Content className="content">
          <Routers/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default App;