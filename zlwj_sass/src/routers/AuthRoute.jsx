import React from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Route,
  withRouter
} from "react-router-dom"


class AuthRoute extends React.Component{
  render(){
    const {Component, path, exact, name} = this.props
    return (
      <Route path={path} component={Component}></Route>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(){
  return {

  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(AuthRoute) )
