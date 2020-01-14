import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Popconfirm, Form, Select, TreeSelect, DatePicker, Input, Row, Col, Icon} from "antd";
import JCard from "@/components/JCard"
import {postsColumns} from "../columns"
import {getStaffTransferPosition, deletePostsRecord, getEmployeeDict, loadSelectDeptByRole} from "@/actions/personAction"
import Record from "./record"
import moment from "moment"

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



class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      detail: "",
      deptList:[],
      params: {
        current: 1,
        name:"",
        sectionType: "",
        startTime: "",
        endTime:"",
        applyName:"",
        flowStatus:"",
        organType:"",
        sDeptId:"",
        levelId:"",
        intoCenterId:"",
        personTypeId:""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getStaffTransferPosition(this.state.params)
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/employeeTransferPosition"}, res=>{
      this.setState({deptList: res})
    })
    this.props.actions.getEmployeeDict({})
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handlenDelete(item){
    this.props.actions.deletePostsRecord({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getStaffTransferPosition(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return postsColumns.concat([{
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
            <Button onClick={()=>_this.setState({visible: true, detail:item})} size="small" type="link">审批记录</Button>
          </div>
        )
      }
    }])
  }

  handlenSectionType(value){
    this.state.params.sectionType = value
    this.setState({params:this.state.params})
  }

  handlenDeptType(value){
    this.state.params.organType = value
    this.setState({params:this.state.params})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      const {params} = this.state
      const {
        name,
        time,
        applyName,
        flowStatus,
        sDeptId,
        levelId,
        intoCenterId,
        personTypeId} = values
        params.name = name
        params.startTime = time && time.length?moment(time[0]).format("YYYY-MM-DD"):""
        params.endTime = time && time.length?moment(time[1]).format("YYYY-MM-DD"):""
        params.applyName = applyName
        params.flowStatus = flowStatus
        params.sDeptId = sDeptId
        params.levelId = levelId
        params.intoCenterId = intoCenterId
        params.personTypeId = personTypeId
        this.setState({params})
        this.props.actions.getStaffTransferPosition(params)
    })
  }

  handlenReset(){
    this.props.form.resetFields()
    let obj = {
        current: 1,
        name:"",
        sectionType: "",
        startTime: "",
        endTime:"",
        applyName:"",
        flowStatus:"",
        organType:"",
        sDeptId:"",
        levelId:"",
        intoCenterId:"",
        personTypeId:""
    }
    this.setState({params: obj})
    this.props.actions.getStaffTransferPosition({current: 1})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, staffpos, employeedict } = this.props
    const {visible, detail, params, deptList} = this.state

    return (
      <JCard spinning={spinning}>
        {visible?<Record visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail:""})} />:null}
        <Card size="small">
        <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col span={4}>
              <Form.Item label="被调岗人员">
                {getFieldDecorator('name')(<Input />)}
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
              <Form.Item label="申请人">
                {getFieldDecorator('applyName')(<Input />)}
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
            <Col span={8}>
              <Form.Item label={(
                <Select style={{width: "80%"}} value={params.organType} onChange={this.handlenDeptType.bind(this)} >
                  <Option value="">全部</Option>
                  <Option value="1">原组织机构</Option>
                  <Option value="2">调岗组织结构</Option>
                </Select>
              )}>
                {getFieldDecorator('sDeptId')(
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
            dataSource={staffpos?utils.addIndex(staffpos.list):[]} 
            pagination={utils.Pagination(staffpos, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getStaffTransferPosition(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaffTransferPosition, deletePostsRecord, getEmployeeDict, loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    employeedict: state.person.employeedict,
    staffpos: state.person.staffpos,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Posts) )