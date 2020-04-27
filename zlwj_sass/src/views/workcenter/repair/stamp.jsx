import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Icon, Select, Radio} from "antd";
import {processingRepair, getRepairList} from "@/actions/otherAction"

const {Option} = Select
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

class StampRepair extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.processingRepair({
          ...values,
          repairId:  this.props.detail.id,
        }, res=>{
          this.props.actions.getRepairList({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, detail} = this.props
    
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
          <Form.Item label="报修单名称" >
            {getFieldDecorator('processingState', {
              initialValue: detail.processingState
            })(
              <Radio.Group>
                <Radio value="1">处理中</Radio>
                <Radio value="2">已处理</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('info', {
              initialValue: detail.endInfo || detail.processingInfo
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({processingRepair, getRepairList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(StampRepair)) )