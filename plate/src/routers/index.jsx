import React from "react"
import {Switch, Route} from "react-router-dom"
import Home from "@/views/home"
import Lease from "@/views/park/lease"
import Plate from "@/views/park/plate"

class Routers extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/park/lease" component={Lease} />
        <Route path="/park/plate" component={Plate} />
      </Switch>
    )
  }
}

export default Routers

