import React from "react"
import {connect } from "react-redux"
import {View} from "react-native"
import {
  Container, 
  Content, 
  Card, 
  CardItem, 
  Left, 
  Text, 
  Button, 
  Thumbnail,
  Body
} from "native-base"
import QRCode from "react-native-qrcode-svg"
import forge from "node-forge"
import defaultHeader from "@/assets/images/header.png"
import {primaryColor} from "@/config"

class Door extends React.Component {
  static navigationOptions = ({navigation})=>{
    return {
      title: "智能门禁",
      headerRight: <Button transparent light 
                      onPress={()=>navigation.navigate("Visitor")}><Text>访客二维码</Text>
                  </Button>
    }
  }
  constructor(props){
    super(props)
    this.state = {
      codeValue: ''
    }
  }
  componentWillMount(){
    this.getCode()
  }
  getCode(){
    const {userInfo, currentHouse} = this.props
    let d = new Date()
      , y=d.getFullYear()
      , m=d.getMonth()+1>=10?d.getMonth()+1:'0'+(d.getMonth()+1)
      , day = d.getDate()>=10?d.getDate():'0'+d.getDate()
      ,hours = d.getHours()>=10?d.getHours():'0'+d.getHours()
      ,minute = d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes()
      ,second  = d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds()
      let str = `${currentHouse.householdsId}${currentHouse.heId}${y}${m}${day}${hours}${minute}${second}`
      let md = forge.md.md5.create();
      md.update(`ULSbSsXASLDWxF6t${str}jFxcmwcLlv8MQPHR`);
      let password = md.digest().toHex();
      let newStr = `${currentHouse.householdsId}_${currentHouse.heId}_${y}${m}${day}${hours}${minute}${second}_${password}`
      console.log(newStr, "newStr")
      this.setState({codeValue: newStr})
  }
  render(){
    const {userInfo, currentHouse} = this.props
    const {codeValue} = this.state
    return (
      <Container style={{backgroundColor: primaryColor}}>
        <Content style={{margin: 30}}>
          <Card >
            <CardItem>
              <Left style={{justifyContent: "center"}}>
                <Thumbnail 
                  source={userInfo.headerImg?{uri: userInfo.headerImg}:defaultHeader}
                />
                <Body>
                  <Text style={{fontSize: 18, color: "#3F51B5", fontWeight: "bold"}}>{userInfo.name?userInfo.name:userInfo.phone}</Text>
                  <Text note>{currentHouse.houseUrlName}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{justifyContent: "center"}}>
              {codeValue?
              <QRCode
                value={codeValue}
                size={200}
              />:''}
            </CardItem>
            <CardItem>
              <Left style={{justifyContent: "center"}}>
                <Text style={{color:"#D9534F"}}>业主可凭此二维码打开门禁</Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
        
      </Container>
    )
  }
}

function mapStateProps(state){
  return {
    userInfo: state.app.userInfo,
    currentHouse: state.app.currentHouse
  }
}

export default connect(mapStateProps)(Door)