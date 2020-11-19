import React from "react"
import {Link} from "react-router-dom"
import {Layout} from "antd"
import SideBar from "@admin/components/SideBar"
import "./index.less"
import Routers from "@admin/routers"
import { connect } from "react-redux"

const { Header, Content, Footer, Sider } = Layout;


class App extends React.Component {
  render() {
    
    return (
      <div className="myApp">
        <Layout>
          <Sider>
            <div className="logo"  />
            <SideBar/>
          </Sider>
          <Layout className="content">
            <Header/>
            <Content className="content_inner" >
              <Routers/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state:any) => {
  console.log(state)
  return {
    
  }
}

export default connect(mapStateToProps)(App)