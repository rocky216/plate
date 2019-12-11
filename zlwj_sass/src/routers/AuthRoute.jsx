import React from 'react';
import {connect, } from "react-redux"
import {bindActionCreators} from "redux"
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom"
import {AddTab} from "@/actions/appAction"


class AuthRoute extends React.Component{
  componentDidMount(){
    this.props.actions.AddTab(this.props)
    
  }
  componentWillReceiveProps(nextProps){
    this.props.actions.AddTab(nextProps)
  }

  
  render(){
    const {Component, path, exact, name} = this.props
    return (
      <Route path={path} exact={exact?exact:false} component={Component}></Route>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({AddTab}, dispatch)
  }
}

function mapStateProps(){
  return {

  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(AuthRoute) )
