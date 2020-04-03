import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select} from "antd";
import {editOneCardSystem, getOneCardSystem} from "@/actions/otherAction"
import SearchHouse from "@/components/SearchHouse"

const {Option} = Select

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

class EditSolution extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editOneCardSystem({
          ...values,
          id: this.props.detail.id,
          ownerId: values.ownerId?values.ownerId.ownersId:""
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getOneCardSystem({current: 1})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    console.log(detail)

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
          <Form.Item label="IC卡" hasFeedback>
            {getFieldDecorator('icNumber', {
              initialValue: detail.icNumber
            })(<Input />)}
          </Form.Item>
          <Form.Item label="ID卡" hasFeedback>
            {getFieldDecorator('idNumber', {
              initialValue: detail.idNumber
            })(<Input />)}
          </Form.Item>
          <Form.Item label="卡类型" hasFeedback>
            {getFieldDecorator('cardType', {
              initialValue: detail.cardType,
              rules: [
                {
                  required: true,
                  message: '卡类型!',
                }
              ],
            })(
              <Select>
                <Option value="0">普通卡</Option>
                <Option value="1">工作卡</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="业主" >
            {getFieldDecorator('ownerId', {
              initialValue: detail.ownerId?{ownersId: detail.ownerId, 
                ownersName: detail.ownerName, ownersPhone: detail.ownerPhone}:"",
            })(<SearchHouse onlyHe />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editOneCardSystem, getOneCardSystem}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditSolution))