import React from "react"
import {Row, Col, Card, Form, Input, Button, Icon, Checkbox, InputNumber} from "antd"


class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPhone: false
    }
  }

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(err, values)
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={13}>
          <div style={{background: "#ddd", height:"100vh"}}></div>
        </Col>
        <Col span={11}>
          <div style={{paddingTop:200, width: 500, margin: "auto"}}>
          <Card type="inner" title="用户登录"  extra={<span>
            {this.state.isPhone?<a href="#" onClick={()=>this.setState({isPhone: false})}>密码登录</a>
            :<a href="#" onClick={()=>this.setState({isPhone: true})}>手机登录</a>}
          </span>} >
            <Form style={{padding: '50px 20px'}} onSubmit={this.handlenSubmit.bind(this)} > 
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    size="large"
                    allowClear
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              
              {this.state.isPhone?<Form.Item>
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '请输入验证码！' }],
                    })(<InputNumber size="large" style={{width: 200}} />)}
                  </Col>
                  <Col span={12}>
                    <Button size="large">获取验证码</Button>
                  </Col>
                </Row>
              </Form.Item>
              :<Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }],
                })(
                  <Input
                    size="large"
                    allowClear
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>}
              
              <Form.Item>
                <Button block type="primary" htmlType="submit" size="large" >登录</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        </Col>
      </Row>
    )
  }
}

export default Form.create()(Login)