import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Form, Icon, Input, Button, Checkbox, Card, Row, Col} from 'antd';
import "./style.less"
import {getVerifyCodeImg, goLogin} from "@/actions/appAction"


class Login extends React.Component {
  constructor(props){
    super(props)
    window._navigation = props.history
    this.state = {
      imgUrl: '',
      verifyCodeId: ''
    }
  }

  UNSAFE_componentWillMount(){
    this.changeBase64()
  }

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.goLogin({
          ...values,
          verifyCodeId: this.state.verifyCodeId
        }, (res)=>{
          this.props.history.push("/")
          this.props.utils.OpenNotification("success")
        })
        
      }
    });
  }

  

  changeBase64(){
    this.props.actions.getVerifyCodeImg({}, (res)=>{
      this.setState({imgUrl: res.base64, verifyCodeId: res.verifyCodeId})
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning } = this.props
    const {imgUrl} = this.state

    return (
      <div className="login">
        <div className="login_box">
          <Card title="用户登录">
            <img className="login_logo" src="/images/login_logo.png"  />
            <Form onSubmit={this.handlenSubmit.bind(this)}>
              <Form.Item>
                {getFieldDecorator('account', {
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
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('verifyCode', {
                  rules: [{ required: true, message: '请输入图片验证码!' }],
                })(
                  <Row>
                    <Col span={12}>
                      <Input
                        size="large"
                        prefix={<Icon type="appstore" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="图片验证"
                      />
                    </Col>
                    <Col span={12}>
                      <img onClick={this.changeBase64.bind(this)} style={{height:40}}  className="mgl10" src={'data:image/jpeg;base64,'+imgUrl} />
                    </Col>
                  </Row>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)}
                <p>
                <Button size="large" type="primary" htmlType="submit" loading={spinning} >登录</Button>
                </p>
                
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
    actions: bindActionCreators({getVerifyCodeImg, goLogin}, dispatch)
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Login))