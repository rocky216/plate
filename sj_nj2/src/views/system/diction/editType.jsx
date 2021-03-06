import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch } from "antd";
import {editDictData, getDictData} from "@/actions/systemAction"

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

class EditType extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editDictData({
          ...values,
          dictTypeId: this.props.match.params.id,
          id: this.props.detail.id,
          status: values.status?"0":"1"
        }, res=>{
          this.props.actions.getDictData({dictTypeId: this.props.match.params.id})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
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
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="字典值名称" hasFeedback>
            {getFieldDecorator('dictName', {
              initialValue: detail.dictName,
              rules: [
                {
                  required: true,
                  message: '填写项目名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="字典key" hasFeedback>
            {getFieldDecorator('dictKey', {
              initialValue: detail.dictKey,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="字典分组" hasFeedback>
            {getFieldDecorator('dictGroup', {
              initialValue: detail.dictGroup,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="字典排序" hasFeedback>
            {getFieldDecorator('dictSort', {
              initialValue: detail.dictSort,
              rules: [
                {
                  required: true,
                  message: '填写字典key!',
                }
              ],
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="状态" >
            {getFieldDecorator('status', {
              initialValue: detail.status=="0"?true:false,
              valuePropName: "checked",
              rules: [
                {
                  required: true,
                  message: '状态!',
                }
              ],
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="备注" >
            {getFieldDecorator('remark', {
              initialValue: detail.remark,
            })(<TextArea autoSize={{minRows: 3}} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editDictData, getDictData}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditType)) )