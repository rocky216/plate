import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import JCard from "@/components/JCard"



class Process extends React.Component {
  render(){
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/system/process/add"><Button type="primary"><Icon type="plus" />新建流程</Button></Link>}>
          <Table size="small" />
        </Card>
      </JCard>
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
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Process)