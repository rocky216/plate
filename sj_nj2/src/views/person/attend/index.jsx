import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import JCard from "@/components/JCard"
import {getAttend} from "@/actions/personAction"


class Attend extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getAttend(this.state.params)
  }

  render(){
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={(
          <Link to="/person/attend/add">
            <Button type="primary"><Icon type="plus" />提交考勤</Button>
          </Link>
        )}>
          <Table size="small"/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAttend}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Attend)