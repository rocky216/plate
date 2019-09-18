import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  Text,
  Form,
  Item,
  Button,
  Content,
  Footer,
  Input,
  FooterTab,
  View,
  Thumbnail,
  ActionSheet
} from "native-base"
import defaultHeader from "@/assets/images/header.png"
import ImagePicker from 'react-native-image-crop-picker';
import {updateUserInfo } from "@/actions/appAction"
import {ToastTip} from "@/utils"


class EditUserInfo extends React.Component {
  static navigationOptions = {
    title: "我的资料"
  }

  constructor(props){
    super(props)
    this.state = {
      headerImageBase64: '',
      name: props.userInfo.name?props.userInfo.name:'',
      email: props.userInfo.email?props.userInfo.email:'',
    }
  }

  componentDidMount(){

  }

  upCarameFace(){
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 1,
    }).then(image => {
      this.setState({headerImageBase64: image.data})
    }).catch(err=>{})
  }
  upLoadPickerFace(){
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
      hideBottomControls: true,
      compressImageQuality: 1,
    }).then(image => {
      this.setState({headerImageBase64: image.data})
    }).catch(err=>{})
  }

  uploadHeader(){
    ActionSheet.show({
      options: [
        {text:"拍照上传"},
        {text: "选择图片"}
      ],
      title: "上传头像"
    }, buttonIndex=>{
      if(buttonIndex==0){
        this.upCarameFace()
      }else if(buttonIndex==1){
        this.upLoadPickerFace()
      }
    })
  }

  handlenSubmit(){
    const {name, email, headerImageBase64 } = this.state
    this.props.actions.updateUserInfo({
      url: "/user/member/updateUserInfo",
      body: {name, email, headerImageBase64}
    }, res=>{
      ToastTip("success", "修改成功！")
      this.props.navigation.navigate("Users")
    })
  }

  render(){
    const {userInfo} = this.props
    const {headerImageBase64, name, email} = this.state
    
    return (
      <Container>
        <Content>
          <View  style={{marginTop: 20, marginBottom:20, justifyContent: "center", alignItems: "center"}}>
            <Button transparent onPress={this.uploadHeader.bind(this)}>
              {headerImageBase64?<Thumbnail  source={{uri: `data:image/jpeg;base64,${headerImageBase64}`}} />
              :<Thumbnail  source={userInfo.headerImg?{uri: userInfo.headerImg}:defaultHeader} />}
            </Button>
          </View>
          <Form>
            <Item>
              <Input placeholder="昵称" value={name} onChangeText={val=>this.setState({name:val})}  />
            </Item>
            <Item>
              <Input placeholder="手机号" value={userInfo.phone?userInfo.phone:''} disabled />
            </Item>
            <Item>
              <Input placeholder="邮箱" value={email} onChangeText={val=>this.setState({email:val})} />
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button transparent light full onPress={this.handlenSubmit.bind(this)} >
              <Text style={{fontSize: 16}}>保存</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({updateUserInfo }, dispatch)
  }
}

function mapStateProps(state){
  console.log(state, "Users")
  return {
    userInfo: state.app.userInfo
  }
}

export default connect(mapStateProps, mapDispatchProps)(EditUserInfo)