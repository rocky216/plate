import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch } from "antd";
import {getStaffAccount, addStaffAccount, editStaffAccount} from "@/actions/personAction"

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

class StaffAccount extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      account: "",
      isAdd: false
    }
  }

  componentDidMount(){
    this.props.actions.getStaffAccount({id: this.props.detail.id}, res=>{
      this.setState({account: res?res.account:this.props.detail.card, isAdd: res?false:true})
    })
  }
  

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        if(values.password !== values.repassword ){
          this.props.utils.OpenNotification("error","两次密码不一致！")
          return 
        }
        if(!this.state.isAdd){
          this.props.actions.editStaffAccount({
            id: this.props.detail.id,
            password: values.password,
            account: values.account
          }, res=>{
            this.props.onCancel()
            this.props.utils.OpenNotification("success")
          })
        }else{
          this.props.actions.addStaffAccount({
            employeeId: this.props.detail.id,
            ...values,
          }, res=>{
            this.props.onCancel()
            this.props.utils.OpenNotification("success")
          })
        }
        
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    const {account} = this.state
  
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
          <Form.Item label="账号" hasFeedback>
            {getFieldDecorator('account', {
              initialValue: account,
              rules: [
                {
                  required: true,
                  message: '填写账号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label=" 密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '填写密码!',
                }
              ],
            })(<Input.Password  />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('repassword', {
              rules: [
                {
                  required: true,
                  message: '确认密码!',
                }
              ],
            })(<Input.Password  />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaffAccount, addStaffAccount, editStaffAccount}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.person.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(StaffAccount)) )