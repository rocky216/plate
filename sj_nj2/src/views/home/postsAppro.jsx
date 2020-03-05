import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, Row, Col, Radio } from "antd";
import {approvalStaffPosts, getWorkBenchQuitList} from "@/actions/appAction"

const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

class PostsAppro extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.approvalStaffPosts({
          id: this.props.detail.id,
          isPass: values.isPass,
          approveOpinion: values.approveOpinion
        }, res=>{
          this.props.actions.getWorkBenchQuitList({})
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
        width={1000}
        title="调岗审批"
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Row>
            <Col span={12}>
              <Form.Item label="调岗人员" hasFeedback>
                {getFieldDecorator('name', {
                  initialValue: detail.name
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="申请人" hasFeedback>
                {getFieldDecorator('applyName',{
                  initialValue: detail.applyName
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="原组织机构" >
                {getFieldDecorator('oldOrganName',{
                  initialValue: detail.oldOrganName
                })(
                  <Input disabled />
                )}
              </Form.Item>
              <Form.Item label="审批意见" >
                {getFieldDecorator('isPass',{
                  rules: [{required: true, message: '审批意见不能为空！'}],
                })(
                  <Radio.Group >
                    <Radio value="1">批准</Radio>
                    <Radio value="0">不批准</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="调岗日期" hasFeedback>
                {getFieldDecorator('transferPositionTime',{
                  initialValue: detail.transferPositionTime
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="申请时间" hasFeedback>
                {getFieldDecorator('applyTime',{
                  initialValue: detail.applyTime
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="新组织机构" >
                {getFieldDecorator('objectiveAllDeptNameStr',{
                  initialValue: detail.objectiveAllDeptNameStr
                })(
                  <Input disabled />
                )}
              </Form.Item>
              <Form.Item label="审批内容" hasFeedback>
                {getFieldDecorator('approveOpinion', {
                  rules: [{required: true, message: '审批内容不能为空！'}],
                })(
                  <TextArea/>
                )}
              </Form.Item>
            </Col>
          </Row>
          
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({approvalStaffPosts, getWorkBenchQuitList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(PostsAppro)) )