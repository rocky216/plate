import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Button,
  Card,
  Icon
} from "antd"
import JCard from "@/components/JCard"
import {addAccount, getAccountList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"

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

class AddAccount extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.password !== values.repassword){
          OpenNotification("error", "两次密码不一致！")
          return
        }
        this.props.actions.addAccount(values, res=>{
          OpenNotification("success")
          this.props.history.push("/project/account")
          this.props.actions.getAccountList({})
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const { } = this.props

    return (
      <Card
        size="small"
        title="添加账户"
      >
        <Row>
          <Col span={10}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} >
              <Form.Item label="用户名">
                {getFieldDecorator("account",{
                  rules: [{ required: true, message: '用户名不能为空!' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: '密码不能为空!' }],
                })(
                  <Input.Password/>
                )}
              </Form.Item>
              <Form.Item label="确认密码">
                {getFieldDecorator("repassword")(
                  <Input.Password  />
                )}
              </Form.Item>
              <Form.Item label="验证码">
                <Row>
                  <Col span={12}>
                  {getFieldDecorator("code")(
                    <InputNumber style={{width: "100%"}}/>
                  )}
                  </Col>
                  <Col>
                    <Button className="mgl10" type="primary">获取验证码</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item wrapperCol={{
                  xs: { span: 12, offset: 0 },
                  sm: { span: 16, offset: 4 },
                }} >
                <Button htmlType="submit" className="mgr10" type="primary" ><Icon type="save" />保存</Button>
                <Button><Link to="/project/account"><Icon type="close" />取消</Link></Button>
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
    actions: bindActionCreators({addAccount, getAccountList}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddAccount))