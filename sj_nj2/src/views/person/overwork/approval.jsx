import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Row, Col,Form, TreeSelect, Input, Select, Button, Icon, Table, Popconfirm, Radio} from "antd";
import JCard from "@/components/JCard"
import {loadSelectDeptByRole, getProcessList, approvalOverWork, getApprovalWork, updateOverworkTemporaryStatus} from "@/actions/personAction"
import {overworkApprovalColmuns, overworlHistoryColmuns} from "../columns"

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

class ApprovalOverwork extends React.Component {
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
    this.props.actions.getApprovalWork({id: this.props.match.params.id}, res=>{
      let arr = []
      this.setState({info: res, detailList:res.workDetailList})
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
    this.props.actions.getProcessList({flowOrganId: id,flowType:3},res=>{
      this.setState({processList: res})
    })
  }


  handlenSave(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {} = values
        this.props.actions.approvalOverWork({
          id: this.props.match.params.id,
          flowNodeId: this.state.info.nodeId,
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
      if(item.workFinalStatus!="2"){
        arr.push(item.id)
      }
    })
    if(!arr.length){
      this.props.utils.OpenNotification("error", "没有可执行的数据！")
      return
    }
    this.props.actions.updateOverworkTemporaryStatus({
      ids: arr.join(),
      workTemporaryStatus: target.value
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  handlenSingAppro(item,{target}){
    this.props.actions.updateOverworkTemporaryStatus({ 
      ids: item.id,
      workTemporaryStatus: target.value
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  getCol(){
    let _this = this
    return overworkApprovalColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Radio.Group disabled={item.workFinalStatus=="2"?true:false} value={item.workTemporaryStatus} onChange={_this.handlenSingAppro.bind(_this, item)} >
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
    
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title="计划外加班审批" extra={(
          <div>
            <Button type="primary" onClick={this.handlenSave.bind(this)} ><Icon type="save"  />提交</Button>
            <Link to="/" className="mgl10">
              <Button ><Icon type="rollback" />返回</Button>
            </Link>
          </div>
        )}>
          <Form {...formItemLayout}> 
            <Col span={8}>
              <Form.Item label="加班申请单号">
                {getFieldDecorator("workNo",{
                  initialValue: info.workNo,
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item labelCol={{sm:{span:12}}} wrapperCol={{sm:{span:12}}} label="部门/车间累计计划外加班时长">
                {getFieldDecorator("workTimeAll",{
                  initialValue: info.workTimeAll,
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="审批流程">
                {getFieldDecorator("flowTemplateId", {
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
              <Form.Item label="车间">
                {getFieldDecorator("deptName",{
                  initialValue: info.deptName,
                })(
                  deptList && deptList.length?
                  <TreeSelect disabled treeDefaultExpandAll onChange={this.handlenChange.bind(this)} >
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item labelCol={{sm:{span:12}}} wrapperCol={{sm:{span:12}}} label="部门/车间人均计划外加班时长">
                {getFieldDecorator("workTimeAvg",{
                  initialValue: info.workTimeAvg,
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
              <Form.Item label="标题">
                {getFieldDecorator("workTitle",{
                  initialValue: info.workTitle,
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item  labelCol={{sm:{span:12}}} wrapperCol={{sm:{span:12}}} label="创建人">
                {getFieldDecorator("buildUserName",{
                  initialValue: info.buildUserName,
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
            <Col span={12}>
              <Form.Item labelCol={{sm:{span:4}}} label="审批意见">
                {getFieldDecorator("approveOpinion",{
                })(
                  <TextArea  />
                )}
              </Form.Item>
            </Col>
          </Form>
        </Card>
        <Card size="small"  title="加班申请明细记录" extra={(
          <Radio.Group onChange={this.handlenSingApproAll.bind(this)} >
            <Radio value="2">全部批准</Radio>
            <Radio value="1">全部不批准</Radio>
          </Radio.Group>
        )} >
          <Table size="small" bordered columns={this.getCol()} dataSource={ utils.addIndex(detailList) } pagination={false} />
        </Card>
        <Card size="small" title="审批记录">
          <Table size="small" columns={overworlHistoryColmuns} dataSource={info && info.sysFlowNodes && info.sysFlowNodes.length?info.sysFlowNodes:[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectDeptByRole, getProcessList, approvalOverWork, getApprovalWork, updateOverworkTemporaryStatus}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(ApprovalOverwork) )