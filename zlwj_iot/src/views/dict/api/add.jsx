import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {addApi, getApiList} from "@/actions/dictAction"

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

class AddApi extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addApi({
          ...values,
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getApiList({})
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
          <Form.Item label="请求路径" hasFeedback>
            {getFieldDecorator('requestUrl', {
              rules: [
                {
                  required: true,
                  message: '填写请求路径!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="请求名称" hasFeedback>
            {getFieldDecorator('requestName', {
              rules: [
                {
                  required: true,
                  message: '填写请求名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述" hasFeedback>
            {getFieldDecorator('remark', {})(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addApi, getApiList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddApi))