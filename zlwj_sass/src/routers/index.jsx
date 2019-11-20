import React from 'react';
import {
  Switch,
} from "react-router-dom"
import AuthRoute from "@/routers/AuthRoute"
import Home from "@/views/home"
import PropertyFee from "@/views/workcenter/propertyfee"
import TreeMenu from "@/views/system/treemenu"


class Routers extends React.Component{
  

  render(){
    return (
      <Switch>
        <AuthRoute exact path="/" Component={Home} name="首页" />
        <AuthRoute  path="/workcenter/propertyfee" Component={PropertyFee} name="物业费订单" />
        <AuthRoute  path="/system/treemenu" Component={TreeMenu} name="权限菜单" />
      </Switch>
      
    )
  }
}

export default Routers
