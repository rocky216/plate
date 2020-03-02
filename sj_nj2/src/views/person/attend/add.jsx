import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Select, Input, DatePicker, TreeSelect, Form, Row, Col, Button, Icon, Modal} from "antd";
import {getAttendanceInit, loadSelectDeptByRole, getEmployeeDict, getProcessList, addAttendance} from "@/actions/personAction"
import {addAttendColumns} from "../columns"
import JCard from "@/components/JCard"
import moment from "moment"

const {Option} = Select
const {TreeNode} = TreeSelect
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

class AddAttend extends React.Component { 
  constructor(props){
    super(props)
    this.state = {
      initalData:[],
      initList: [],
      deptList:[],
      deptType: "",
      processList: []
    }
  }

  componentDidMount(){
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/absence"}, res=>{
      this.setState({deptList: res})
    })
    this.initial({})
    this.props.actions.getEmployeeDict({})
  }
  initial(params){
    this.props.actions.getAttendanceInit(params, res=>{
      this.setState({initList:res.list, initalData: _.cloneDeep(res)})
      
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  shiftChange(index,{target}){
    const {initList} = this.state
    
    initList[index]["attenType"] = target.value
    this.setState({initList})
  }
  planChange(index,value){
    const {initList} = this.state
    if(initList[index]["attenType"]=="0"){
      initList[index]["bbTrueHour"]=value
    }else if(initList[index]["attenType"]=="1"){
      initList[index]["wbTrueHour"]=value
    }
    this.setState({initList})
  }
  nPlanChange(index,value){
    const {initList} = this.state
    initList[index]["overtimeHour"]=value
    this.setState({initList})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.initial({
        ...values,
        deptType: this.state.deptType,
        attendanceTime: values.attendanceTime?moment(values.attendanceTime).format("YYYY-MM-DD"):""
      })
    })
  }
  handlenReset(){
    this.props.form.resetFields()
    this.setState({deptType: ""})
    this.initial({})
  }

  handlenDeptType(key,arr, {triggerNode}){
    this.setState({deptType: triggerNode.props.dataRef.deptType})
  }

  check(arrNew, arrOld){
    let bBtn = false
    _.each(arrNew, (item, index)=>{
      if(item.overtimeHour != arrOld[index]["overtimeHour"]){
        bBtn = true
        return
      }
    })
    return bBtn
  }
  handlenData(){
    const {initList, initalData} = this.state
    let info = []
    _.each(initList, item=>{
      info.push({
        employeeId: item.employeeId,
        employeeName: item.employeeName,
        attenType: item.attenType,
        attenHour: item.attenType=="0"?item.bbTrueHour:item.wbTrueHour,
        overtimeHour: item.overtimeHour?item.overtimeHour:0
      })
    })
    return info
  }
  countHour(arr){
    return 0
    if(!arr || !_.isArray(arr) || !arr.length){
      return 0
    }
    let n = 0
    _.each(arr, item=>{
      if(item.leaveStatus=="批准" || item.leaveStatus=="审批中"){
        n+=item.leaveHour?parseFloat(item.leaveHour):0
      }
    })
    return n
    
  }

  handlenSubmit(){
    let _this = this
    const {initalData} = this.state
    this.props.actions.addAttendance({
      info: JSON.stringify(this.handlenData()),
      deptId: initalData.deptId,
      attendanceTime: initalData.attendanceTime,
    }, res=>{
      this.props.utils.OpenNotification("success")
      Modal.info({
        title:"提交成功！",
        content: (
          <div>
            {res && res.length?res.map((item, index)=>(
              <p key={index} style={{color: item.type=="info"?"#1890ff":"red"}}>{item.info}</p>
            )):null}
          </div>
        ),
        onOk(){
          _this.props.history.push("/person/attend")
        }
      })
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, employeedict} = this.props
    const {initList, deptList, processList, initalData} = this.state

    return (
      <JCard spinning={spinning}> 
        <Card size="small" extra={(
          <div>
            <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
            <Link to="/person/attend" className="mgl10"><Button ><Icon type="rollback" />返回</Button></Link>
          </div>
        )} >
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
              <Row>
                <Col span={4}>
                  <Form.Item label="班次">
                    {getFieldDecorator('productionType')(
                      <Select>
                        <Option value="">全部</Option>
                        <Option value="0">白班</Option>
                        <Option value="1">夜班</Option>
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
                      initialValue: initalData?initalData.showDeptId:""
                    })(
                      deptList && deptList.length?
                      <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll onChange={this.handlenDeptType.bind(this)} >
                        {this.createNode(deptList)}
                      </TreeSelect>:<span></span>
                    )}
                  </Form.Item>
                </Col>
                
                <Col span={4}>
                  <Form.Item label="考勤日期">
                    {getFieldDecorator('attendanceTime',{
                      initialValue: initalData?moment(initalData.attendanceTime):""
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

            <Table bordered size="small" columns={addAttendColumns(this)} dataSource={initList?utils.addIndex(initList):[]} 
            pagination={false}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAttendanceInit, loadSelectDeptByRole, getEmployeeDict, getProcessList, addAttendance}, dispatch)
  }
}

function mapStateProps(state){
  return {
    employeedict: state.person.employeedict,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddAttend) )