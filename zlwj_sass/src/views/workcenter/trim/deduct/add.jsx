import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, DatePicker, Upload, InputNumber, Select} from "antd";
import {addPlanTear, getPlanInfo} from "@/actions/otherAction"
import moment from "moment"

const {TextArea} = Input;
const {Option} = Select;

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

class AddDeduct extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      this.props.actions.addPlanTear({
        ...values,
        planId: this.props.match.params.id,
      }, res=>{
        this.props.utils.OpenNotification("success")
        this.props.callback();
        this.props.onCancel();
      })
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles, accounts} = this.props
    
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
          <Form.Item label="违约标题" hasFeedback>
            {getFieldDecorator('tearNo', {
              rules: [
                {
                  required: true,
                  message: '违约标题!',
                }
              ],
            })(<Input style={{width: '100%'}} />)}
          </Form.Item>
          <Form.Item label="扣费金额" hasFeedback>
            {getFieldDecorator('tearMoney', {
              rules: [
                {
                  required: true,
                  message: '扣费金额!',
                }
              ],
            })(<InputNumber style={{width: '100%'}} />)}
          </Form.Item>
          <Form.Item label="违约说明" hasFeedback>
            {getFieldDecorator('tearInfo', {
              rules: [
                {
                  required: true,
                  message: '违约说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addPlanTear, getPlanInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    accounts: state.other.accounts,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddDeduct)) );