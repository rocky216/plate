import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {getStaff} from "@/actions/personAction"


class Staff extends React.Component {
  componentDidMount(){
    this.props.actions.getStaff({current: 1})
  }

  render(){
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/person/staff/add"><Button type="primary"><Icon type="plus" />新增员工</Button></Link>}>

        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaff}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Staff)