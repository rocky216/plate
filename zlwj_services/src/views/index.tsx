import React from "react"
import {connect } from "react-redux"
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

const mapStateToProps = (state: { prop: any }, ownProps: any) => {
  console.log(state)
  return {
    prop: state.prop
  }
}

export default withRouter(  connect(mapStateToProps)(Index)  );