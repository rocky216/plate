import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, Row, Col, Select, Icon, DatePicker, TimePicker } from "antd";
import {getEmployeeDetail} from "@/actions/personAction"
import Teach from "../staff/teach"
import {leaveType} from "./data"
import moment from "moment"

const {TextArea} = Input
const {Option} = Select
const {RangePicker} = DatePicker

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

class EditDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teach: "",
      teachVisible: false,
      staffDetail: {},
      absenceStartTime: "",
      absenceEndTime: "",
      absenceTimeLength: "",
    }
  }
  componentDidMount(){
    this.props.actions.getEmployeeDetail({
      id: this.props.detail.employeeId
    }, res=>{
      this.setState({staffDetail: res})
    })
    const {absenceStartTime, absenceEndTime, absenceTimeLength, name, allDeptNameStr, employeeId} = this.props.detail
    
    this.setState({absenceStartTime, absenceEndTime, absenceTimeLength, teach: {name,allDeptNameStr,id:employeeId}})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {absenceStartTime, absenceEndTime, absenceTimeLength, teach} = this.state
        
        if( moment(absenceStartTime,"HH:mm")> moment(absenceEndTime,"HH:mm")){
          this.props.utils.OpenNotification("error", "缺勤开始时间不能大于结束时间！")
          return
        }
        const {absenceTime, absenceCause, leaveType} = values
        let obj = {
          employeeId: teach.id,
          name: teach.name,
          allDeptNameStr: teach.allDeptNameStr,
          absenceEndTime,
          absenceStartTime,
          absenceTimeLength,
          leaveType: leaveType,
          absenceTime: absenceTime && absenceTime.length?`${moment(absenceTime[0]).format("YYYY-MM-DD")}到${moment(absenceTime[1]).format("YYYY-MM-DD")}`:null,
          absenceCause: absenceCause
        }
        this.props.Ok(obj)
        this.props.onCancel()
      }
    })
  }

  onSelect(item){
    this.setState({teach: item})
    this.props.form.setFieldsValue({
      employeeId: item.id
    })
    this.props.actions.getEmployeeDetail({
      id: item.id
    }, res=>{
      this.setState({staffDetail: res})
    })
  }

  changeTime(type, val){
    const {absenceStartTime, absenceEndTime, absenceTimeLength} = this.state
    
    if(type=="start"){
      this.setState({absenceStartTime:val?moment(val).format("HH:mm"):""})
    }else {
      this.setState({absenceEndTime:val?moment(val).format("HH:mm"):""})
    }
  }

  OpenChange(type){
    console.log(arguments)
    const {absenceStartTime, absenceEndTime, absenceTimeLength} = this.state
    if(!type && absenceStartTime && absenceEndTime){
      let m1 = moment('2020-1-10 '+absenceStartTime),
           m2 = moment('2020-1-10 '+absenceEndTime)
      let min = m2.diff(m1, 'minute')
      this.setState({absenceTimeLength: min<0?0:min})
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, absenceType, detail} = this.props
    const {teach, teachVisible, staffDetail, absenceStartTime, absenceEndTime, absenceTimeLength, } = this.state
    
    return (
      <div>
        <Teach visible={teachVisible} onCancel={()=>this.setState({teachVisible: false})} 
          onSelect={this.onSelect.bind(this)} />
        <Modal
          destroyOnClose
          width={800}
          okText="确定"
          cancelText="取消"
          confirmLoading={spinning}
          visible={visible}
          onCancel={onCancel}
          onOk={this.handlenSubmit.bind(this)}
        >
          <Form {...formItemLayout} >
            <Row>
              <Col span={12}>
                <Form.Item label="缺勤人" >
                  {getFieldDecorator('employeeId', {
                    initialValue: detail.employeeId,
                    rules: [{required: true,message: '选择缺勤人!',}],
                  })(
                    <div className="teach_wrap">
                    <Input  value={teach && teach.name?teach.name:detail.name} />
                    <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({teachVisible: true})} />
                  </div>
                  )}
                </Form.Item>
              </Col>
              {staffDetail.mDeptName?<Col span={12}>
                <Form.Item label="车间" hasFeedback>
                  {getFieldDecorator('mDeptName', {
                    initialValue: staffDetail.mDeptName
                  })(
                    <Input disabled/>
                  )}
                </Form.Item>
              </Col>:null}
              {staffDetail.unitDeptName?
              <Col span={12}>
                <Form.Item label="单元" hasFeedback>
                  {getFieldDecorator('unitDeptName',{
                    initialValue: staffDetail.unitDeptName
                  })(
                    <Input disabled/>
                  )}
                </Form.Item>
              </Col>:null}
              {staffDetail.unitDeptName?
              <Col span={12}>
                <Form.Item label="工段" hasFeedback>
                  {getFieldDecorator('workScoreDeptName',{
                    initialValue: staffDetail.workScoreDeptName
                  })(
                    <Input disabled/>
                  )}
                </Form.Item>
              </Col>:null}
              {staffDetail.unitDeptName?
              <Col span={12}>
                <Form.Item label="班组" hasFeedback>
                  {getFieldDecorator('classDeptName',{
                    initialValue: staffDetail.classDeptName
                  })(
                    <Input disabled/>
                  )}
                </Form.Item>
              </Col>:null}
              <Col span={12}>
                <Form.Item label="缺勤类型" hasFeedback>
                  {getFieldDecorator('employeeId1', {
                    initialValue: absenceType=="1"?"请假":absenceType=="2"?"旷工":"迟到"
                  })(
                    <Input disabled />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="请假类型" hasFeedback>
                  {getFieldDecorator('leaveType', {
                    initialValue: detail.leaveType,
                    rules: [
                      {
                        required: true,
                        message: '选择请假类型!',
                      }
                    ],
                  })(
                    <Select>
                      {leaveType.map(item=>(
                        <Option key={item.value} value={item.value} >{item.title}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="缺勤日期" hasFeedback>
                  {getFieldDecorator('absenceTime', {
                    initialValue: [moment(detail.absenceTime.split("到")[0]),moment(detail.absenceTime.split("到")[1])],
                    rules: [
                      {
                        required: true,
                        message: '选择缺勤日期!',
                      }
                    ],
                  })(
                    <RangePicker />
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item labelCol={{sm:{span:3}}}  label="缺勤时间" hasFeedback>
                  <TimePicker format='HH:mm' value={absenceStartTime?moment(absenceStartTime,"HH:mm"):null} 
                    onChange={this.changeTime.bind(this, "start")} onOpenChange={this.OpenChange.bind(this)} /><span>-</span>
                    <TimePicker format='HH:mm' value={absenceEndTime?moment(absenceEndTime,"HH:mm"):null} 
                    onChange={this.changeTime.bind(this, "end")} onOpenChange={this.OpenChange.bind(this)} />
                  <span className="mgl10">（缺勤时长：{(absenceTimeLength/60).toFixed(2)} 小时）</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="缺勤事由" hasFeedback>
                  {getFieldDecorator('absenceCause', {
                    initialValue: detail.absenceCause,
                    rules: [
                      {
                        required: true,
                        message: '缺勤事由!',
                      }
                    ],
                  })(
                    <TextArea />
                  )}
                </Form.Item>
              </Col>
            </Row>
            
          </Form>
        </Modal>
      </div>
      
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getEmployeeDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.person.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditDetail)) )