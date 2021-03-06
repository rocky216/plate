import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import "./style.less"
import {goLogin} from "@/actions/appAction"


class Login extends React.Component {

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.goLogin(values, res=>{
          setTimeout(()=>{
            this.props.history.push("/")
            this.props.utils.OpenNotification("success", "登录成功！")
          },100)
        })
        
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
                {getFieldDecorator('username', {
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
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input.Password 
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary" htmlType="submit">登录</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({goLogin}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Login) )