import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Row, Col,Form, TreeSelect, Input, Select, Button, Icon, Table, Popconfirm, Radio} from "antd";
import JCard from "@/components/JCard"
import {loadSelectDeptByRole, getProcessList, approvalAbsenceS, getApprovalLook, updateTemporaryStatus} from "@/actions/personAction"
import {addabsenceColumns} from "../columns"

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

class ApprovalAbsence extends React.Component {
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
    
    this.initial()
    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/absence"}, res=>{
      this.setState({deptList: res})
    })
  }

  initial(){
    this.props.actions.getApprovalLook({id: this.props.match.params.id}, res=>{
      let arr = []
      if(res.detailSet && res.detailSet.length){
        _.each(res.detailSet, item=>{
          arr.push({
            id:item.id,
            absenceTemporaryStatus: item.absenceTemporaryStatus,
            absenceFinalStatus: item.absenceFinalStatus,
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


  handlenSave(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {} = values
        this.props.actions.approvalAbsenceS({
          id: this.props.match.params.id,
          flowNodeId: this.state.info.flowId,
          approveResult: values.approveResult,
          approveOpinion: values.approveOpinion
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/")
        })
      }
    })
  }

  handlenSingApproAll({target}){
    const {detailList} = this.state
    let arr = []
    _.each(detailList, item=>{
      if(item.absenceFinalStatus!="2"){
        arr.push(item.id)
      }
    })
    if(!arr.length){
      this.props.utils.OpenNotification("error", "没有可执行的数据！")
      return
    }
    this.props.actions.updateTemporaryStatus({
      ids: arr.join(),
      absenceTemporaryStatus: target.value
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  handlenSingAppro(item,{target}){
    this.props.actions.updateTemporaryStatus({
      ids: item.id,
      absenceTemporaryStatus: target.value
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  getCol(){
    let _this = this
    return addabsenceColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Radio.Group disabled={item.absenceFinalStatus=="2"?true:false} value={item.absenceTemporaryStatus} onChange={_this.handlenSingAppro.bind(_this, item)} >
              <Radio value="2">批准</Radio>
              <Radio value="1">不批准</Radio>
            </Radio.Group>
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, spinning} = this.props
    const {deptList, addVisible, processList, detailList, editVisible, detail, info} = this.state
    console.log(detailList)
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title="缺勤单审批" extra={(
          <div>
            <Button type="primary" onClick={this.handlenSave.bind(this)} ><Icon type="save"  />提交</Button>
            <Link to="/" className="mgl10">
              <Button ><Icon type="rollback" />返回</Button>
            </Link>
          </div>
        )}>
          <Form {...formItemLayout}> 
            <Col span={8}>
              <Form.Item label="缺勤单号">
                {getFieldDecorator("absenceNo",{
                  initialValue: info.absenceNo,
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="车间">
                {getFieldDecorator("deptId",{
                  initialValue: info.deptId,
                  rules: [{required: true,message: '选择车间!',}],
                })(
                  deptList && deptList.length?
                  <TreeSelect disabled treeDefaultExpandAll onChange={this.handlenChange.bind(this)} >
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
                  <Select disabled>
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
                  <Select disabled>
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
                  <Input disabled/>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="备注">
                {getFieldDecorator("remark",{
                  initialValue: info.remark,
                })(
                  <TextArea disabled autoSize={{minRows: 1}} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="创建人">
                {getFieldDecorator("buildUserName",{
                  initialValue: info.buildUserName,
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="创建时间">
                {getFieldDecorator("buildTime",{
                  initialValue: info.buildTime,
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="审批状态">
                {getFieldDecorator("approveResult", {
                  rules: [{required: true,message: '审批状态!',}],
                })(
                  <Radio.Group>
                    <Radio value="1">批准</Radio>
                    <Radio value="2">不批准</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item labelCol={{sm:{span:3}}} label="审批意见">
                {getFieldDecorator("approveOpinion",{
                  rules: [{required: true,message: '审批意见!',}],
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>
            </Col>
          </Form>
        </Card>
        <Card size="small"  title="缺勤明细记录" extra={(
          <Radio.Group onChange={this.handlenSingApproAll.bind(this)} >
            <Radio value="2">全部批准</Radio>
            <Radio value="1">全部不批准</Radio>
          </Radio.Group>
        )} >
          <Table size="small" bordered columns={this.getCol()} dataSource={ utils.addIndex(detailList) } pagination={false} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectDeptByRole, getProcessList, approvalAbsenceS, getApprovalLook, updateTemporaryStatus}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(ApprovalAbsence) )