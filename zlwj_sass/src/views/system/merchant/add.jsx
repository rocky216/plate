import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {addMerchant, merchantList} from "@/actions/systemAction"

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

class AddMerchant extends React.Component {
  handlenSubmit(){
    const {detail} = this.props
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addMerchant({
          ...values,
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.merchantList({})
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
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}>
        <Form {...formItemLayout}>
          <Form.Item label="应用名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '填写应用名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="应用Key" hasFeedback>
            {getFieldDecorator('skey', {
              rules: [
                {
                  required: true,
                  message: '填写应用Key!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="应用Secret" hasFeedback>
            {getFieldDecorator('secret', {
              rules: [
                {
                  required: true,
                  message: '填写应用Secret!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="商户名称" hasFeedback>
            {getFieldDecorator('mchName', {
              rules: [
                {
                  required: true,
                  message: '填写商户名称!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="商户号ID" hasFeedback>
            {getFieldDecorator('mchId', {
              rules: [
                {
                  required: true,
                  message: '填写商户号ID!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="商户号Key" hasFeedback>
            {getFieldDecorator('mchKey', {
              rules: [
                {
                  required: true,
                  message: '填写商户号Key!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="商户号Secret" hasFeedback>
            {getFieldDecorator('mchSecret', {
              rules: [
                {
                  required: true,
                  message: '填写商户号Secret!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="类别" hasFeedback>
            {getFieldDecorator('type', {
              initialValue: "1",
              rules: [
                {
                  required: true,
                  message: '填写类别!',
                }
              ],
            })(
              <Select>
                <Option value="1">微信小程序</Option>
                <Option value="2">微信APP</Option>
                <Option value="3">支付宝小程序</Option>
                <Option value="4">支付宝APP</Option>
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
    actions: bindActionCreators({addMerchant, merchantList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddMerchant) )