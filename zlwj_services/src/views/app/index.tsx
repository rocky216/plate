import * as React from "react";
import {Layout, Menu, } from "antd"
import Routers from "../../routers"
import SideBar from "@/components/SideBar"
import AppHeader from "@/components/AppHeader"

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      
    }
  }

  
  

  render(){
    return  (
      <Layout>
        <Sider style={{height: "100vh"}}>
          <SideBar/>
        </Sider>
        <Layout>
          <AppHeader/>
          <Content style={{margin: 10}}>
            <Routers/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App