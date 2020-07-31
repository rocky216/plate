import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, DatePicker, Upload, InputNumber, Select} from "antd";
import {addFixPlanDeposit, getPlanInfo} from "@/actions/otherAction"
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

class AddDeposit extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      this.props.actions.addFixPlanDeposit({
        ...values,
        buildTimeOwner: moment(values.buildTimeOwner).format("YYYY-MM-DD"),
        planId: this.props.match.params.id,
        fixPlanNo: this.props.info.fixPlan.fixPlanNo
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
          <Form.Item label="押金金额" hasFeedback>
            {getFieldDecorator('depositMoney', {
              rules: [
                {
                  required: true,
                  message: '押金金额!',
                }
              ],
            })(<InputNumber style={{width: '100%'}} />)}
          </Form.Item>
          <Form.Item label="资金账户" hasFeedback>
            {getFieldDecorator('accountId', {
              rules: [
                {
                  required: true,
                  message: '资金账户!',
                }
              ],
            })(
              <Select>
                {accounts?accounts.map(item=>(
                  <Option key={item.id} value={item.id} >{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="押金说明" hasFeedback>
            {getFieldDecorator('depositInfo', {
              rules: [
                {
                  required: true,
                  message: '押金说明!',
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
    actions: bindActionCreators({addFixPlanDeposit, getPlanInfo}, dispatch)
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

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddDeposit)) );