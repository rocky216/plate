import * as React from "react"
import {Route, Redirect, Switch} from "react-router-dom"
import HomePage from "@/views/home"
import PowerRouter from "./powerRouter"


class Routers extends React.Component {
  
  

  render(){
    return (
      <Switch>
        <Route exact  path="/" render={()=>{
          return <Redirect to={(window as any).mytype} />
        }} /> 
        <PowerRouter/>
      </Switch>
    )
  }
}

export default Routers