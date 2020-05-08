import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Select} from "antd";
import {addCompanyCallbackUrl, getCompanyCallbackUrl} from "@/actions/companyAction"


const {Option} = Select

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

class AddCompanyCallbackUrl extends React.Component {
  

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addCompanyCallbackUrl({
          ...values,
          companyId: this.props.match.params.id
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCompanyCallbackUrl({companyId: this.props.match.params.id})
        })
      }
    })
  }
  

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, arg} = this.props
    
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
          <Form.Item label="编码" hasFeedback>
            {getFieldDecorator('callbackParamCode', {
              rules: [
                {
                  required: true,
                  message: '编码!',
                }
              ],
            })(
              <Select>
                {arg?arg.map(item=>(
                  <Option key={item.callbackParamCode} key={item.callbackParamCode} >{item.callbackParamCode}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="回调URL" hasFeedback>
            {getFieldDecorator('callbackUrl', {
              rules: [
                {
                  required: true,
                  message: '回调URL!',
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
    actions: bindActionCreators({addCompanyCallbackUrl, getCompanyCallbackUrl,}, dispatch)
  }
}

function mapStateProps(state){
  return {
    arg: state.dict.arguments,
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddCompanyCallbackUrl)) )