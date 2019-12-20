import React from "react"
import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber} from "antd";
import {editMesTemplate, getMesTemplate} from "@/actions/systemAction"

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

class EditMegtem extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        values = _.omit(values, "templateId")
        this.props.actions.editMesTemplate({
          ...values,
          id: this.props.detail.id
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
    const {spinning, visible, onCancel, detail} = this.props
    console.log(detail, "detail")
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
              initialValue: detail.templateId,
              rules: [
                {
                  required: true,
                  message: '填写模板ID!',
                }
              ],
            })(<InputNumber disabled style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="模板名称" hasFeedback>
            {getFieldDecorator('templateName', {
              initialValue: detail.templateName,
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
              initialValue: detail.templateContent,
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
              initialValue: detail.templateVarNum,
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
    actions: bindActionCreators({editMesTemplate, getMesTemplate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditMegtem)) )