import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Row, Col, Form, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getQuitStaff, deleteQuitStaff} from "@/actions/personAction"
import {quitStaffColumns} from "../columns"


class StaffQuit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getQuitStaff(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteQuitStaff({id: item.id}, res=>{
      this.props.actions.getQuitStaff(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this
    return quitStaffColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button size="small" type="link">删除</Button>
            </Popconfirm>
            <Button size="small" type="link">审批记录</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, quitStaff} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Form>
            <Row>
              
            </Row>
          </Form>
          

          <Table size="small" columns={this.getCol()} dataSource={quitStaff?utils.addIndex(quitStaff.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getQuitStaff, deleteQuitStaff}, dispatch)
  }
}

function mapStateProps(state){
  return {
    quitStaff: state.person.quitStaff,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(StaffQuit) )