import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card,Form,Button,Select,InputNumber,Icon,Row,Col
} from "antd"
import {addPlateConfig, getPlateConfigList} from "@/actions/parkAction"
import {OpenNotification} from "@/utils"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class AddPlateConfig extends React.Component {

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.addPlateConfig(values, res=>{
          OpenNotification("success")
          this.props.history.push("/park/plateconfig")
          this.props.actions.getPlateConfigList({})
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form

    return (
      <Card
        size="small"
        title="添加车牌识别配置"
      >
        <Row>
          <Col span={12}>
            <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)} >
              <Form.Item label="车位数量">
                {getFieldDecorator('carNum', {
                  rules: [{required: true, message: '车位数量不能为空！' }],
                })(
                  <InputNumber/>
                )}
              </Form.Item>
              <Form.Item label="没车位时是否控制外来车辆">
                {getFieldDecorator('foreignControl', {
                  initialValue: "1",
                  rules: [{required: true, message: '没车位时是否控制外来车辆!' }],
                })(
                  <Select>
                    <Option value="0">没车位也允许</Option>
                    <Option value="1">没车位时不允许</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}>
                <Button type="primary" htmlType="submit" className="mgr10">保存</Button>
                <Button><Link to="/park/plateconfig"><Icon type="close" />取消</Link></Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addPlateConfig, getPlateConfigList}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddPlateConfig))