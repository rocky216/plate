import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Card, Form, Input, Button, Checkbox} from "antd"
import { FormInstance } from "antd/lib/form";
import "./index.less"
import {IProps} from "@/interface/app"
import {goLogin } from "@/actions/appAction"



const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};




class LoginPage extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();

  componentDidMount(){
    
  }

  onFinish(values:any){
    this.props.actions.goLogin({
      ...values
    }, (res:any)=>{
      this.props.history.push("/")
    })
    
  }

  render(){
    const {spinning } = this.props;
    
    return (
      <div className="loginpage">
        <Card title="用户登录">
          <Form
            size="large"
            {...layout}
            ref={this.formRef}
            name="login"
            initialValues={{ remember: true }}
            onFinish={this.onFinish.bind(this)}
          >
            <Form.Item label="用户名" name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={spinning} >登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch:any, ownProps: any) => {
  return {
    actions: bindActionCreators({goLogin}, dispatch)
  }
}

const mapStateToProps = (state:any, ownProps:any) => {
  
  return {
    spinning: state.app.spinning
  }
}


export default  connect(mapStateToProps, mapDispatchToProps)(LoginPage);