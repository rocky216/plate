import React from "react"
import {connect} from "react-redux"
import {Switch, Route} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Tabs, Table, Button, Popconfirm, Form, Input} from "antd";
import {getPpPatrolPoint, deletePpPatrolPoint} from "@/actions/dailyAction"
import {patrolPointColmuns} from "../../colmuns"
import AddPatrolPoint from "./add"
import EditPatrolPoint from "./edit"


const {TabPane} = Tabs

let params = {
  current: 1,
}

class DailyPatrolPoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  

  componentDidMount(){
    this.props.actions.getPpPatrolPoint(params)
  }

  handlenDelete(item){
    this.props.actions.deletePpPatrolPoint({id: item.id}, res=>{
      this.props.actions.getPpPatrolPoint(params)
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this;
    return patrolPointColmuns.concat([{
      title: "操作",
      render(item) {
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link">删除</Button>
              </Popconfirm>
              <a href={`/api/pc/ppPatrolPoint/createImg?id=${item.id}&token=${_this.props.utils.getCookie("token")}`}>
                <Button type="link" >下载二维码</Button>
              </a>
          </div>
        );
      }
    }])
  }

  handlenSearch(){
    
    this.props.form.validateFieldsAndScroll((err, values)=>{
      params.name=values.name
      this.props.actions.getPpPatrolPoint(params)
    })
  }

  render(){
    const {getFieldDecorator } = this.props.form;
    const {utils, spinning, patrolPoint} = this.props
    const {addVisible, editVisible, detail} = this.state
    
    return (
      <>
        <AddPatrolPoint visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        <EditPatrolPoint visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ""})} />
        <Card size="small" 
          title={<Button type="primary" icon="plus" onClick={()=>this.setState({addVisible: true})}>新增巡更点</Button>} bordered={false}
          extra={
            <Form layout="inline">
              <Form.Item label="巡更点名称" >
                {getFieldDecorator('name')(<Input />)}
              </Form.Item>
              <Form.Item>
                <Button icon="search" type="primary" onClick={this.handlenSearch.bind(this)} >搜索</Button>
              </Form.Item>
            </Form>
          }
        >
          <Table columns={this.getCol()} dataSource={patrolPoint?utils.addIndex(patrolPoint.list):[]} 
          pagination={utils.Pagination(patrolPoint, page=>{
            params.current = page
            this.props.actions.getPpPatrolPoint(params)
          })}/>
        </Card>
      </>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPpPatrolPoint, deletePpPatrolPoint}, dispatch)
  }
}

function mapStateProps(state){
  return {
    patrolPoint: state.daily.patrolPoint,
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(DailyPatrolPoint) )