import React from "react"
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import {View, StyleSheet, Linking, Text } from "react-native"
import {Container, Card, Form, Input, Label, Item, Button, Content, Footer, FooterTab} from "native-base"
import {handlenLogin } from "@/actions/appAction"
import {ToastTip, setStorage, getStorage} from "@/utils"
import JPushModule from 'jpush-react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign"

class Login extends React.Component {
  static navigationOptions = ({navigation})=>({
    header:null,
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
      console.log(res, "login_res")
      this.handlenSetJpush(res.id)
      await setStorage("phone", phone)
      await setStorage("password", password)
      this.props.navigation.navigate("Main")
    })
  }

  render(){
    const {navigation} = this.props
    return (
      <Container>
        <Content>
          <Card style={styles.mb} transparent >
              <Text style={styles.welcome}>欢迎登录智联万家！</Text>
              <Form>
                <Item >
                  <Label style={styles.labelStyle}><IconAntDesign name="user" size={22} color="#999" /></Label>
                  <Input value={this.state.phone} placeholder="请输入用户名/手机号" onChangeText={(val)=>this.setState({phone: val})} />
                </Item>
                <Item >
                  <Label  ><IconAntDesign name="lock1" size={22} color="#999" /></Label>
                  <Input secureTextEntry value={this.state.password} placeholder="请输入密码" onChangeText={(val)=>this.setState({password: val})} />
                </Item>
              </Form>
              <Button full  onPress={this.clickLogin.bind(this)}   style={{ margin: 15, marginTop: 50}} >
                <Text style={{color: '#fff', fontSize: 16, textAlign:"center"}}>登录</Text>
              </Button>
              <Button transparent full onPress={()=>navigation.navigate("Register")} >
                <Text style={styles.resigter}>用户注册<IconAntDesign name="arrowright" /></Text>
              </Button>
          </Card>
        </Content>
        <Footer >
          <FooterTab>
          <Button transparent  full style={{backgroundColor: "#fff", borderTopWidth: 0}} onPress={()=>navigation.navigate("Agreement")}  >
            <View style={{display: "flex", flexDirection:"row"}}>
              <Text>登录即代表您已同意我们的</Text><Text style={{color: "#8392e8"}}>《用户协议及隐私声明》</Text>
            </View>
            </Button>
          </FooterTab>
        </Footer>
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
  },
  welcome: {
    marginBottom: 50,
    color: "#999",
    marginLeft:12,
    fontSize:26
  },
  resigter: {
    textAlign: "center",
    color: "#8392e8"
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