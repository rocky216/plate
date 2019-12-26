import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Timeline, Row, Col, Icon, Form, Input, Select, InputNumber, Button, List} from "antd";
import JCard from "@/components/JCard"
import "./index.less"
import {flowType} from "./data"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddProcess extends React.Component {
  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning} = this.props

    return (
      <JCard spinning={spinning}>
        <Row>
          <Col span={12}>
            <Card extra={(
              <div>
                <Button type="primary" >保存</Button>
                <Button className="mgl10" type="primary" ghost>预览</Button>
              </div>
            )}>
              <Form {...formItemLayout} >
            <Form.Item label="流程名称" hasFeedback>
              {getFieldDecorator('flowName', {
                rules: [
                  {
                    required: true,
                    message: '填写流程名称!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="流程类型" hasFeedback>
              {getFieldDecorator('flowType', {
                rules: [
                  {
                    required: true,
                    message: '流程类型!',
                  }
                ],
              })(
                <Select style={{width: "100%"}}>
                  {flowType.map(item=>(
                    <Option key={item.value} value={item.value}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="流程组织" hasFeedback>
              {getFieldDecorator('flowOrgan', {
                rules: [
                  {
                    required: true,
                    message: '填写流程组织!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="流程版本" hasFeedback>
              {getFieldDecorator('flowVersion', {
                rules: [
                  {
                    required: true,
                    message: '填写流程版本!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="添加流程节点" >
            </Form.Item>
          </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <div className="processBox" >
              <Timeline mode="alternate">
                <Timeline.Item dot={<div className="start">开始</div>}>
                  <div  style={{minHeight: 100}}></div>
                </Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '60px' }} />} >
                  <div style={{minHeight: 100}}></div>
                </Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '60px' }} />} >
                  <div style={{minHeight: 100}}></div>
                </Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '60px' }} />} >
                  <div style={{minHeight: 100}}></div>
                </Timeline.Item>
              </Timeline>
            </div>
            </Card>
          </Col>
        </Row>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddProcess) )