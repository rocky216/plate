import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber} from "antd";
import {addCompany, getCompany} from "@/actions/companyAction"



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

class AddCompany extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addCompany({
          ...values,
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCompany({})
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
          <Form.Item label="公司名称" hasFeedback>
            {getFieldDecorator('companyName', {
              rules: [
                {
                  required: true,
                  message: '填写公司名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="公司编号" hasFeedback>
            {getFieldDecorator('companyCode', {
              rules: [
                {
                  required: true,
                  message: '填写编码!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="联系方式" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '填写联系方式!',
                }
              ],
            })(<InputNumber style={{width:"100%"}} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addCompany, getCompany}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddCompany))