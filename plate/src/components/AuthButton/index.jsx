import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Button
} from "antd"


class AuthButton extends React.Component {
  render(){
    const {type, size, meunList, auth} = this.props

    return (
        <span>
          {meunList && meunList.length?
            _.findIndex(meunList, o=>o.perms==auth)>-1?
            <Button type={type?type:'primary'} size={size} >{this.props.children}</Button>:''
          :''}
        </span>
    )
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

export default connect(mapStateProps, mapDispatchProps)(AuthButton)