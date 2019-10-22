import React from "react"
import {Switch, Route} from "react-router-dom"
import AuthRoute from "@/components/AuthRoute"
import Home from "@/views/home"
import Lease from "@/views/park/lease"
import Plate from "@/views/park/plate"
import ProjectList from "@/views/project/projectList"
import AccountList from "@/views/project/account"
import RoleList from "@/views/project/role"
import AuthList from "@/views/project/auth"
import ParkRule from "@/views/park/rule"
import PlateConfig from "@/views/park/plateconfig"
import ParkOrderList from "@/views/park/orderList"
import DeviceList from "@/views/park/device"
import ProjectDevice from "@/views/project/device"
import PassList from "@/views/park/pass"
import InternetList from "@/views/internet/internetList"
import InternetStatis from "@/views/internet/statis"




class Routers extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/park/lease" component={Lease} />
        <Route path="/park/rule" component={ParkRule} />
        <Route path="/park/plate" component={Plate} />
        <Route path="/park/plateconfig" component={PlateConfig} />
        <Route path="/park/orderlist" component={ParkOrderList} />
        <Route path="/park/device" component={DeviceList} />
        <Route path="/park/pass" component={PassList} />

        <AuthRoute path="/project/list" Component={ProjectList}  auth={301} />
        <AuthRoute path="/project/account" Component={AccountList} auth={302} />
        <AuthRoute path="/project/role" Component={RoleList} auth={303} />
        <AuthRoute path="/project/auth/:id" Component={AuthList} auth={304} />
        <Route path="/project/device" component={ProjectDevice} />

        <AuthRoute path="/internet/list" Component={InternetList} auth={401} />
        <AuthRoute path="/internet/statis" Component={InternetStatis} auth={401} />
      </Switch>
    )
  }
}

export default Routers

