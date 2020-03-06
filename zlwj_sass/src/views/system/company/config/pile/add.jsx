import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {addPile, getPileList} from "@/actions/systemAction"

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

class AddPile extends React.Component {
  handlenSubmit(){
    const {detail} = this.props
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addPile({
          ...values,
          heId: this.props.heId
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getPileList({heId: this.props.heId})
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
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}>
        <Form {...formItemLayout}>
          <Form.Item label="配置类别" hasFeedback>
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '配置类别!',
                }
              ],
            })(
              <Select>
                <Option value="1">小程序</Option>
                <Option value="2">充电卡</Option>
                <Option value="3">智联万家</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="分钟" hasFeedback>
            {getFieldDecorator('minute', {
              rules: [
                {
                  required: true,
                  message: '分钟!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="金额" hasFeedback>
            {getFieldDecorator('money', {
              rules: [
                {
                  required: true,
                  message: '金额!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="是否支持退款" hasFeedback>
            {getFieldDecorator('isRefund', {
              rules: [
                {
                  required: true,
                  message: '是否支持退款!',
                }
              ],
            })(
              <Select style={{width: "100%"}} >
                <Option value="1">支持</Option>
                <Option value="2">不支持</Option>
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
    actions: bindActionCreators({addPile, getPileList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddPile) )