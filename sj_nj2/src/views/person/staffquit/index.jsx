import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Row, Col, Form, Popconfirm, Input, Select, TreeSelect, DatePicker, Icon } from "antd";
import JCard from "@/components/JCard"
import {getQuitStaff, deleteQuitStaff, loadSelectDeptByRole, getEmployeeDict} from "@/actions/personAction"
import {quitStaffColumns} from "../columns"
import ApproRecord from "./approRecord"
import moment from "moment"
import AuthButton from "@/components/AuthButton"

const {Option} = Select
const {TreeNode} = TreeSelect
const {RangePicker } = DatePicker;
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class StaffQuit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      detail: "",
      deptList:[],
      params: {
        current: 1,
        name:"",
        quitReason:"",
        sectionType:"",
        startTime:"",
        endTime:"",
        applyName:"",
        flowStatus:"",
        mDeptId:"",
        levelId:"",
        intoCenterId:"",
        personTypeId:""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getQuitStaff(this.state.params)
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/employeeQuit"}, res=>{
      this.setState({deptList: res})
    })
    this.props.actions.getEmployeeDict({})
  }

  handlenDelete(item){
    this.props.actions.deleteQuitStaff({id: item.id}, res=>{
      this.props.actions.getQuitStaff(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
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
                <AuthButton auth="2-02-01" size="small" type="link">删除</AuthButton>
            </Popconfirm>
            <AuthButton auth="2-02-02" size="small" type="link" onClick={()=>_this.setState({visible: true, detail:item})}>审批记录</AuthButton>
          </div>
        )
      }
    }])
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      const {params} = this.state
      const {
        name,
        quitReason,
        sectionType,
        time,
        applyName,
        flowStatus,
        mDeptId,
        levelId,
        intoCenterId,
        personTypeId} = values
        params.name = name
        params.startTime = time && time.length?moment(time[0]).format("YYYY-MM-DD")+" 00:00:00":""
        params.endTime = time && time.length?moment(time[1]).format("YYYY-MM-DD")+" 23:59:59":""
        params.applyName = applyName
        params.flowStatus = flowStatus
        params.mDeptId = mDeptId
        params.levelId = levelId
        params.intoCenterId = intoCenterId
        params.personTypeId = personTypeId
        params.quitReason = quitReason
        this.setState({params})
        this.props.actions.getQuitStaff(params)
    })
  }

  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      current: 1,
      name:"",
      quitReason:"",
      sectionType:"",
      startTime:"",
      endTime:"",
      applyName:"",
      flowStatus:"",
      mDeptId:"",
      levelId:"",
      intoCenterId:"",
      personTypeId:""
    }
    this.setState({params: obj})
    this.props.actions.getQuitStaff({current: 1})
  }

  handlenSectionType(value){
    this.state.params.sectionType = value
    this.setState({params:this.state.params})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, quitStaff, employeedict } = this.props
    const {visible, detail, deptList, params} = this.state

    return (
      <JCard spinning={spinning}>
        {visible?<ApproRecord visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail:""})} />:null}
        <Card size="small">
        <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col span={4}>
              <Form.Item label="离职人">
                {getFieldDecorator('name')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="申请人">
                {getFieldDecorator('applyName')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={(
                <Select style={{width: "80%"}} value={params.sectionType} onChange={this.handlenSectionType.bind(this)} >
                  <Option value="">全部</Option>
                  <Option value="1">离职日期</Option>
                  <Option value="2">入职日期</Option>
                  <Option value="3">申请日期</Option>
                </Select>
              )}>
                {getFieldDecorator('time')(<RangePicker />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="岗级">
                {getFieldDecorator('levelId')(
                  <Select>
                    <Option value="">全部</Option>
                    {employeedict && employeedict.levelList?employeedict.levelList.map(item=>(
                      <Option key={item.id} value={item.id}>{item.dictName}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="成本中心">
                {getFieldDecorator('intoCenterId')(
                  <Select>
                    <Option value="">全部</Option>
                    {employeedict && employeedict.intoCenterList?employeedict.intoCenterList.map(item=>(
                      <Option key={item.id} value={item.id}>{item.dictName}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="离职原因">
                {getFieldDecorator('quitReason')(
                  <TextArea autoSize={{minRows:1}} />
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="状态">
                {getFieldDecorator('flowStatus')(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="0">申请中</Option>
                    <Option value="1">审批中</Option>
                    <Option value="2">已批准</Option>
                    <Option value="3">不批准</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="组织机构">
                {getFieldDecorator('mDeptId')(
                  deptList && deptList.length?
                  <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll>
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="人员类别">
                {getFieldDecorator('personTypeId')(
                  <Select>
                    <Option value="">全部</Option>
                    {employeedict && employeedict.personTypeList?employeedict.personTypeList.map(item=>(
                      <Option key={item.id} value={item.id}>{item.dictName}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item >
                <Button type="primary" className="mgl10" htmlType="submit"><Icon type="search" />搜索</Button>
                <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
          

          <Table size="small" bordered columns={this.getCol()} 
            dataSource={quitStaff?utils.addIndex(quitStaff.list):[]} 
            pagination={utils.Pagination(quitStaff, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getQuitStaff(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getQuitStaff, deleteQuitStaff, loadSelectDeptByRole, getEmployeeDict}, dispatch)
  }
}

function mapStateProps(state){
  return {
    employeedict: state.person.employeedict,
    quitStaff: state.person.quitStaff,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()( Form.create()(StaffQuit) ) )