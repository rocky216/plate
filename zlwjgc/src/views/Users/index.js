import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  Header,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Text,
  Title,
  Content,
  List,
  ListItem,
  Icon,
  Card,
  ActionSheet
} from "native-base"
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import defaultHeader from "@/assets/images/header.png"

class Users extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isModalVisible: true
    }
  }

  handlenLoginOut(){
    ActionSheet.show({
      options: [
        {text:"退出"},
        {text:"取消"}
      ],
      title: "是否退出登录？"
    }, buttonIndex=>{
      if(buttonIndex==0){
        this.props.navigation.navigate("Login")
      }
    })
  }


  render(){
    const {navigation, userInfo} = this.props
    
    return (
      <Container style={{backgroundColor: "#ddd"}}>
        <Header style={{height: 100}}>
          <Left >
            <Button transparent light rounded  >
              <Thumbnail  
                style={{width:40, height:40}} 
                source={userInfo.headerImg?{uri: userInfo.headerImg}:defaultHeader} />
            </Button>
          </Left>
          <Body>
            <Title style={{fontSize: 16}}>{userInfo.name?userInfo.name:userInfo.phone}</Title>
          </Body>
          <Right>
            <Button transparent light onPress={()=>navigation.navigate("UploadFace")}>
              <Text>上传人脸</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Card transparent style={{backgroundColor: "#fff", marginTop: 30}}>
            <List>
              <ListItem icon onPress={()=>navigation.navigate("Face")}>
                <Left>
                  <IconEntypo name="facebook-with-circle" size={24} /> 
                </Left>
                <Body>
                  <Text>我的人脸</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>navigation.navigate("HouseInfo")} >
                <Left>
                  <IconFontAwesome5 name="house-damage" size={22} />
                </Left>
                <Body>
                  <Text>房屋信息</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>navigation.navigate("Monitor")} >
                <Left>
                  <IconEntypo name="creative-commons-attribution" size={24} />
                </Left>
                <Body>
                  <Text>监控管理</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>navigation.navigate("EditUserInfo")} >
                <Left>
                  <IconAntDesign name="form" size={24} />
                </Left>
                <Body>
                  <Text>修改资料</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>navigation.navigate("ModifyPassword")} >
                <Left>
                  <IconAntDesign name="unlock" size={26} />
                </Left>
                <Body>
                  <Text>修改密码</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={this.handlenLoginOut.bind(this)} >
                <Left>
                  <IconAntDesign name="logout" size={26} />
                </Left>
                <Body>
                  <Text>退出登录</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
          </Card>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    userInfo: state.app.userInfo
  }
}

export default connect(mapStateProps, mapDispatchProps)(Users) 