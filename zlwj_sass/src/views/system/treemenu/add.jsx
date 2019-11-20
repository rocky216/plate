import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber} from "antd";
import {addTreeMenu, getTreeMenuList} from "@/actions/systemAction"

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

class AddMenu extends React.Component {
  handlenSubmit(){
    const {detail} = this.props
    this.props.form.validateFieldsAndScroll((err, values)=>{
      this.props.actions.addTreeMenu({
        ...values,
        parentId: detail?detail.id:0
      }, res=>{
        this.props.utils.OpenNotification("success")
        this.props.onCancel()
        this.props.actions.getTreeMenuList({})
      })
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {visible, onCancel, detail} = this.props
    return (
      <Modal 
        destroyOnClose
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}>
        <Form {...formItemLayout}>
          <Form.Item label="菜单名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '填写菜单名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
        <Form {...formItemLayout}>
          <Form.Item label="菜单Key值" hasFeedback>
            {getFieldDecorator('key', {
              rules: [
                {
                  required: true,
                  message: '填写菜菜单Key值!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addTreeMenu, getTreeMenuList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddMenu) )