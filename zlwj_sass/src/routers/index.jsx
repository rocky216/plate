import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import PropertyFee from "@/views/workcenter/propertyfee"
import TreeMenu from "@/views/system/treemenu"
import BaseDepartment from "@/views/base/department"
import Station from "@/views/base/station"
import ProjectItem from "@/views/project/item"
import RoleList from "@/views/base/role"
import EditRole from "@/views/base/role/edit"
import ProData from "@/views/project/prodata"
import Unit from "@/views/project/prodata/unit"
import AddUnit from "@/views/project/prodata/unit/add"

class Routers extends React.Component{
  

  render(){
    return (
      <Switch>
        <AuthRoute exact path="/" Component={Home} name="首页" />
        <AuthRoute  path="/workcenter/propertyfee" Component={PropertyFee} name="物业费订单" />
        <AuthRoute  path="/system/treemenu" Component={TreeMenu} name="权限菜单" />
        
        <AuthRoute  path="/base/department" Component={BaseDepartment} name="部门信息列表" />
        <AuthRoute  path="/base/station" Component={Station} name="岗位管理" />
        <AuthRoute exact path="/base/role" Component={RoleList} name="角色管理" />
        <AuthRoute  path="/base/role/:id/edit" Component={EditRole} name="编辑/权限角色" />

        <AuthRoute  path="/project/item" Component={ProjectItem} name="项目管理" />
        <AuthRoute exact  path="/project/prodata" Component={ProData} name="项目信息管理" />
        <AuthRoute  path="/project/prodata/:heId/util/:id" Component={Unit} name="单元" />
        <AuthRoute  path="/project/prodata/util/add" Component={AddUnit} name="新增单元" />
      </Switch>
      
    )
  }
}

export default Routers
