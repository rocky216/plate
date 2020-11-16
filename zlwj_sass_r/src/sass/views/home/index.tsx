import React from "react"


class HomePage extends React.Component {
  componentDidMount(){
    this.goWeChatLogin()
  }
  goWeChatLogin(){
    new (window as any).WxLogin
    ({
        id:"login_container",//div的id
        appid: "wxb919df64cf99687a",
        scope: "snsapi_login",//写死
        redirect_uri:encodeURI("http://zlwj.jiajgou.com/wx/callback") ,
        state: "",
        style: "black",//二维码黑白风格
        href: ""
    });
  }

  render() {
    return (
      <div>
        HomePage
        <div id="login_container"></div>
      </div>
    );
  }
}

export default HomePage