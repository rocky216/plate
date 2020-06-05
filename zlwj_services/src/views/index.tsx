import React from "react"
import {Switch, Route, withRouter} from "react-router-dom"
import  App from "@/views/app"
import LoginPage from "@/views/auth/login"
import {IProps } from "@/interface/app"

class Index extends React.Component<IProps> {
  constructor(props:IProps){
    super(props);
    (window as any)._navigation = props.history;
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={App} />
      </Switch>
    )
  }
}

export default withRouter( (Index as any) );