import React from "react"
import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber} from "antd";
import {addMesTemplate, getMesTemplate} from "@/actions/systemAction"

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

class AddMegtem extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addMesTemplate({
          ...values,
        }, res=>{
          this.props.actions.getMesTemplate({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    
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
          <Form.Item label="模板ID" hasFeedback>
            {getFieldDecorator('templateId', {
              rules: [
                {
                  required: true,
                  message: '填写模板ID!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="模板名称" hasFeedback>
            {getFieldDecorator('templateName', {
              rules: [
                {
                  required: true,
                  message: '填写模板名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="模板内容" hasFeedback>
            {getFieldDecorator('templateContent', {
              rules: [
                {
                  required: true,
                  message: '填写模板名称!',
                }
              ],
            })(<TextArea autoSize={{minRows: 3}} />)}
          </Form.Item>
          <Form.Item label="模板变量数" hasFeedback>
            {getFieldDecorator('templateVarNum', {
              rules: [
                {
                  required: true,
                  message: '填写模板变量数!',
                }
              ],
            })(<InputNumber min={0} style={{width:"100%"}} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addMesTemplate, getMesTemplate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddMegtem)) )