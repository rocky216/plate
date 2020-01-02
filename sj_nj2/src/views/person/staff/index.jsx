import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import JCard from "@/components/JCard"
import {getStaff} from "@/actions/personAction"
import {staffColumns} from "../columns"


class Staff extends React.Component {
  componentDidMount(){
    this.props.actions.getStaff({current: 1})
  }

  getCol(){
    return staffColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/person/staff/${item.id}/edit`}>
              <Button size="small" type="link" >编辑</Button>
            </Link>
            <Button size="small" type="link" >离职</Button>
            <Button size="small" type="link" >调岗</Button>
            <Button size="small" type="link" >删除</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, staff} = this.props
    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/person/staff/add"><Button type="primary"><Icon type="plus" />新增员工</Button></Link>}>
          <Table size="small" bordered 
            columns={this.getCol()} 
            dataSource={staff?utils.addIndex(staff.list):[]} />
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
    staff: state.person.staff,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Staff)