import React from "react"
import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber} from "antd";
import {editSign, getSignList} from "@/actions/systemAction"

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

class EditSign extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        values = _.omit(values, "signId")
        this.props.actions.editSign({
          id: this.props.detail.id,
          ...values,
        }, res=>{
          this.props.actions.getSignList({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    
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
          <Form.Item label="签名ID" hasFeedback>
            {getFieldDecorator('signId', {
              initialValue: detail.signId,
              rules: [
                {
                  required: true,
                  message: '填写签名ID!',
                }
              ],
            })(<InputNumber disabled style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="签名名称" hasFeedback>
            {getFieldDecorator('signName', {
              initialValue: detail.signName,
              rules: [
                {
                  required: true,
                  message: '填写项目编号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editSign, getSignList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditSign)) )