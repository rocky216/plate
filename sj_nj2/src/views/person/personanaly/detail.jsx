import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";
import JCard from "@/components/JCard"
import {getHResourceAnalysisDetail} from "@/actions/personAction"


class AnalyDetail extends React.Component {
  componentDidMount(){
    this.props.actions.getHResourceAnalysisDetail({deptId: this.props.match.params.id})
  }

  render(){
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning}>AnalyDetail</JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHResourceAnalysisDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AnalyDetail)