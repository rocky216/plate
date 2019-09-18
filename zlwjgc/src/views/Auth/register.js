import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container, 
  Text,
  Card,
  Form,
  Item,
  Input,
  Button,
  Content
} from "native-base"
import {getCode, userRegister} from "@/actions/appAction"
import {ToastTip} from "@/utils"


class Register extends React.Component {
  static navigationOptions = {
    title: "注册"
  }
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      password: '',
      repassword: '',
      code: '',
    }
  }

  getCode(){
    const {phone, password, repassword, code} = this.state
    if(!phone){
      ToastTip("danger", "手机号不能为空！")
      return 
    }
    this.props.actions.getCode({
      url: "/user/member/sendCode",
      body: {
        phone,
        type: "regist"
      }
    })
  }

  handlenRegister(){
    const {phone, password, repassword, code} = this.state
    if(!phone){
      ToastTip("danger", "手机号不能为空！")
      return 
    }
    if(!password){
      ToastTip("danger", "密码不能为空！")
      return 
    }
    if(password !== repassword){
      ToastTip("danger", "两次密码不一致！")
      return 
    }
    if(!code){
      ToastTip("danger", "验证码不能为空！")
      return 
    }
    this.props.actions.userRegister({
      url: "/user/member/regist",
      body: {
        phone, password, repassword, code
      }
    }, res=>{
      this.props.navigation.navigate("Login")
    })
  }

  render(){
    return (
      <Container>
        <Content style={{margin: 10}}>
          <Card >
            <Form>
              <Item>
                <Input placeholder="手机号码" onChangeText={(val)=>this.setState({phone: val})} />
              </Item>
              <Item>
                <Input placeholder="密码" secureTextEntry onChangeText={(val)=>this.setState({password: val})} />
              </Item>
              <Item>
                <Input placeholder="确认密码" secureTextEntry onChangeText={(val)=>this.setState({repassword: val})} />
              </Item>
              <Item>
                <Input placeholder="验证码" onChangeText={(val)=>this.setState({code: val})} />
                <Button small style={{marginRight:10}} onPress={this.getCode.bind(this)}>
                  <Text>发送验证码</Text>
                </Button>
              </Item>
            </Form>
            <Button onPress={this.handlenRegister.bind(this)} full style={{marginTop: 30, marginLeft: 10, marginRight:10, marginBottom: 20}}>
              <Text>注册</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCode, userRegister}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Register)