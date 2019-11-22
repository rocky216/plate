import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {List} from "antd";
import JCard from "@/components/JCard"


class ProData extends React.Component {
  render(){
    const {spinning} = this.props
    return (
      <JCard spinning={spinning} >ProData</JCard>
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
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ProData)