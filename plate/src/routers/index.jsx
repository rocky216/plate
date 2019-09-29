import React from "react"
import {Switch, Route} from "react-router-dom"
import Home from "@/views/home"
import Lease from "@/views/park/lease"
import Plate from "@/views/park/plate"
import ProjectList from "@/views/project/projectList"
import AccountList from "@/views/project/account"
import RoleList from "@/views/project/role"
import AuthList from "@/views/project/auth"
import ParkRule from "@/views/park/rule"
import PlateConfig from "@/views/park/plateconfig"




class Routers extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/park/lease" component={Lease} />
        <Route path="/park/rule" component={ParkRule} />
        <Route path="/park/plate" component={Plate} />
        <Route path="/park/plateconfig" component={PlateConfig} />
        <Route path="/project/list" component={ProjectList} />
        <Route path="/project/account" component={AccountList} />
        <Route path="/project/role" component={RoleList} />
        <Route path="/project/auth/:id" component={AuthList} />
      </Switch>
    )
  }
}

export default Routers

