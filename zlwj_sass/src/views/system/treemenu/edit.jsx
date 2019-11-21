import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Switch, Button} from "antd";
import {editTreeMenu, getTreeMenuList} from "@/actions/systemAction"

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


class EditMenu extends React.Component {
  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editTreeMenu({
          ...values,
          id: this.props.detail.id,
          status: values.status?"0":"1"
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getTreeMenuList({})
        })
      }
      
    })
  }
  render(){
    const {getFieldDecorator } = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    console.log(detail)
    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout}>
          <Form.Item label="菜单名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '填写菜单名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="菜单Key值" hasFeedback>
            {getFieldDecorator('key', {
              initialValue: detail.key,
              rules: [
                {
                  required: true,
                  message: '填写菜菜单Key值!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="是否启用" >
            {getFieldDecorator('status', {
              initialValue: detail.status=="0"?true:false,
              valuePropName: "checked"
            })(<Switch  />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editTreeMenu, getTreeMenuList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditMenu) )