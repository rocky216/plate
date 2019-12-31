import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon} from "antd";
import {getEmployeeDict} from "@/actions/personAction"
import JCard from "@/components/JCard"


class AddStaff extends React.Component {
  componentDidMount(){
    this.props.actions.getEmployeeDict({})
  }

  render(){
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning} >
        <Card size="small" extra={<Link to="Link"><Button><Icon type="rollback" />返回</Button></Link>} ></Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getEmployeeDict}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AddStaff)