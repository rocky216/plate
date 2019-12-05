import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {addTheme, getThemeList} from "@/actions/otherAction"

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

class AddTheme extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addTheme({
          ...values,
        }, res=>{
          this.props.actions.getThemeList({})
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
          <Form.Item label="主题名称" hasFeedback>
            {getFieldDecorator('themeName', {
              rules: [
                {
                  required: true,
                  message: '填写主题名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="主题描述" hasFeedback>
            {getFieldDecorator('themeText', {
              rules: [
                {
                  required: true,
                  message: '填写主题描述!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="主题名称" hasFeedback>
            {getFieldDecorator('themeName', {
              rules: [
                {
                  required: true,
                  message: '填写主题名称!',
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
    actions: bindActionCreators({addTheme, getThemeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddTheme))