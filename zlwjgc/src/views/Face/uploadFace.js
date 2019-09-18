import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {TouchableOpacity, StyleSheet} from "react-native"
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Footer,
  Button,
  ActionSheet,
  View,
  Thumbnail,
  Fab
} from "native-base"
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import {ToastTip } from "@/utils"
import {uploadFace } from "@/actions/appAction"
import IconAntDesign from "react-native-vector-icons/AntDesign"


class UploadFace extends React.Component {
  static navigationOptions = {
    title: "上传人脸"
  }

  constructor(props){
    super(props)
    this.state = {
      isVisible: false,
      base64: '',
      faceName:""
    }
  }

  upCarameFace(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 1,
    }).then(image => {
      this.setState({base64: image.data})
    }).catch(err=>{})
  }
  upLoadPickerFace(){
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
      hideBottomControls: true,
      compressImageQuality: 1,
    }).then(image => {
      this.setState({base64: image.data})
    }).catch(err=>{})
  }

  submitHandlenUpload(image){
    const {base64, faceName} = this.state
    if(!faceName){
      ToastTip("warning", "请输入人脸名称！")
      return
    }
    if(!base64){
      ToastTip("warning", "请上传人脸图片！")
      return
    }
    this.props.actions.uploadFace({
      url: "/user/face/uploadFace",
      body: {
        "base64": base64,
        faceName: faceName
      }
    }, res=>{
      this.props.navigation.navigate("Face")
      ToastTip()
    })
  }
  handlenUpload(){
    ActionSheet.show({
      options: [
        {text:"拍照上传"},
        {text:"选择图片"}
      ],
      title: "上传人脸"
    }, buttonIndex=>{
      if(buttonIndex==0){
        this.upCarameFace()
      }else if(buttonIndex==1){
        this.upLoadPickerFace()
      }
    })
  }

  render(){
    const {base64} = this.state
    return (
      <Container>
        <Content style={{margin: 10}}>
          
          <Form>
            <Item  bordered  last>
              <Label>人脸名称：</Label>
              <Input placeholder="请填写人脸名称"  onChangeText={val=>this.setState({faceName: val})}  />
            </Item>
          </Form>
          <View style={styles.uploadList}>
            {base64?<Thumbnail square style={{width: 225, height: 300}}  source={{uri: `data:image/jpeg;base64,${base64}`}} />:null}
          </View>
          
        </Content>
        <Footer>
          <Button transparent light full onPress={this.submitHandlenUpload.bind(this)}>
            <Text style={{fontSize:16}} >提交</Text>
          </Button>
        </Footer>
        <Fab
        position="bottomRight"
        containerStyle={{marginBottom: 70}} 
        onPress={this.handlenUpload.bind(this)}
        >
          <IconAntDesign  name="plus" size={30} />
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  plus: {
    color: "#999",
    borderColor: "#999",
    borderWidth: 1,
    height: 70,
    width: 70,
    lineHeight: 70,
    textAlign: "center"
  },
  uploadList: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  imgList: {
    width: 70,
    position: "relative",
    marginLeft: 10
  }
})

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({uploadFace}, dispatch)
  }
}

function mapStateProps(state){
  return {
    
  }
}

export default connect(mapStateProps, mapDispatchProps)(UploadFace)