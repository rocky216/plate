import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {editOperative, getOperative} from "@/actions/manageAction"

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

class EditOperative extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editOperative({
          ...values,
          id: this.props.detail.id
        }, res=>{
          this.props.actions.getOperative({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible,detail, onCancel} = this.props
    
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
          <Form.Item label="合作商名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '填写合作商名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="合作商编码" hasFeedback>
            {getFieldDecorator('code', {
              initialValue: detail.code,
              rules: [
                {
                  required: true,
                  message: '填写合作商编码!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="合作商联系方式" hasFeedback>
            {getFieldDecorator('phone', {
              initialValue: detail.phone,
              rules: [
                {
                  required: true,
                  message: '填写合作商联系方式!',
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
    actions: bindActionCreators({editOperative, getOperative}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.manage.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditOperative))