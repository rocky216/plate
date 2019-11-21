import React from 'react';
import {
  Switch,
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import PropertyFee from "@/views/workcenter/propertyfee"
import TreeMenu from "@/views/system/treemenu"
import BaseDepartment from "@/views/base/department"
import Station from "@/views/base/station"
import ProjectItem from "@/views/project/item"


class Routers extends React.Component{
  

  render(){
    return (
      <Switch>
        <AuthRoute exact path="/" Component={Home} name="首页" />
        <AuthRoute  path="/workcenter/propertyfee" Component={PropertyFee} name="物业费订单" />
        <AuthRoute  path="/system/treemenu" Component={TreeMenu} name="权限菜单" />
        <AuthRoute  path="/base/department" Component={BaseDepartment} name="部门信息列表" />
        <AuthRoute  path="/base/station" Component={Station} name="岗位管理" />
        <AuthRoute  path="/project/item" Component={ProjectItem} name="项目管理" />
      </Switch>
      
    )
  }
}

export default Routers
