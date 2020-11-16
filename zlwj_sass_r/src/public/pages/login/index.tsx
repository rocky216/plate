import React from 'react';
import "./index.less"
import { Button, Card, Form, Input, Image, Tabs, notification} from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ReconnectingWebSocket from 'reconnecting-websocket';
import {fetch, saveToken} from "@public/utils"


const {TabPane} = Tabs

interface IProps {
  history: any
}

class Login extends React.Component<IProps> {

  componentDidMount(){
    this.getsoket();
  }

  getWechatCode(){
    var obj = new (window as any).WxLogin
    ({
      id:"login_container",//div的id
      appid: "wxb919df64cf99687a",
      scope: "snsapi_login",//写死
      redirect_uri:encodeURI("http://zlwj.jiajgou.com/wx/callback") ,
      state: "",
      style: "black",//二维码黑白风格
      href: ""
  })
   
  }

  getsoket(){
    const rws = new ReconnectingWebSocket('ws://192.168.1.34:4960');
    rws.addEventListener('open', () => {
      rws.send('hello!');
    });
    rws.addEventListener("message", (value)=>{
      console.log(value.data, "asas")
    })
  }

  handleChange(key:string){
    if(key=="2"){
      this.getWechatCode()
    }
  }

  onFinish = async (values:any)=>{
    try{
      let data:any = await fetch({
        url:"/zlwj/api/system/user/login",
        method: "post",
        data: values
      })
      saveToken(data.token)
      this.props.history.push("/")
      
    }catch(e){
      console.log(e)
    }

  }
  

  render() {
    return (
       <div className="loginpage" style={{background: 'url("/images/log_bj.svg")'}}>
         
         <div style={{paddingTop:100}}>
         <div className="logo">
           <Image src="/images/logo.png" preview={false} width={200} />
         </div>
          <Card className="loginBox" bordered={false}>
            <Tabs
              onChange={this.handleChange.bind(this)}
            >
              <TabPane tab="账号登录" key="1" forceRender className="mgt15" >
                <Form onFinish={this.onFinish}>
                  <Form.Item
                    name="account"
                    rules={[{required: true, message: "请输入用户名！"}]}
                  >
                    <Input prefix={<UserOutlined />}  size="large" placeholder="用户名/手机号" />
                  </Form.Item>
                  <Form.Item 
                    name="password"
                    rules={[{required: true, message: "请输入密码！"}]}
                  >
                    <Input.Password prefix={<LockOutlined />}  size="large" placeholder="密码" />
                  </Form.Item>
                  <Form.Item>
                    <Button size="large" block type="primary" htmlType="submit" >登录</Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="扫码登录" key="2" forceRender className="mgt15" >
                <div id="login_container"></div>
              </TabPane>
            </Tabs>
            
          </Card>
         </div>
       </div>
    );
  }
}


export default Login;