import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";


class Message extends React.Component {
  render(){
    return (
      <div>Message</div>
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
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Message)