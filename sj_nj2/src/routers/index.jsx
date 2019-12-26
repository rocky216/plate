import React from 'react';
import {
  Switch,
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import SystemAuth from "@/views/system/auth"
import AddSystemAuth from "@/views/system/auth/add"
import EditSystemAuth from "@/views/system/auth/edit"
import Diction from "@/views/system/diction"
import TypeKey from "@/views/system/diction/typekey"
import Process from "@/views/system/process"
import AddProcess from "@/views/system/process/add"


class Routers extends React.Component{
  

  render(){
    return (
      <Switch>
        <AuthRoute exact path="/" Component={Home} name="工作台" />

        <AuthRoute exact path="/system/auth" Component={SystemAuth} name="权限管理" />
        <AuthRoute path="/system/auth/add" Component={AddSystemAuth} name="新增角色" />
        <AuthRoute path="/system/auth/:id/edit" Component={EditSystemAuth} name="编辑角色" />
        <AuthRoute exact path="/system/diction" Component={Diction} name="数据字典" />
        <AuthRoute path="/system/diction/:id/typekey" Component={TypeKey} name="数据列表" />
        <AuthRoute exact exact path="/system/process" Component={Process} name="流程设置" />
        <AuthRoute exact path="/system/process/add" Component={AddProcess} name="新建流程设置" />

      </Switch>
      
    )
  }
}

export default Routers
