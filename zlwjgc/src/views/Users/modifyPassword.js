import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Footer,
  Button
} from "native-base"
import {getCode, changePwd} from "@/actions/appAction"
import {ToastTip } from "@/utils"


class ModifyPassword extends React.Component {
  static navigationOptions = {
    title: "修改密码"
  }

  constructor(props){
    super(props)
    this.state = {
      password: '',
      repassword: '',
      code: ''
    }
  }

  handlenSubmit(){
    const {code, password, repassword} = this.state
    if(!code){
      ToastTip("warning", "验证码不能为空！")
      return
    }
    if(!password){
      ToastTip("warning", "密码不能为空！")
      return
    }
    if(password != repassword){
      ToastTip("warning", "验证码不能为空！")
      return
    }
    this.props.actions.changePwd({
      url: "/user/member/changePwd",
      body: {
        phone: this.props.userInfo.phone,
        code,
        password,
        repassword
      }
    }, res=>{
      this.props.navigation.navigate("Users")
      ToastTip("success", "密码设置成功！")
    })
  }

  getCode(){
    this.props.actions.getCode({
      url: "/user/member/sendCode",
      body: {
        phone: this.props.userInfo.phone,
        type: "password"
      }
    })
  }

  render(){
    const {userInfo } = this.props

    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input value={userInfo.phone} placeholder="手机号" disabled />
            </Item>
            <Item>
              <Input placeholder="手机验证码" onChangeText={val=>this.setState({code: val})} />
              <Button onPress={this.getCode.bind(this)}>
                <Text>获取验证码</Text>
              </Button>
            </Item>
            <Item>
              <Input placeholder="设置密码" onChangeText={val=>this.setState({password: val})} />
            </Item>
            <Item>
              <Input placeholder="确认密码" onChangeText={val=>this.setState({repassword: val})} />
            </Item>
          </Form>
        </Content>
        <Footer>
          <Button transparent full light onPress={this.handlenSubmit.bind(this)}>
            <Text style={{fontSize: 16}}>保存</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCode, changePwd }, dispatch)
  }
}

function mapStateProps(state){
  return {
    userInfo: state.app.userInfo
  }
}

export default connect(mapStateProps, mapDispatchProps)(ModifyPassword)