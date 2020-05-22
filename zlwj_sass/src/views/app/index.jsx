import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import SiderBar from "@/components/SiderBar"
import Head from "@/components/Head"
import Routers from "@/routers"
import {getBaseInfo} from "@/actions/appAction"
import KeepTab from "@/components/KeepTab"
// import BreadCrumb from "@/components/BreadCrumb"



class App extends React.Component {
  
  render (){
    const {collapsed} = this.props
    
    return (
    <Layout>
      <SiderBar/>
      <Layout style={{ marginLeft: collapsed?80:200 }}>
        <Head/>
        {/* <KeepTab/> */}
        {/* <BreadCrumb/> */}
        <Content style={{ margin: '10px 10px 0', overflow: 'initial', minHeight:810 }}>
          <div >
            <Routers/>
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>智联物业管理系统 @2019 由高超网络荣誉出品</Footer>
      </Layout>
    </Layout>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBaseInfo}, dispatch)
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    collapsed: state.app.collapsed
  }
}

export default connect(mapStateProps, mapDispatchProps)(App)