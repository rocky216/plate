import React from 'react';
import "./index.less"
import { Button, Card, Form, Input, Image} from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ReconnectingWebSocket from 'reconnecting-websocket';


class Login extends React.Component {

  componentDidMount(){
    // var a:any =  window;
    console.log( window as any )
    // console.log(a )
  } 

  getWechatCode(){
  //   var obj = new WxLogin({
  //     id:"login_container",//div的id
  //     appid: "wxb919df64cf99687a",
  //     scope: "snsapi_login",//写死
  //     redirect_uri:encodeURI("http://zlwj.jiajgou.com/wx/callback") ,
  //     state: "",
  //     style: "black",//二维码黑白风格
  //     href: ""
  // })
   
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

  

  render() {
    return (
       <div className="loginpage" style={{background: 'url("/images/log_bj.svg")'}}>
         {/* <WxLogin
          appid="wxb919df64cf99687a"
          scope="snsapi_login"
          redirect_uri={encodeURI("http://zlwj.jiajgou.com/wx/callback")}
         /> */}
         <div style={{paddingTop:100}}>
         <div className="logo">
           <Image src="/images/logo.png" preview={false} width={200} />
         </div>
          <Card className="loginBox" bordered={false}>
            <Form>
              <Form.Item>
                <Input prefix={<UserOutlined />}  size="large" placeholder="用户名/手机号" />
              </Form.Item>
              <Form.Item>
                <Input prefix={<LockOutlined />}  size="large" placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Button size="large" block type="primary">登录</Button>
              </Form.Item>
            </Form>
          </Card>
         </div>
       </div>
    );
  }
}


export default Login;