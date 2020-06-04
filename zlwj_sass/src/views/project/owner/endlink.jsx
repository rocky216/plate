import React from "react"
import {connect} from "react-redux"
import {withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, DatePicker} from "antd";
import {removeOwnersLink, getOwners} from "@/actions/projectAction"
import moment from "moment"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EndLink extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {linkType, linkId} = this.props.detail
        this.props.actions.removeOwnersLink({
          assetType: linkType,
          linkId: linkId,
          endTime: moment(values.endTime).format("YYYY-MM-DD")
        }, res=>{
          this.props.actions.getOwners({id: this.props.match.params.id})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    console.log(detail, "As")
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
          <Form.Item label="开始关联时间" hasFeedback>
            {getFieldDecorator('startTime', {
              initialValue: detail.startTime?moment(detail.startTime):null,
              rules: [
                {
                  required: true,
                  message: '开始关联时间!',
                }
              ],
            })(<DatePicker disabled />)}
          </Form.Item>
          <Form.Item label="结束关联时间" hasFeedback>
            {getFieldDecorator('endTime', {
              rules: [
                {
                  required: true,
                  message: '结束关联时间!',
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({removeOwnersLink, getOwners}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default  withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EndLink)) )