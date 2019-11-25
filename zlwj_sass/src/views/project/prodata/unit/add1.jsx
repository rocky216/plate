import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select, Card, Row, Col, Button, Divider, Typography} from "antd";
import {addUtil, getBuildList} from "@/actions/projectAction"

const {Option} = Select
const { Text } = Typography;

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

class AddUtil extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addUtil({
          ...values
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getBuildList({current:1})
          this.props.onCancel()
        })
      }
    })
  }

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    const { } = this.state
    
    return (
        <div>
          <Card size="small" title="初始化单元">
          <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)} >
            <Row>
              <Col xxl={4} lg={6}  md={6} >
                <Form.Item label="单元名称" hasFeedback>
                  {getFieldDecorator('unit_name', {
                    rules: [
                      {
                        required: true,
                        message: '填写单元名称!',
                      }
                    ],
                  })(
                    <div>
                      <InputNumber min={1}  style={{width: "70%"}} /><span>单元</span>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col xxl={4} lg={6} md={6}>
                <Form.Item label="单元编号" hasFeedback>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '填写单元编号!',
                      }
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xxl={4} lg={6} md={6}>
                <Form.Item label="展示编号" hasFeedback>
                  {getFieldDecorator('show_code', {
                    rules: [
                      {
                        required: true,
                        message: '填写展示编号!',
                      }
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xxl={4} lg={6} md={6}>
                <Form.Item label="是否有电梯" hasFeedback>
                  {getFieldDecorator('show_code', {
                    rules: [
                      {
                        required: true,
                        message: '填写展示编号!',
                      }
                    ],
                  })(
                    <Select>
                      <Option value="1">有电梯</Option>
                      <Option value="0">无电梯</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xxl={4} lg={6} md={6}>
                <Form.Item label="电梯数量" hasFeedback>
                  {getFieldDecorator('show_code', {
                    rules: [
                      {
                        required: true,
                        message: '填写电梯数量!',
                      }
                    ],
                  })(<InputNumber min={1} style={{width: "70%"}} />)}
                </Form.Item>
              </Col>
              <Col xxl={4} lg={6} md={6}>
                <Form.Item >
                  <Button type="primary" htmlType="submit" >生成楼层</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
          <Card className="mgt10" size="small" title="楼层/房间">
            <Row gutter={10}>
              <Col span={6} style={{display: "flex"}}>
                <Text>楼层编号</Text><Input size="small"  />
              </Col>
              <Col span={6}>
                <Input size="small" addonBefore="楼层展示编号"  />
              </Col>
              <Col span={6}>
                <InputNumber min={1} style={{width:"100%"}} size="small"  addonBefore="实际楼层数" />
              </Col>
              <Col span={6}>
                <InputNumber min={1} style={{width:"100%"}} size="small" addonBefore="系统楼层数" />
              </Col>
            </Row>
            <Divider><Text type="warning" >房间信息</Text></Divider>
            <Row gutter={10}>
              <Col span={6}  >
                <Card size="small" title="1号房间" >
                  <Row>
                    <Col>
                      <InputNumber addonBefore="房间名称" size="small" />
                    </Col>
                    <Col>
                      <InputNumber addonBefore="房间编号" size="small" />
                    </Col>
                    <Col>
                      <InputNumber addonBefore="建筑面积" size="small" />
                    </Col>
                    <Col>
                      <InputNumber addonBefore="室内面积" size="small" />
                    </Col>
                    <Col>
                      <InputNumber addonBefore="公摊面积" size="small" />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addUtil, getBuildList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()( AddUtil ) )