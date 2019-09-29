import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card,
  Button,
  Icon,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber
} from "antd"
import {addLeaseConfig, getLeaseConfigList} from "@/actions/parkAction"
import {OpenNotification} from "@/utils"


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

class AddRule extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      leaseModels: [
        {title: "天", value: "D"},
        {title: "星期", value: "W"},
        {title: "月", value: "M"},
        {title: "季", value: "S"},
        {title: "年", value: "Y"},
      ]
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addLeaseConfig({
          ...values,
          itemId: this.props.houseInfo.id
        },res=>{
          OpenNotification("success")
          this.props.history.push("/park/rule")
          this.props.actions.getLeaseConfigList({})
        })
      }
    });
  }
  getHouseInfo(attr){
    let data = localStorage.getItem("houseInfo")
    return JSON.parse(data)[attr]
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {houseInfo} = this.props
    const {leaseModels} = this.state

    return (
        <Card
          size="small"
          title="添加租赁规则"
        >
          <Row>
            <Col span={12}>
              <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="项目名称">
                  {getFieldDecorator('housingEstateName', {
                    initialValue: this.getHouseInfo("housingEstateName")
                  })(<Input disabled />)}
                </Form.Item>
                <Form.Item label="租赁模式">
                  {getFieldDecorator('leaseModel', {
                    rules: [
                      {
                        required: true,
                        message: '请选择租赁模式！',
                      },
                    ],
                  })(
                    <Select>
                      {leaseModels.map(item=>(
                        <Option key={item.value} value={item.value}>{item.title}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="区域金额">
                  {getFieldDecorator('money', {
                    rules: [
                      {
                        required: true,
                        message: '请填写区域金额！',
                      },
                    ],
                  })(
                    <InputNumber/>
                  )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 4 }} >
                  <Button className="mgr10" type="primary" htmlType="submit" >
                    <Icon type="save" />保存
                  </Button>
                  <Button><Link to="/park/rule/"><Icon type="close" />取消</Link></Button>
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
    actions: bindActionCreators({addLeaseConfig, getLeaseConfigList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    houseInfo: state.app.houseInfo
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddRule))