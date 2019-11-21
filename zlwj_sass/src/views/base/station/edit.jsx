import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input} from "antd";
import {editStation, getStationList} from "@/actions/baseAction"

const { TextArea } = Input;

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

class EditStation extends React.Component {
  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        console.log(values)
        this.props.actions.editStation({
          ...values,
          id: this.props.detail.id
        }, res=>{
          this.props.actions.getStationList({})
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {visible, onCancel, spinning, detail} = this.props
    
    return (
      <Modal
        title="新增岗位"
        okText="确定"
        cancelText="取消"
        destroyOnClose
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout}>
          <Form.Item label="岗位名称" hasFeedback>
            {getFieldDecorator('jobName', {
              initialValue: detail.jobName,
              rules: [
                {
                  required: true,
                  message: '填写岗位名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="岗位编号" hasFeedback>
            {getFieldDecorator('jobCode', {
              initialValue: detail.jobCode,
              rules: [
                {
                  required: true,
                  message: '填写岗位编号!',
                }
              ],
            })(<Input  />)}
          </Form.Item>
          <Form.Item label="岗位描述" hasFeedback>
            {getFieldDecorator('jobDesc',{
              initialValue: detail.jobDesc,
            })(<TextArea rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editStation, getStationList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.base.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditStation) )