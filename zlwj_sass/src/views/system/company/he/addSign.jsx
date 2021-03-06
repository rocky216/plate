import React from "react"
import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Select} from "antd";
import {getMesTemplate, getSignList, addHeLinkMsg, getHeList} from "@/actions/systemAction"

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

class AddSign extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      signList: [],
      msgtem: []
    }
  }

  componentDidMount(){
    this.props.actions.getSignList({pageSize: 1000}, res=>this.setState({signList: res.list}))
    this.props.actions.getMesTemplate({pageSize: 1000}, res=>this.setState({msgtem: res.list}))
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addHeLinkMsg({
          ...values,
          heId: this.props.detail.id
        }, res=>{
          this.props.actions.getHeList({
            companyId: this.props.match.params.id
          })
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    const {signList, msgtem} = this.state
    
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
          <Form.Item label="短信签名" hasFeedback>
            {getFieldDecorator('signId', {
              rules: [
                {
                  required: true,
                  message: '选择短信签名!',
                }
              ],
            })(
              <Select>
                {signList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.signName}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="短信模板" hasFeedback>
            {getFieldDecorator('templateId', {
              rules: [
                {
                  required: true,
                  message: '选择项目编号!',
                }
              ],
            })(
              <Select>
                {msgtem.map(item=>(
                  <Option key={item.id} value={item.id}>{item.templateName}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getMesTemplate, getSignList, addHeLinkMsg, getHeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddSign)) )