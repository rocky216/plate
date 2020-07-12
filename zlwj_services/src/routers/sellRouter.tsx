import React from "react"
import {Switch, Route} from "react-router-dom"
import SellPage from "@/views/sell"
import SellCompany from "@/views/sell/company"
import SellMenu from "@/views/sell/menu"
import SellUser from "@/views/sell/user"
import SellRole from "@/views/sell/role"
import SellRoleAuth from "@/views/sell/role/auth"



class SellRouter extends React.Component {
  render() {
    
    return (
      <>
        <Route exact path="/sell"  component={SellPage} />
        <Route path="/sell/company"  component={SellCompany} />
        <Route path="/sell/menu" component={SellMenu} />
        <Route path="/sell/user" component={SellUser} />
        <Route exact path="/sell/role" component={SellRole} />
        <Route  path="/sell/role/:id/auth" component={SellRoleAuth} />
      </>
    );
  }
}

export default SellRouter;