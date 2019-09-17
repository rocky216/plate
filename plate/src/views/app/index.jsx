import 'antd/dist/antd.css';
import React from "react"
import {connect } from "react-redux"
import { Layout, } from 'antd';
import SideBar from "@/components/SideBar"
import Head from "@/components/Head"
import {Switch, Route} from "react-router-dom"
import Routers from "@/routers"


const { Header, Content } = Layout;

class App extends React.Component {
  render(){
    return (
      <div>
        <Layout>
          <SideBar/>
          <Layout style={{minHeight: '100vh',}}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Head/>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
              }}
            >
              <Routers/>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

function mapStateProps(state){
  console.log(state)
  return {

  }
}

export default connect(mapStateProps)(App)