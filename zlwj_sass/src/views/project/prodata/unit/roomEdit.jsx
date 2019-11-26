import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select, DatePicker, Divider, Typography} from "antd";
import {editRoom, getUtilList} from "@/actions/projectAction"
import moment from "moment"

const {Option} = Select
const {Text} = Typography
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class RoomEdit extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isFix: ""
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.detail && this.state.isFix===""){
      this.setState({isFix: nextProps.detail.heHouseInfo.packingStatus})
    }
  }

  handlenTime(str){
    if(!str) return ''
    return moment(str).format("YYYY-MM-DD")
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      if(!err){
        this.props.actions.editRoom({
          ...values,
          id: this.props.detail.id,
          houseId: this.props.detail.id,
          unitId: this.props.detail.unitId,
          buildingId: this.props.detail.buildingId,
          heId: this.props.detail.heId,
          heHouseInfoId: this.props.detail.heHouseInfo.id,

          deliversTime: this.handlenTime(values.deliversTime),
          packingEndTime: this.handlenTime(values.packingEndTime),
          packingStartTime: this.handlenTime(values.packingStartTime),
          payFristTime: this.handlenTime(values.payFristTime),
          payLastTime: this.handlenTime(values.payLastTime),
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getUtilList({
            current:1,
            buildingId: this.props.detail.buildingId,
            heId: this.props.detail.heId,
          })
          this.props.onCancel()
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    
    console.log(this.state.isFix)

    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="房间展示编号" hasFeedback>
            {getFieldDecorator('showBouseCode', {
              initialValue: detail.showBouseCode,
              rules: [
                {
                  required: true,
                  message: '填写房间展示编号!',
                }
              ],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="建筑面积" hasFeedback>
            {getFieldDecorator('houseArea', {
              initialValue: detail.houseArea,
              rules: [
                {
                  required: true,
                  message: '填写建筑面积!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="室内面积" hasFeedback>
            {getFieldDecorator('indoorArea', {
              initialValue: detail.indoorArea
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="公摊面积" hasFeedback>
            {getFieldDecorator('poolArea', {
              initialValue: detail.poolArea
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="交房时间" hasFeedback>
            {getFieldDecorator('deliversTime', {
              initialValue: detail && detail.deliversTime?moment(detail.deliversTime):null,
            })(<DatePicker />)}
          </Form.Item>
          <Divider><Text mark >其他信息</Text></Divider>
          <Form.Item label="开始缴费时间" hasFeedback>
            {getFieldDecorator('payFristTime', {
              initialValue: detail && detail.heHouseInfo.payFristTime?moment(detail.heHouseInfo.payFristTime):null,
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="最近缴费时间" hasFeedback>
            {getFieldDecorator('payLastTime', {
              initialValue: detail && detail.heHouseInfo.payLastTime?moment(detail.heHouseInfo.payLastTime):null,
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="是否装修" hasFeedback>
            {getFieldDecorator('packingStatus', {
              initialValue: detail?String(detail.heHouseInfo.packingStatus):"",
            })(
              <Select onChange={(val)=>this.setState({isFix: val})} >
                <Option value="0">未装修</Option>
                <Option value="1">装修中</Option>
                <Option value="2">已装修</Option>
              </Select>
            )}
          </Form.Item>
          {this.state.isFix=="0"?null:
          <Form.Item label="开始装修时间" hasFeedback>
            {getFieldDecorator('packingStartTime', {
              initialValue: detail && detail.heHouseInfo.packingStartTime?moment(detail.heHouseInfo.packingStartTime):null,
            })(<DatePicker />)}
          </Form.Item>}
          {this.state.isFix=="0"?null:
          <Form.Item label="装修结束时间" hasFeedback>
            {getFieldDecorator('packingEndTime', {
              initialValue: detail && detail.heHouseInfo.packingEndTime?moment(detail.heHouseInfo.packingEndTime):null,
            })(<DatePicker />)}
          </Form.Item>}
          {this.state.isFix=="0"?null:
          <Form.Item label="装修说明" hasFeedback>
            {getFieldDecorator('packingInfo', {
              initialValue: detail && detail.heHouseInfo.packingInfo?detail.heHouseInfo.packingInfo:'',
            })(<TextArea />)}
          </Form.Item>}
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editRoom, getUtilList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(RoomEdit) )