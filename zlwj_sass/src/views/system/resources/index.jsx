import React from "react"
import {connect} from "react-redux"
import {Link } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button} from "antd";
import JCard from "@/components/JCard"
import {getMobileType } from "@/actions/systemAction"
import {resourcesColumns} from "../colmuns"


class Resources extends React.Component {

  componentDidMount(){
    this.props.actions.getMobileType({}); 
  }

  getCol(){
    return resourcesColumns.concat([{
      title: "操作",
      render(item){
        return <div>
          <Link to={`/system/resources/${item.id}/edit`}>
            <Button type="link">编辑</Button>
          </Link>
        </div>
      }
    }])
  }

  render(){
    const {utils, spinning, mobiledata} = this.props

    return (
      <JCard spinning={spinning}>
        <Card>
          <Table columns={this.getCol()} dataSource={mobiledata?utils.addIndex(mobiledata):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getMobileType }, dispatch)
  }
}

function mapStateProps(state){
  return {
    mobiledata: state.system.mobiledata,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Resources)