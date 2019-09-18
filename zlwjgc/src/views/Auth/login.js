import React from "react"
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import {View, StyleSheet, Linking } from "react-native"
import {Container, Card, Form,Text, Input, Label, Item, Button} from "native-base"
import {handlenLogin } from "@/actions/appAction"
import {ToastTip, setStorage, getStorage} from "@/utils"
import JPushModule from 'jpush-react-native';

class Login extends React.Component {
  static navigationOptions = ({navigation})=>({
    title: "登录",
    headerRight: <Button transparent light onPress={()=>navigation.navigate("Register")}>
                  <Text style={{fontSize:16}}>注册</Text>
                </Button>
  })

  constructor(props){
    super(props)
    this.state = {
      phone: "",
      password: ""
    }
  }
  componentWillMount(){
    this.getInfo()
  }

  

  handlenSetJpush(id){
    
    JPushModule.notifyJSDidLoad((resultCode)=>{
      console.log(resultCode)
      if(resultCode === 0){
        JPushModule.setAlias("gaochao_"+id, success => {})
      } 
    })
  }

  async getInfo(){
    try{
      let phone = await getStorage("phone")
      let password = await getStorage("password")
      this.setState({
        phone,
        password 
      })
    }catch(err){
      console.log(err)
    }
  }
  clickLogin(){
    const {phone, password} = this.state
    if(!phone){
      ToastTip("danger", "手机号不能为空！")
      return 
    }
    if(!password){ 
      ToastTip("danger", "密码不能为空！")
      return 
    }
    this.props.actions.handlenLogin({
      url: "/user/member/loginPwd",
      body: {
        // phone: "15170255838",
        // password: "921214"
        phone, password
      }
    }, async (res, version)=>{
      this.handlenSetJpush(res.id)
      await setStorage("phone", phone)
      await setStorage("password", password)
      this.props.navigation.navigate("Main")
    })
  }

  render(){
    return (
      <Container>
        <Card style={styles.mb}>
        <Form>
          <Item >
            <Label style={styles.labelStyle}>用户名</Label>
            <Input value={this.state.phone} onChangeText={(val)=>this.setState({phone: val})} />
          </Item>
          <Item  last>
            <Label  >密码</Label>
            <Input secureTextEntry value={this.state.password} onChangeText={(val)=>this.setState({password: val})} />
          </Item>
        </Form>
        <Button full  onPress={this.clickLogin.bind(this)}   style={{ margin: 15, marginTop: 50}} >
          <Text style={{color: '#fff', fontSize: 16, textAlign:"center"}}>登录</Text>
        </Button>
      </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  mb: {
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50
  },
  labelStyle: {
    paddingBottom: 5
  }
})

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({handlenLogin}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Login)