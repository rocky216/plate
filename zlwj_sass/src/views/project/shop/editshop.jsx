import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Select, DatePicker } from "antd";
import {editAndUpdate, getShopList} from "@/actions/projectAction"
import moment from "moment"

const {Option} = Select
const {RangePicker} = DatePicker
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddShop extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      
      
      if(!err){
        let newValues = {
          shopsId: this.props.detail.id,
          ...values,
          payFristTime: moment(values.payFristTime).format("YYYY-MM-DD"),
          payLastTime: moment(values.payLastTime).format("YYYY-MM-DD"),
          packingStartTime: values.time.length?moment(values.time[0]).format("YYYY-MM-DD"):null,
          packingEndTime: values.time.length?moment(values.time[1]).format("YYYY-MM-DD"):null,
        }
        newValues = _.omit(newValues, "time")
        
        this.props.actions.editAndUpdate({
          ...newValues
        }, res=>{
          this.props.actions.getShopList({current: 1})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, projectitem, detail} = this.props
    
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
          <Form.Item label="第一次缴费时间" hasFeedback>
            {getFieldDecorator('payFristTime', {
              initialValue: detail && detail.heShopsInfo.payFristTime?moment(detail.heShopsInfo.payFristTime):null,
              rules: [
                {
                  required: true,
                  message: '填写第一次缴费时间!',
                }
              ],
            })(<DatePicker  />)}
          </Form.Item>
          <Form.Item label="最近一次缴费时间" hasFeedback>
            {getFieldDecorator('payLastTime', {
              initialValue: detail && detail.heShopsInfo.payLastTime?moment(detail.heShopsInfo.payLastTime):null,
              rules: [
                {
                  required: true,
                  message: '填写最近一次缴费时间!',
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="装修状态" hasFeedback>
            {getFieldDecorator('packingStatus', {
              initialValue: detail?String(detail.heShopsInfo.packingStatus):"",
              rules: [
                {
                  required: true,
                  message: '选择装修状态!',
                }
              ],
            })(
              <Select>
                <Option value="0">未装修</Option>
                <Option value="1">装修中</Option>
                <Option value="2">已装修</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="装修时间" hasFeedback>
            {getFieldDecorator('time', {
              initialValue: detail && detail.heShopsInfo.packingEndTime?
                  [moment(detail.heShopsInfo.packingStartTime),moment(detail.heShopsInfo.packingEndTime)]:[],
              rules: [{ type: 'array'}],
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item label="装修说明" hasFeedback>
            {getFieldDecorator('packingInfo', {
              initialValue: detail?detail.heShopsInfo.packingInfo:"",
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="房屋标记" hasFeedback>
            {getFieldDecorator('orderSign', {
              initialValue: detail?String(detail.heShopsInfo.orderSign):"",
            })(
              <Select>
                <Option value="0">无标记</Option>
                <Option value="1">有标记</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="标记信息" hasFeedback>
            {getFieldDecorator('signInfo', {
              initialValue: detail?detail.heShopsInfo.signInfo:"",
            })(<TextArea/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editAndUpdate, getShopList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddShop))