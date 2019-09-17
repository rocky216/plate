import React from "react"
import {Switch, Route} from "react-router-dom"
import App from "@/views/app"
import Login from "@/views/auth/login"
import "./index.less"


class Index extends React.Component {
  render(){
    return (
      <Switch>
        <App/>
        {/* <Login/> */}
        {/* <Route exact path="/login" render={(props)=>{
          return <Login/>
        }} /> */}
      </Switch>
    )
  }
}


export default Index