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
import EditProcess from "@/views/system/process/edit"
import Organ from "@/views/system/organ"
import Staff from "@/views/person/staff"
import AddStaff from "@/views/person/staff/add"
import EditStaff from "@/views/person/staff/edit"
import StaffQuit from "@/views/person/staffquit"
import Schedu from "@/views/person/schedu"
import AddSchedu from "@/views/person/schedu/add"
import Posts from "@/views/person/posts"

import QuitAppro from "@/views/person/staffquit/appro"
import Absence from "@/views/person/absence"
import AddAbsence from "@/views/person/absence/add"


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
        <AuthRoute exact  path="/system/process" Component={Process} name="流程设置" />
        <AuthRoute exact path="/system/process/add" Component={AddProcess} name="新建流程设置" />
        <AuthRoute exact path="/system/process/:id/edit" Component={EditProcess} name="编辑流程设置" />
        <AuthRoute path="/system/organ" Component={Organ} name="组织机构" />

        <AuthRoute exact path="/person/staff" Component={Staff} name="员工管理" />
        <AuthRoute path="/person/staff/add" Component={AddStaff} name="新增员工" />
        <AuthRoute path="/person/staff/:id/edit" Component={EditStaff} name="编辑员工" />

        <AuthRoute exact path="/person/staffquit" Component={StaffQuit} name="离职员工" />
        <AuthRoute path="/person/staffquit/:id/appro" Component={QuitAppro} name="离职审批" />

        <AuthRoute  path="/person/posts" Component={Posts} name="人员调岗管理" />

        <AuthRoute exact path="/person/schedu" Component={Schedu} name="排产管理" />
        <AuthRoute  path="/person/schedu/add" Component={AddSchedu} name="排产管理" />

        <AuthRoute exact path="/person/absence" Component={Absence} name="缺勤管理" />
        <AuthRoute exact path="/person/absence/add" Component={AddAbsence} name="新增缺勤" />

      </Switch>
      
    )
  }
}

export default Routers
