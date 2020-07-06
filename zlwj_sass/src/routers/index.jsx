import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import PropertyFee from "@/views/workcenter/propertyfee"
import ShopFee from "@/views/workcenter/shopfee"
import Expend from "@/views/workcenter/expend"
import CarList from "@/views/workcenter/car"
import AddCar from "@/views/workcenter/car/add"
import EditCar from "@/views/workcenter/car/edit"

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
// import Shop from "@/views/project/shop"
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
import Activity from "@/views/finance/activity"
import Notice from "@/views/other/notice"
import AddNotice from "@/views/other/notice/add"
import EditNotice from "@/views/other/notice/edit"
import Govern from "@/views/other/govern"
import AddGovern from "@/views/other/govern/add"
import EditGovern from "@/views/other/govern/edit"
import Company from "@/views/system/company"
import CompanyHe from "@/views/system/company/he"
import Message from "@/views/system/message"
import SendMessage from "@/views/other/message"
import PropertyFeeDetail from "@/views/workcenter/propertyfee/detail"
import OtherFeeDetail from "@/views/workcenter/otherfee/detail"
import ManageOperative from "@/views/manage/operative"
import Otherfee from "@/views/workcenter/otherfee"
import AddOtherfee from "@/views/workcenter/otherfee/add" 
// import AddOtherExpend from "@/views/workcenter/expend/add" 
import OtherExpendDetail from "@/views/workcenter/expend/detail" 
import AllOrder from "@/views/manage/allorder"
import AllOrderDetail from "@/views/manage/allorder/detail"
import ShopFeeDetail from "@/views/workcenter/shopfee/detail"
import Error from "@/views/auth/error"
import OtherOrder from "@/views/manage/otherorder"
import OtherOrderDetail from "@/views/manage/otherorder/detail"
import AllExpend from "@/views/manage/allexpend"
import AllExpendDetail from "@/views/manage/allexpend/detail"
import Merchant from "@/views/system/merchant"
import RecordSystem from "@/views/system/record"
import ParkList from "@/views/project/park"
import AddPark from "@/views/project/park/add"
import EditPark from "@/views/project/park/edit"
import HeConfig from "@/views/system/company/config"
import ParkLot from "@/views/project/park/parklot"
import DeviceManage from "@/views/system/device"
import Solution from "@/views/workcenter/solution"
import SolutionLog from "@/views/workcenter/solution/log"
import Record from "@/views/workcenter/record"
import ControlDevicePass from "@/views/system/device/control/editpass"
import Resources from "@/views/system/resources"
import EditResources from "@/views/system/resources/edit"
import ItemContact from "@/views/project/item/contact"
import RepairManage from "@/views/workcenter/repair"
import ApkSystem from "@/views/system/apk"
import ProjectNothouse from "@/views/project/nothouse"
import BaseCompany from "@/views/base/company"




