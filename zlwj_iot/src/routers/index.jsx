import React from 'react';
import {
  Switch,
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import Device from "@/views/company/device"
import CompanyDevice from "@/views/company"
import DictDevice from "@/views/dict/device"
import SwitchPage from "@/views/dict/switch"
import Align from "@/views/dict/align"
import ApiList from "@/views/dict/api"
import DeviceAll from "@/views/device/all"
import ArgumentsDict from "@/views/dict/arguments"
import CompanyCallbackUrl from "@/views/company/callbackurl"


class Routers extends React.Component{
  

  render(){
    return (
      <Switch>
        <AuthRoute exact path="/" Component={Home} name="首页" />
        <AuthRoute exact path="/company" Component={CompanyDevice} name="公司设备" />
        <AuthRoute path="/company/:id/device" Component={Device} name="公司设备管理" />
        <AuthRoute path="/company/:id/callbackurl" Component={CompanyCallbackUrl} name="参数URL" />
        <AuthRoute path="/dict/device" Component={DictDevice} name="设备字典管理" />
        <AuthRoute path="/config/switch" Component={SwitchPage} name="交换机" />
        <AuthRoute path="/config/align" Component={Align} name="对列" />
        <AuthRoute path="/config/api" Component={ApiList} name="接口管理" />
        <AuthRoute path="/config/arguments" Component={ArgumentsDict} name="参数回调" />
        
        <AuthRoute path="/device/all" Component={DeviceAll} name="设备管理" />
      </Switch>
      
    )
  }
}

export default Routers
