import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";
import {getPropertyTemplate} from "@/actions/financeAction"


class Properytem extends React.Component {
  
  componentDidMount(){
    this.props.actions.getPropertyTemplate({})
  }

  render(){
    return (
      <div>Properytem</div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPropertyTemplate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Properytem)