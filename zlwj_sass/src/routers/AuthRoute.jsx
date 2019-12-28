import React from 'react';
import {connect, } from "react-redux"
import {bindActionCreators} from "redux"
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom"
import {AddTab} from "@/actions/appAction"
import Error from "@/views/auth/error"


class AuthRoute extends React.Component{
  componentDidMount(){
    this.props.actions.AddTab(this.props)
    
  }
  componentWillReceiveProps(nextProps){
    this.props.actions.AddTab(nextProps)
  }

  handlenRoute(){
    const {Component, path, exact, name, auth, baseInfo} = this.props
    if(baseInfo && auth && _.findIndex(baseInfo.userMenuList, o=>o.key==auth)==-1){
      return <Redirect to="/error" />
    }else {
      return <Route path={path} exact={exact?exact:false} component={Component}/>
    }
  }

  
  render(){
    const {Component, path, exact, name, auth, baseInfo} = this.props
    return this.handlenRoute()
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({AddTab}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(AuthRoute) )
