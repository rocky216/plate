import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Route, Redirect} from "react-router-dom"


class AuthRoute extends React.Component {

  handlenAuth(){
    const {auth, meunList, Component} = this.props
    
    if (!auth) {
      return <Component/>
    }

    if (meunList && meunList.length>0) {
      let _index = _.findIndex(meunList, o=>o.perms == auth)
      if (_index==-1) {
        return <Redirect to="/login" />
      }else{
        return <Component/>
      }
    }
  }
  
  handlenGo(){
    const {path, Component, auth, meunList} = this.props
    if (!auth) {
      return <Route path={path} component={Component}/>
    }
    
    if (meunList && meunList.length>0) {
      let _index = _.findIndex(meunList, o=>o.perms == auth)
      if (_index==-1) {
        return <Redirect to="/login" />
      }else{
        return <Route path={path} component={Component}/>
      }
    }else {
      return <Route path={path} component={Component}/>
    }
  }

  render(){
    const {path, Component, auth} = this.props

    return path.indexOf(":")>-1?this.handlenGo()
                                :<Route path={path}  render={props=>{
                                  return this.handlenAuth()
                                }}  />
    
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    meunList: state.app.meunList
  }
}

export default connect(mapStateProps, mapDispatchProps)(AuthRoute)