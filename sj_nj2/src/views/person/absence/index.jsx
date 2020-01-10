import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon} from "antd";
import {absenceColumns} from "../columns"
import JCard from "@/components/JCard"
import {getAbsence} from "@/actions/personAction"


class Absence extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1
      }
    }
  }
  componentDidMount(){
    this.props.actions.getAbsence(this.state.params)
  }

  render(){
    const {utils, spinning, absence} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/person/absence/add"><Button type="primary"><Icon type="plus" />新增缺勤</Button></Link>}>
          <Table  size="small" columns={absenceColumns} dataSource={absence?utils.addIndex(absence.list):[]} />
        </Card>
      </JCard>
      
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAbsence}, dispatch)
  }
}

function mapStateProps(state){
  return {
    absence: state.person.absence,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Absence)