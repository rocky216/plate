import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import SiderBar from "@/components/SiderBar"
import Head from "@/components/Head"
import Routers from "@/routers"
import {loadIndexBaseInfo} from "@/actions/appAction"


class App extends React.Component {

  componentDidMount(){
    this.props.actions.loadIndexBaseInfo({})
  }

  render (){
    const {collapsed} = this.props
    return (
    <Layout style={{minHeight: "100vh"}}>
      <Head/>
      <Layout >
        <SiderBar/>
        <Content style={{ margin: '10px 10px 0',minWidth: 1000}}>
          <div style={{ }}>
            <Routers/>
          </div>
        </Content>
      </Layout>
    </Layout>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadIndexBaseInfo}, dispatch)
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    collapsed: state.app.collapsed
  }
}

export default connect(mapStateProps, mapDispatchProps)(App)