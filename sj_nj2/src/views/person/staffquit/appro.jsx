import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";
import {getStaffQuitDetail} from "@/actions/personAction"

class quitAppro extends React.Component {
  componentDidMount(){
    this.props.actions.getStaffQuitDetail({id: this.props.match.params.id})
  }

  render(){
    const {utils} = this.props

    return (
      <div>quitAppro</div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaffQuitDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(quitAppro)