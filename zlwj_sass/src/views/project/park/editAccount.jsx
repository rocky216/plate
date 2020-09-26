import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {editCarTempAccount, getCarTempAccount} from "@/actions/projectAction"

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

class EditAccountCar extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editCarTempAccount({
          ...values,
          id: this.props.detail.id,
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCarTempAccount({parkId: this.props.match.params.id})
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
          <Form.Item label="用户名" hasFeedback>
            {getFieldDecorator('userName', {
              initialValue: detail.userName,
              rules: [
                {
                  required: true,
                  message: '用户名!',
                }
              ],
            })(<Input  />)}
          </Form.Item>
          <Form.Item label="账号" hasFeedback>
            {getFieldDecorator('account', {
              initialValue: detail.account,
              rules: [
                {
                  required: true,
                  message: '账号!',
                }
              ],
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              initialValue: detail.password,
              rules: [
                {
                  required: true,
                  message: '密码!',
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
    actions: bindActionCreators({editCarTempAccount, getCarTempAccount}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditAccountCar)) )