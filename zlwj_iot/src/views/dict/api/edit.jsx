import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {editApi, getApiList} from "@/actions/dictAction"

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

class EditApi extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editApi({
          id: this.props.detail.id,
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
          <Form.Item label="请求路径" hasFeedback>
            {getFieldDecorator('requestUrl', {
              initialValue: detail.requestUrl,
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
              initialValue: detail.requestName,
              rules: [
                {
                  required: true,
                  message: '填写请求名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述" hasFeedback>
            {getFieldDecorator('remark', {
              initialValue: detail.remark,
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editApi, getApiList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditApi))