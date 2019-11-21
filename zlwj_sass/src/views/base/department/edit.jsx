import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, Switch} from "antd";
import {editTreeDept, getTreeDeptList} from "@/actions/baseAction"

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

class EditDept extends React.Component {
  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editTreeDept({
          ...values,
          status: values.status?"0":"1",
          id: this.props.detail.id
        },res=>{
          this.props.actions.getTreeDeptList({})
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
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
          <Form.Item label="部门名称" hasFeedback>
            {getFieldDecorator('deptName', {
              initialValue: detail.deptName,
              rules: [
                {
                  required: true,
                  message: '填写部门名称!',
                }
              ],
            })(<Input />)}
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
    actions: bindActionCreators({editTreeDept, getTreeDeptList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditDept) )