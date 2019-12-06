import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input} from "antd";
import {AddSysLibrary, getSysLibrary} from "@/actions/systemAction"

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

class AddItem extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.AddSysLibrary({
          ...values,
          dictId: this.props.detail.id
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getSysLibrary({current: 1})
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
          <Form.Item label="字典名称" hasFeedback>
            {getFieldDecorator('dictName', {
              rules: [
                {
                  required: true,
                  message: '填写字典名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="字典表名字段" hasFeedback>
            {getFieldDecorator('tableName', {
              rules: [
                {
                  required: true,
                  message: '填写字典表名字段!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="表名类型字段" hasFeedback>
            {getFieldDecorator('tableField', {
              rules: [
                {
                  required: true,
                  message: '填写表名类型字段!',
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
    actions: bindActionCreators({AddSysLibrary, getSysLibrary}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddItem))