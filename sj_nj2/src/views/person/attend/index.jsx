import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Select, TreeSelect, Input, Form, Row, Col, DatePicker, Popconfirm, Tabs} from "antd";
import JCard from "@/components/JCard"
import {getAttend, getEmployeeDict, loadSelectDeptByRole, deleteAttend} from "@/actions/personAction"
import {attendColumns} from "../columns"
import moment from "moment"
import MonthAttend from "./month"
import AuthButton from "@/components/AuthButton"

const {Option} = Select
const {TreeNode} = TreeSelect
const {TextArea} = Input
const {TabPane} = Tabs

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

class Attend extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: "1",
      params: {
        current: 1,
        levelId:"",
        employeeName:"",
        jobNumber:"",
        productionType:"",
        attendanceTime:"",
        deptId:"",
        deptType:""
      },
      deptList:[]
    }
  }

  componentDidMount(){
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/absence"}, res=>{
      this.setState({deptList: res})
    })
    this.props.actions.getAttend(this.state.params) 
    this.props.actions.getEmployeeDict({})
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  
  handlenDeptType(key,arr, {triggerNode}){
    const {params} = this.state
    params.deptType = triggerNode.props.dataRef.deptType
    this.setState({params})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {params} = this.state
      const {
        levelId,
        employeeName,
        jobNumber,
        productionType,
        attendanceTime,
        deptId
      } = values
      params.levelId = levelId
      params.employeeName = employeeName
      params.jobNumber = jobNumber
      params.productionType = productionType
      params.attendanceTime = attendanceTime?moment(attendanceTime).format("YYYY-MM-DD"):""
      params.deptId = deptId
      this.setState({params})
      this.props.actions.getAttend(params) 
    })
  }
  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      current: 1,
      levelId:"",
      employeeName:"",
      jobNumber:"",
      productionType:"",
      attendanceTime:"",
      deptId:"",
      deptType:""
    }
    this.setState({params: obj})
    this.props.actions.getAttend({current: 1}) 
  }
  handlenDelete(item){
    this.props.actions.deleteAttend({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getAttend(this.state.params) 
    })
  }
  getCol(){
    let _this = this
    return attendColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/person/attend/${item.id}/edit`}>
              <AuthButton auth="2-06-02" type="link" size="small">编辑</AuthButton>
            </Link>
            
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <AuthButton auth="2-06-03" type="link" size="small">删除</AuthButton>
              </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, attend, employeedict } = this.props
    const {deptList, tabKey} = this.state

    return (
      <JCard spinning={spinning}>
        <div style={{background: "#fff"}}>
            <Tabs activeKey={tabKey} onChange={key=>this.setState({tabKey: key})}>
              <TabPane key="1" tab={`每天出勤数据`} />
              <TabPane key="2" tab="月度考勤表" />
            </Tabs>
          {tabKey=="1"?
          <Card bordered={false} size="small" title={(
            <Link to="/person/attend/add">
              <AuthButton auth="2-06-01" type="primary"><Icon type="plus" />提交考勤</AuthButton>
            </Link>
          )}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
              <Row>
                <Col span={4}>
                  <Form.Item label="班次">
                    {getFieldDecorator('productionType')(
                      <Select>
                        <Option value="">全部</Option>
                        <Option value="1">白班</Option>
                        <Option value="2">夜班</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="姓名">
                    {getFieldDecorator('employeeName')(
                      <Input/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="工号">
                    {getFieldDecorator('jobNumber')(
                      <Input/>
                    )}
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
                  <Form.Item labelCol={{sm: {span:5}}} label="组织机构">
                    {getFieldDecorator('deptId', {
                      initialValue: ""
                    })(
                      deptList && deptList.length?
                      <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll onChange={this.handlenDeptType.bind(this)}  >
                        {this.createNode(deptList)}
                      </TreeSelect>:<span></span>
                    )}
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item label="考勤日期">
                    {getFieldDecorator('attendanceTime',{
                      // initialValue: moment()
                    })(
                      <DatePicker/>
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

            <Table size="small" bordered columns={this.getCol()} dataSource={attend?utils.addIndex(attend.list):[]} 
              pagination={utils.Pagination(attend, page=>{
                params.current = page
                this.setState({params})
                this.props.actions.getAttend(params)
              })}/>
          </Card>
          :null}
          {tabKey=="2"?<MonthAttend/>:null}
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAttend, getEmployeeDict, loadSelectDeptByRole, deleteAttend}, dispatch)
  }
}

function mapStateProps(state){
  return {
    employeedict: state.person.employeedict,
    attend: state.person.attend,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Attend) )