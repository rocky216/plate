import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";
import {getThemeOption} from "@/actions/otherAction"


class SelectHouse extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.props.actions.getThemeOption(this.state.params)
  }

  render(){
    return (
      <div>SelectHouse</div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getThemeOption}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectHouse)