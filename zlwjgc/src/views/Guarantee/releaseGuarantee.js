import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {StyleSheet, TouchableOpacity} from "react-native"
import {
  Container,
  Text,
  Form,
  Item,
  Content,
  Textarea,
  Button,
  Icon,
  View,
  Footer,
  FooterTab,
  ActionSheet,
  Thumbnail,
  Picker
} from "native-base"
import IconAntDesign from "react-native-vector-icons/AntDesign"
import ImagePicker from 'react-native-image-crop-picker';
import {releaseGurante, getGuranteList, getGuranteType} from "@/actions/appAction"
import {ToastTip} from "@/utils"

class ReleaseGuarantee extends React.Component {
  static navigationOptions = {
    title: "我要保修"
  }

  constructor(props){
    super(props)
    this.state = {
      desc: '',
      base64: [],
      selected: '0',
      typeList: []
    }
  }
  componentWillMount(){
    this.props.actions.getGuranteType({
      url: "/user/repair/fixRepairType"
    }, res=>{
      if(res && res.length){
        this.setState({typeList: res})
      }
    })
  }

  handlenUpload(){
    const {base64} = this.state
    if(base64.length==3){
      ToastTip("warning", "最多只能上传三张！")
      return 
    }
    ActionSheet.show({
      options: [
        {text: "拍照上传"},
        {text: "选择图片"},
        {text: "取消"}
      ],
      title: "上传图片"
    }, buttonIndex=>{
      if(buttonIndex==0){
        this.upCarameFace()
      }else if(buttonIndex==1){
        this.upLoadPickerFace()
      }
      
    })
  }

  upCarameFace(){
    const {base64} = this.state
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 1,
    }).then(image => {
      base64.push(image.data)
      this.setState({base64})
    }).catch(err=>{})
  }

  upLoadPickerFace(){
    const {base64} = this.state
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
      hideBottomControls: true,
      compressImageQuality: 1,
    }).then(image => {
      base64.push(image.data)
      this.setState({base64})
    }).catch(err=>{})
  }

  handlenSubmit(){
    const {desc, base64, selected} = this.state

    if(selected==0){
      if(!base64.length){
        ToastTip("warning", "请选择服务类型！")
        return
      }
    }

    if(!base64.length){
      ToastTip("warning", "图片不能为空！")
      return
    }
    let obj = {}
    _.each(base64, (item,index)=>{
      obj[`base64${index+1}`] = item
    })
    this.props.actions.releaseGurante({
      url: "/user/repair/send",
      body: { 
        desc: desc,
        fixRepairType: selected,
        ...obj
      }
    }, res=>{
      ToastTip("success", "发布成功！")
      this.props.navigation.navigate("Guarantee")
      this.props.actions.getGuranteList({
        url: "/user/repair/list"
      })
    })
  }

  handlenDelete(index){
    const {base64 } = this.state
    base64.splice(index, 1)
    this.setState({base64})
  }

  handlenValueChange(val){
    
  }


  render(){
    const {base64, typeList} = this.state
    return (
      <Container>
        <Content style={{margin:10}}>
          <Form>
          <Picker
            mode="dropdown"
            selectedValue={this.state.selected}
            onValueChange={val=>this.setState({selected:val})}
          >
            <Picker.Item  
              label="选择服务类型"
              value="0"
            />
            {typeList.map(item=>(
              <Picker.Item 
                key={item.id} 
                label={item.dictValue}
                value={item.id}
              />
            ))}
          </Picker>
          <Textarea rowSpan={7} bordered onChangeText={val=>this.setState({desc:val})} placeholder="保修内容~" />
          </Form>
          <View style={styles.uploadList}>
            <TouchableOpacity onPress={this.handlenUpload.bind(this)}>
              <Text style={styles.plus}>
                <IconAntDesign  name="plus" size={30} />
              </Text>
            </TouchableOpacity>
            
            {base64.map((item, index)=>(
              <View key={index} style={styles.imgList} >
                <Thumbnail 
                square 
                source={{uri: `data:image/jpeg;base64,${item}`}} 
                style={{width: 70, height: 70}} />
                <Button small transparent full onPress={this.handlenDelete.bind(this, index)}>
                  <Text><IconAntDesign name="closecircleo" size={22} color="#999"/></Text>
                </Button>
              </View>
            ))}
            
          </View>
        </Content>
        <Footer>
          <Button full transparent light onPress={this.handlenSubmit.bind(this)}> 
            <Text style={{fontSize: 16}}>发布</Text>
          </Button>
        </Footer>
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
    marginTop: 10
  },
  imgList: {
    width: 70,
    position: "relative",
    marginLeft: 10
  }
})

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({releaseGurante, getGuranteList, getGuranteType}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(ReleaseGuarantee)