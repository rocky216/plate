import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button} from "antd";



class AuthButton extends React.Component {
  handlenData(){
    const {auth, base} = this.props
    if(base && base.employeeMenuMap && base.employeeMenuMap.length){
      let index = _.findIndex(base.employeeMenuMap, o=>o.key==auth)
      return index>-1?<Button {...this.props}>{this.props.children}</Button>:null
    }else{
      return null
    }
    
  }

  render(){
    const {utils, base} = this.props
    
    return this.handlenData()
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    base: state.app.base,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AuthButton)