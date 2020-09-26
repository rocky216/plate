import React from "react"
import {Switch, Route} from "react-router-dom"
import AuthRoute from "./AuthRoute"
import DailyPatrol from "@/views/daily/patrol"

class DailyRouter extends React.Component {
  render(){
    return (
      <>
        <AuthRoute  path="/daily/patrol" Component={DailyPatrol} name="巡更管理" auth="3-01" />
      </>
    )
  }
}


export default DailyRouter