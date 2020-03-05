import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card } from "antd";
import JCard from "@/components/JCard"
import {getParkList} from "@/actions/projectAction"


class ParkList extends React.Component {

  componentDidMount(){
    this.initial({})
  }

  initial(params){
    this.props.actions.getParkList({})
  }

  render(){
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning}>
        <Card >

        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getParkList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.base.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkList)