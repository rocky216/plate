import React from "react"
import {connect} from "react-redux"
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import SiderBar from "@/components/SiderBar"
import Head from "@/components/Head"
import Routers from "@/routers"


class App extends React.Component {
  render (){
    const {collapsed} = this.props
    return (
    <Layout>
      <SiderBar/>
      <Layout style={{ marginLeft: collapsed?80:200 }}>
        <Head/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', minHeight:810 }}>
          <div style={{ padding: 24 }}>
            <Routers/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    )
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    collapsed: state.app.collapsed
  }
}

export default connect(mapStateProps)(App)