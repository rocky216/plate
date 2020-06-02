import * as React from "react";
import {Layout, Menu, } from "antd"
import Routers from "../../routers"
import SideBar from "@/components/SideBar"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    
    
  }
  

  render(){
    return  (
      <Layout>
        <Sider style={{height: "100vh"}}>
          <SideBar/>
        </Sider>
        <Layout>
          <Header style={{background: "#fff"}}>

          </Header>
          <Content style={{margin: 10}}>
            <Routers/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App