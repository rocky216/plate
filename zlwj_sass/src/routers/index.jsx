import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import PropertyFee from "@/views/workcenter/propertyfee"
import AddPropertyFee from "@/views/workcenter/propertyfee/add"
import TreeMenu from "@/views/system/treemenu"
import BaseDepartment from "@/views/base/department"
import Station from "@/views/base/station"
import ProjectItem from "@/views/project/item"
import RoleList from "@/views/base/role"
import EditRole from "@/views/base/role/edit"
import ProData from "@/views/project/prodata"
import Unit from "@/views/project/prodata/unit"
import StaffList from "@/views/base/staff"
import EditStaff from "@/views/base/staff/edit"
import Owner from "@/views/project/owner"
import AddOwner from "@/views/project/owner/add"
import EditOwner from "@/views/project/owner/edit"
import Shop from "@/views/project/shop"
import UserPerson from "@/views/user/person"
import FinanceAccount from "@/views/finance/account"
import AccountLog from "@/views/finance/account/log"
import Discussion from "@/views/other/discussion"
import DiscussionThemeOpt from "@/views/other/discussion/voteopt"
import AddDiscussion from "@/views/other/discussion/add"
import EditDiscussion from "@/views/other/discussion/edit"
import BaseLibrary from "@/views/base/library"
import SystemLibrary from "@/views/system/library"
import Propertytem from "@/views/finance/propertytem"
import AddPropertytem from "@/views/finance/propertytem/add"
import EditPropertytem from "@/views/finance/propertytem/edit"
import Notice from "@/views/other/notice"
import AddNotice from "@/views/other/notice/add"
import EditNotice from "@/views/other/notice/edit"
import Govern from "@/views/other/govern"
import AddGovern from "@/views/other/govern/add"
import EditGovern from "@/views/other/govern/edit"
import Company from "@/views/system/company"
import CompanyHe from "@/views/system/company/he"




class Routers extends React.Component{
  render(){
    
    return (
      <Switch>

        <AuthRoute exact path="/" Component={Home} name="首页" />

        <AuthRoute exact path="/workcenter/propertyfee" Component={PropertyFee} name="物业费订单" /> 
        <AuthRoute  path="/workcenter/propertyfee/:type/add/:id" Component={AddPropertyFee} name="新增物业费订单" />

        <AuthRoute  path="/system/treemenu" Component={TreeMenu} name="权限菜单" />
        <AuthRoute  path="/system/library" Component={SystemLibrary} name="系统数据字典" />
        <AuthRoute exact path="/system/company" Component={Company} name="公司列表" /> 
        <AuthRoute  path="/system/company/:id/he" Component={CompanyHe} name="公司小区" />
        
        <AuthRoute  path="/base/department" Component={BaseDepartment} name="部门信息列表" />
        <AuthRoute  path="/base/station" Component={Station} name="岗位管理" />
        <AuthRoute exact path="/base/role" Component={RoleList} name="角色管理" />
        <AuthRoute  path="/base/role/:id/edit" Component={EditRole} name="编辑/权限角色" />
        <AuthRoute exact path="/base/staff" Component={StaffList} name="员工管理" />
        <AuthRoute path="/base/staff/:id/edit" Component={EditStaff} name="员工编辑" />
        <AuthRoute path="/base/library" Component={BaseLibrary} name="基础数据字典" />

        <AuthRoute  path="/project/item" Component={ProjectItem} name="项目管理" />
        <AuthRoute exact  path="/project/prodata" Component={ProData} name="项目信息管理" />
        <AuthRoute  path="/project/prodata/:heId/util/:id" Component={Unit} name="单元" />
        <AuthRoute exact path="/project/owner" Component={Owner} name="业主管理" />
        <AuthRoute  path="/project/owner/add" Component={AddOwner} name="新增业主" />
        <AuthRoute  path="/project/owner/:id/edit" Component={EditOwner} name="编辑业主" />
        <AuthRoute  path="/project/shop" Component={Shop} name="商铺信息管理" />

        <AuthRoute  path="/user/person" Component={UserPerson} name="用户资料" />

        <AuthRoute exact path="/finance/account" Component={FinanceAccount} name="资金账户" />
        <AuthRoute  path="/finance/account/:id/log" Component={AccountLog} name="资金账户日志" />
        <AuthRoute exact path="/finance/propertytem" Component={Propertytem} name="物业费收费模板" /> 
        <AuthRoute  path="/finance/propertytem/add" Component={AddPropertytem} name="新增物业费收费模板" />
        <AuthRoute  path="/finance/propertytem/:id/edit" Component={EditPropertytem} name="编辑物业费收费模板" />

        <AuthRoute exact path="/other/discussion" Component={Discussion} name="议事主题" />
        <AuthRoute  path="/other/discussion/add" Component={AddDiscussion} name="新增议事主题" />
        <AuthRoute  path="/other/discussion/:id/edit" Component={EditDiscussion} name="编辑议事主题" />
        <AuthRoute  path="/other/discussion/:id/voteopt" Component={DiscussionThemeOpt} name="议事主题投票选项" /> 
        <AuthRoute exact path="/other/notice" Component={Notice} name="公告" />  
        <AuthRoute  path="/other/notice/add" Component={AddNotice} name="新增公告" />
        <AuthRoute  path="/other/notice/:id/edit" Component={EditNotice} name="编辑公告" />
        <AuthRoute exact path="/other/govern" Component={Govern} name="政务公开" /> 
        <AuthRoute  path="/other/govern/add" Component={AddGovern} name="新增政务" />
        <AuthRoute  path="/other/govern/:id/edit" Component={EditGovern} name="编辑政务" />
         
      </Switch>
      
    )
  }
}

export default Routers
