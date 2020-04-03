import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, InputNumber} from "antd";
import {oneCardSystemRecharge, getOneCardSystem} from "@/actions/otherAction"
import SearchHouse from "@/components/SearchHouse"

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

class Recharge extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.oneCardSystemRecharge({
          ...values,
          id:this.props.detail.id,
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getOneCardSystem({current: 1})
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
        title="一卡通充值"
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="充值金额" hasFeedback>
            {getFieldDecorator('rechargeAmount', {
              rules: [
                {
                  required: true,
                  message: '充值金额!',
                }
              ]
            })(<InputNumber  style={{width: "100%"}} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({oneCardSystemRecharge, getOneCardSystem}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Recharge))