import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, DatePicker, Select} from "antd";
import {getProcessList, addQuitStaff, getStaff} from "@/actions/personAction"
import moment from "moment"

const {TextArea} = Input
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

class AddQuit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      processList: []
    }
  }
  componentDidMount(){
    this.props.actions.getProcessList({
      flowType: "4",
      flowOrganId: this.props.detail.mDeptId
    }, res=>{
      this.setState({processList: res})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addQuitStaff({
          ...values,
          employeeId: this.props.detail.id,
          quitTime: moment(values.quitTime).format("YYYY-MM-DD")
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getStaff({current: 1})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    const {processList} = this.state

    console.log(processList, "detail")
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
          <Form.Item label="离职人员" hasFeedback>
            {getFieldDecorator('name1', {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '填写项目名称!',
                }
              ],
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="离职时间" hasFeedback>
            {getFieldDecorator('quitTime', {
              rules: [
                {
                  required: true,
                  message: '离职时间!',
                }
              ],
            })(<DatePicker  />)}
          </Form.Item>
          <Form.Item label="离职类型" hasFeedback>
            {getFieldDecorator('quitType', {
              rules: [
                {
                  required: true,
                  message: '离职类型!',
                }
              ],
            })(
              <Select style={{width: "100%"}}>
                <Option value="3">主动离职</Option>
                <Option value="4">被动离职</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="离职流程模板" hasFeedback>
            {getFieldDecorator('flowTemplateId', {
              rules: [
                {
                  required: true,
                  message: '离职流程模板!',
                }
              ],
            })(
              <Select style={{width: "100%"}}>
                {processList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.flowName}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="离职原因" hasFeedback>
            {getFieldDecorator('quitReason', {
              rules: [
                {
                  required: true,
                  message: '填写离职原因!',
                }
              ],
            })(<TextArea autoSize={{minRows: 3}} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({ getProcessList, addQuitStaff, getStaff}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.person.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddQuit)) )