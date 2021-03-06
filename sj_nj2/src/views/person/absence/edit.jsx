import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Row, Col,Form, TreeSelect, Input, Select, Button, Icon, Table, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {loadSelectDeptByRole, getProcessList, addAbsenceOperation, getAbsenceDetail} from "@/actions/personAction"
import {addabsenceColumns} from "../columns"
import AddDetail from "./addDetail"
import EditDetail from "./editDetail"

const {TreeNode} = TreeSelect
const {Option} = Select
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EditAbsence extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList:[],
      addVisible: false,
      editVisible: "",
      detail: "",
      processList: [],
      detailList: [],
      info:""
    }
  }

  componentDidMount(){
    this.props.actions.getAbsenceDetail({id: this.props.match.params.id}, res=>{
      let arr = []
      if(res.detailSet && res.detailSet.length){
        _.each(res.detailSet, item=>{
          arr.push({
            employeeId: item.employeeId,
            name: item.name,
            allDeptNameStr: item.allDeptNameStr,
            absenceEndTime: item.absenceEndTime,
            absenceStartTime: item.absenceStartTime,
            absenceTimeLength: item.absenceTimeLength,
            leaveType: item.leaveType,
            absenceTime: item.absenceTime,
            absenceCause: item.absenceCause,
          })
        })
      }
      this.setState({info: res, detailList:arr})
      this.handlenChange(res.deptId)
    })

    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/absence"}, res=>{
      this.setState({deptList: res})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handlenChange(id){
    this.props.actions.getProcessList({flowOrganId: id,flowType:2},res=>{
      this.setState({processList: res})
    })
  }

  Ok(obj){
    console.log(obj)
    let arr = this.state.detailList.concat(obj)
    this.setState({detailList:arr})
  }

  editOk(obj){
    const {detail, detailList} = this.state
    let index = _.findIndex(detailList, o=>o.key==detail.key)
    detailList[index] = obj
    this.setState({detailList})
  }

  handlenSave(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addAbsenceOperation({
          id: this.props.match.params.id,
          ...values,
          type: "draft",
          details: JSON.stringify(this.state.detailList)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/person/absence")
        })
      }
    })
  }

  handlenSend(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addAbsenceOperation({
          id: this.props.match.params.id,
          ...values,
          type: "send",
          details: JSON.stringify(this.state.detailList)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/person/absence")
        })
      }
    })
  }

  handlenDelete(item){
    const {detailList} = this.state
    let index = _.findIndex(detailList, o=>o.key==item.key)
    detailList.splice(index,1)
    this.setState({detailList})
  }

  getCol(){
    let _this = this
    return addabsenceColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({editVisible: true, detail:item})} >编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button size="small" type="link" >删除</Button>
              </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, spinning} = this.props
    const {deptList, addVisible, processList, detailList, editVisible, detail, info} = this.state
    
    
    return (
      <JCard spinning={spinning}>
        {addVisible?<AddDetail Ok={this.Ok.bind(this)} deptId={getFieldValue("deptId")} visible={addVisible} absenceType={getFieldValue("absenceType")} onCancel={()=>this.setState({addVisible: false})} />:null}
        {editVisible?<EditDetail Ok={this.editOk.bind(this)} deptId={getFieldValue("deptId")} detail={detail} visible={editVisible} absenceType={getFieldValue("absenceType")} onCancel={()=>this.setState({editVisible: false,detail:""})} />:null}
        <Card size="small" title="编辑缺勤单" extra={(
          <div>
            <Button type="primary" ghost onClick={this.handlenSave.bind(this)} ><Icon type="save"  />保存</Button>
            <Button type="primary" className="mgl10 mgr10" onClick={this.handlenSend.bind(this)}><i className="icon iconfont icon-send"  />保存并发送</Button>
            <Link to="/person/absence">
              <Button ><Icon type="rollback" />返回</Button>
            </Link>
          </div>
        )}>
          <Form {...formItemLayout}> 
            <Col span={8}>
              <Form.Item label="车间">
                {getFieldDecorator("deptId",{
                  initialValue: info.deptId,
                  rules: [{required: true,message: '选择车间!',}],
                })(
                  deptList && deptList.length?
                  <TreeSelect treeDefaultExpandAll onChange={this.handlenChange.bind(this)} >
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="缺勤类型">
                {getFieldDecorator("absenceType", {
                  initialValue: info.absenceType,
                  rules: [{required: true,message: '选择车间!',}],
                })(
                  <Select disabled={detailList.length?true:false}>
                    <Option value="1">请假</Option>
                    <Option value="2">旷工</Option>
                    <Option value="3">迟到</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="审批流程">
                {getFieldDecorator("flowId", {
                  initialValue: info.flowTemplateId,
                  rules: [{required: true,message: '审批流程!',}],
                })(
                  <Select>
                    {processList.map(item=>(
                      <Option key={item.id} value={item.id} >{item.flowName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="标题">
                {getFieldDecorator("absenceTitle", {
                  initialValue: info.absenceTitle,
                  rules: [{required: true,message: '标题!',}],
                })(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="备注">
                {getFieldDecorator("remark",{
                  initialValue: info.remark,
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>
            </Col>
          </Form>
        </Card>
        <Card size="small"  title="缺勤明细记录" extra={<Button onClick={()=>this.setState({addVisible: true})} type="primary" ghost><Icon type="plus" />新增缺勤明细</Button>} >
          <Table size="small" columns={this.getCol()} dataSource={ utils.addIndex(detailList) } pagination={false} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectDeptByRole, getProcessList, addAbsenceOperation, getAbsenceDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditAbsence) )