import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {addArguments, getArguments} from "@/actions/dictAction"



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

class AddArgumentsDict extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addArguments({
          ...values,
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getArguments({})
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
          <Form.Item label="名称" hasFeedback>
            {getFieldDecorator('callbackParamName', {
              rules: [
                {
                  required: true,
                  message: '名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="编码" hasFeedback>
            {getFieldDecorator('callbackParamCode', {
              rules: [
                {
                  required: true,
                  message: '编码!',
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
    actions: bindActionCreators({addArguments, getArguments}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddArgumentsDict))