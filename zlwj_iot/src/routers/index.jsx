import React from 'react';
import {
  Switch,
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import Device from "@/views/company/device"
import CompanyDevice from "@/views/company"
import DictDevice from "@/views/dict/device"


class Routers extends React.Component{
  

  render(){
    return (
      <Switch>
        <AuthRoute exact path="/" Component={Home} name="首页" />
        <AuthRoute exact path="/company" Component={CompanyDevice} name="公司设备" />
        <AuthRoute path="/company/:id/device" Component={Device} name="公司设备管理" />
        <AuthRoute path="/dict/device" Component={DictDevice} name="设备字典管理" />
      </Switch>
      
    )
  }
}

export default Routers
