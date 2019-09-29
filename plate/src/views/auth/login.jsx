import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Card, Form, Input, Button, Icon, Checkbox, InputNumber} from "antd"
import {login} from "@/actions/appAction"


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
      this.props.actions.login(values, res=>{
        this.props.history.push('/')
      })
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={16}>
          <div style={{background: "#ddd", height:"100vh"}}>
            <img 
            style={{width: "100%", height: "100%"}}
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569759068084&di=0a892399601977b99848e7018ec38f06&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4b77aa67bdab8b9f59040a406b7458293548741238307-WaTMGu_fw658" />
          </div>
        </Col>
        <Col span={8}>
          <div style={{paddingTop:200, width: 500, margin: "auto"}}>
          <Card type="inner" title="用户登录"  extra={<span>
            {this.state.isPhone?<a href="#" onClick={()=>this.setState({isPhone: false})}>密码登录</a>
            :<a href="#" onClick={()=>this.setState({isPhone: true})}>手机登录</a>}
          </span>} >
            <Form style={{padding: '50px 20px'}} onSubmit={this.handlenSubmit.bind(this)} > 
              <Form.Item>
                {getFieldDecorator('account', {
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

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({login}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Login) ) 