import React from "react"
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import "./style.less"


class Login extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps){
    
  }

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push("/")
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form

    return (
      <div className="login">
        <div className="login_box">
          <Card title="用户登录">
            <img className="login_logo" src="/images/login_logo.png"  />
            <Form onSubmit={this.handlenSubmit.bind(this)}>
              <Form.Item>
                {getFieldDecorator('用户名', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('密码', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)}
                <p>
                <Button size="large" type="primary" htmlType="submit">登录</Button>
                </p>
                
              </Form.Item>
            </Form>
          </Card>
        </div>
        
      </div>
    )
  }
}

export default Form.create()(Login)