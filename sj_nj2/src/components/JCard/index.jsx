import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Spin} from "antd";


class JCard extends React.Component {


  render(){
    const {spinning } = this.props

    return (
    <Spin spinning={spinning} size="large" tip="正在加载...">{this.props.children}</Spin>
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
    
  }
}

export default connect(mapStateProps, mapDispatchProps)(JCard)