class Routers extends React.Component{
  render(){
    
    return (
      <Switch>

        <AuthRoute exact path="/" Component={Home} name="首页" auth="1" />
        <Route path="/error" component={Error}/>

        <AuthRoute exact path="/workcenter/propertyfee" Component={PropertyFee} name="物业费订单" auth="2-01" /> 
        <AuthRoute exact path="/workcenter/propertyfee/:id/detail/:type" Component={PropertyFeeDetail} name="查看物业费订单"  /> 
        <AuthRoute exact path="/workcenter/shopfee" Component={ShopFee} name="商铺缴费订单" auth="2-02" /> 
        <AuthRoute  path="/workcenter/shopfee/:id/detail/:type" Component={ShopFeeDetail} name="查看商铺订单" /> 
        <AuthRoute exact path="/workcenter/otherfee" Component={Otherfee} name="其他缴费订单" auth="2-03" /> 
        <AuthRoute path="/workcenter/otherfee/:orderType/:linkId/add" Component={AddOtherfee} name="新增其他缴费订单" />   
        <AuthRoute path="/workcenter/otherfee/:id/detail/:type" Component={OtherFeeDetail} name="查看其他缴费订单" />
        <AuthRoute exact path="/workcenter/expend" Component={Expend} name="其他支付订单" auth="2-04" />
        {/* <AuthRoute path="/workcenter/expend/add" Component={AddOtherExpend} name="新增其他支出订单" />  */}
        <AuthRoute path="/workcenter/expend/:id/detail" Component={OtherExpendDetail} name="查看其他支出订单" /> 
        <AuthRoute exact path="/workcenter/car" Component={CarList} name="车辆管理" auth="2-05" /> 
        <AuthRoute path="/workcenter/car/add" Component={AddCar} name="新增车辆"  /> 
        <AuthRoute path="/workcenter/car/:id/edit" Component={EditCar} name="编辑车辆"  /> 
        <AuthRoute exact path="/workcenter/solution" Component={Solution} name="一卡通管理" auth="2-06"  /> 
        <AuthRoute path="/workcenter/solution/:id/log" Component={SolutionLog} name="一卡通日志"  /> 
        <AuthRoute path="/workcenter/record" Component={Record} name="日志管理" auth="2-07"  /> 
        <AuthRoute path="/workcenter/repair" Component={RepairManage} name="报修管理" auth="2-08"  /> 

        <AuthRoute  path="/system/treemenu" Component={TreeMenu} name="权限菜单" auth="9-01" />
        <AuthRoute  path="/system/library" Component={SystemLibrary} name="系统数据字典" auth="9-02" />
        <AuthRoute exact path="/system/company" Component={Company} name="公司列表" auth="9-03" /> 
        <AuthRoute  path="/system/company/:id/he" Component={CompanyHe} name="公司小区"  />
        <AuthRoute  path="/system/message" Component={Message} name="短信平台" auth="9-04" />
        <AuthRoute  path="/system/merchant" Component={Merchant} name="商户号管理" auth="9-05" />
        <AuthRoute  path="/system/company/:id/config" Component={HeConfig} name="小区设备配置" />
        <AuthRoute path="/system/device" Component={DeviceManage} auth="9-06" name="设备管理" />
        <AuthRoute path="/system/record" Component={RecordSystem} auth="9-07" name="日志管理" />
        <AuthRoute exact path="/system/pass/:id/pass" Component={ControlDevicePass} name="通道设置" />
        <AuthRoute exact path="/system/resources" Component={Resources} auth="9-08" name="资源管理" />
        <AuthRoute path="/system/resources/:id/edit" Component={EditResources} name="编辑资源" />
        <AuthRoute exact path="/system/apk" Component={ApkSystem} auth="9-09" name="apk管理" />
        
        
        <AuthRoute  path="/base/department" Component={BaseDepartment} name="部门信息列表" auth="8-01" />
        <AuthRoute  path="/base/station" Component={Station} name="岗位管理" auth="8-02" />
        <AuthRoute exact path="/base/role" Component={RoleList} name="角色管理" auth="8-03" />
        <AuthRoute  path="/base/role/:id/edit" Component={EditRole} name="编辑/权限角色" />
        <AuthRoute exact path="/base/staff" Component={StaffList} name="员工管理" auth="8-04" />
        <AuthRoute path="/base/staff/:id/edit" Component={EditStaff} name="员工编辑" />
        <AuthRoute path="/base/library" Component={BaseLibrary} name="基础数据字典" auth="8-05" />
        <AuthRoute path="/base/company" Component={BaseCompany} name="公司信息" auth="8-06" />
        

        <AuthRoute exact path="/project/item" Component={ProjectItem} name="项目管理" auth="7-01" />
        <AuthRoute  path="/project/item/:id/concact" Component={ItemContact} name="项目联系人" />
        <AuthRoute exact  path="/project/prodata" Component={ProData} name="项目信息管理" auth="7-02" />
        <AuthRoute  path="/project/prodata/:heId/util/:id" Component={Unit} name="单元" />
        <AuthRoute exact path="/project/owner" Component={Owner} name="业主管理" auth="7-03" />
        <AuthRoute  path="/project/owner/add" Component={AddOwner} name="新增业主" />
        <AuthRoute  path="/project/owner/:id/edit" Component={EditOwner} name="编辑业主" />
        {/* <AuthRoute  path="/project/shop" Component={Shop} name="商铺信息管理" auth="7-04" /> */}
        <AuthRoute  path="/project/nothouse" Component={ProjectNothouse} name="商铺信息管理" auth="7-04" />
        <AuthRoute exact path="/project/park" Component={ParkList} name="停车场管理" auth="7-05" />
        <AuthRoute path="/project/park/add" Component={AddPark} name="新增停车场" />
        <AuthRoute path="/project/park/:id/edit" Component={EditPark} name="编辑停车场" />
        <AuthRoute path="/project/park/:id/parklot" Component={ParkLot} name="停车场区域" />
        

        <AuthRoute  path="/user/person" Component={UserPerson} name="用户资料" />

        <AuthRoute exact path="/finance/account" Component={FinanceAccount} name="资金账户" auth="10-01" />
        <AuthRoute  path="/finance/account/:id/log" Component={AccountLog} name="资金账户日志" />
        <AuthRoute exact path="/finance/propertytem" Component={Propertytem} name="物业费收费模板" auth="10-02" /> 
        <AuthRoute  path="/finance/propertytem/add" Component={AddPropertytem} name="新增物业费收费模板" />
        <AuthRoute  path="/finance/propertytem/:id/edit" Component={EditPropertytem} name="编辑物业费收费模板" />
        <AuthRoute  path="/finance/activity" Component={Activity} auth="10-03" name="活动模板" />

        <AuthRoute exact path="/other/discussion" Component={Discussion} name="议事主题" auth="5-01" />
        <AuthRoute  path="/other/discussion/add" Component={AddDiscussion} name="新增议事主题" />
        <AuthRoute  path="/other/discussion/:id/edit" Component={EditDiscussion} name="编辑议事主题" />
        <AuthRoute  path="/other/discussion/:id/voteopt" Component={DiscussionThemeOpt} name="议事主题投票选项" /> 
        <AuthRoute exact path="/other/notice" Component={Notice} name="公告" auth="6-01" />  
        <AuthRoute  path="/other/notice/add" Component={AddNotice} name="新增公告" />
        <AuthRoute  path="/other/notice/:id/edit" Component={EditNotice} name="编辑公告" />
        <AuthRoute exact path="/other/govern" Component={Govern} name="政务公开" auth="6-02" /> 
        <AuthRoute  path="/other/govern/add" Component={AddGovern} name="新增政务" />
        <AuthRoute  path="/other/govern/:id/edit" Component={EditGovern} name="编辑政务" />
        <AuthRoute  path="/other/message" Component={SendMessage} name="短信发送" auth="11-01" /> 

        <AuthRoute  path="/manage/operative" Component={ManageOperative} name="合作商" auth="4-01" />
        <AuthRoute exact path="/manage/allorder" Component={AllOrder} name="全部物业费订单" auth="4-02" />
        <AuthRoute  path="/manage/allorder/:id/detail/:order/:type" Component={AllOrderDetail} name="查看物业费订单" />
        <AuthRoute exact path="/manage/otherorder" Component={OtherOrder} name="全部其他缴费订单" auth="4-03" /> 
        <AuthRoute exact path="/manage/otherorder/:id/detail/:type" Component={OtherOrderDetail} name="查看其他缴费订单" auth="4-03" />
        <AuthRoute exact path="/manage/allexpend" Component={AllExpend} name="全部其他支出订单" auth="4-04" />
        <AuthRoute exact path="/manage/allexpend/:id/detail/:type" Component={AllExpendDetail} name="查看其他支出订单" auth="4-04" />
        
      </Switch>
      
    )
  }
}

export default Routers
