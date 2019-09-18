import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {CameraRoll} from "react-native"
import {
  Container, 
  Text,
  Content,
  Card,
  CardItem,
  Left,
  Footer,
  Button
} from "native-base"
import {getVisitorCode } from "@/actions/appAction"
import QRCode from "react-native-qrcode-svg"
import ViewShot, {captureRef, captureScreen} from "react-native-view-shot";
import {ToastTip } from "@/utils"
import {primaryColor } from "@/config"



class Visitor extends React.Component {
  static navigationOptions = {
    title: "访客二维码"
  }
  constructor(props){
    super(props)
    this.state = {
      codeValue: '',
      Imageuri: ''
    }
  }
  componentWillMount(){
    console.log(CameraRoll.saveToCameraRoll, 77)
    this.props.actions.getVisitorCode({
      url: "/user/qr/visitor"
    }, (res)=>{
      this.setState({
        codeValue: res.qr
      })
    })
  }
  handlenSave(url){
    captureScreen({
      format: "jpg",
      quality: 0.8
    }). then(async (uri)=>{
      let Imageuri = (uri.toLowerCase()).includes('file://')?uri:'file://'+uri//判断是否有file://，没有则添加
      CameraRoll.saveToCameraRoll(Imageuri, "photo")
      ToastTip("success", "保存成功！")
    })
  }
  render(){
    const {codeValue, Imageuri} = this.state
    return (
      <Container style={{backgroundColor: primaryColor}}>
        <Content style={{margin: 30}}>
          <Card >
            <CardItem >
              <Left style={{justifyContent: "center"}}>
                <Text style={{fontSize: 18, color: "#3F51B5", fontWeight: "bold"}}>访客二维码</Text>
              </Left>
            </CardItem>
            <CardItem  style={{justifyContent: "center"}}>
              {codeValue?<QRCode 
                value={this.state.codeValue}
                size={180}
                logoBackgroundColor='transparent'
              />:null}
            </CardItem>
            <CardItem>
              <Left style={{justifyContent: "center"}}>
                <Text style={{color:"#D9534F"}}>访客可凭此二维码打开门禁</Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <Button transparent full onPress={this.handlenSave.bind(this)}>
            <Text style={{color: "#fff", fontSize: 16}}>点击保存图片</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getVisitorCode }, dispatch)
  }
}

function mapStateProps(){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Visitor)