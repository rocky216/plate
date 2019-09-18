import React from "react"
import { connect } from "react-redux"
import {bindActionCreators } from "redux"
import {View} from "react-native"
import {
  Container, 
  Text,
  ListItem,
  List,
  Left,
  Right,
  Title,
  Button,
  Body,
  Subtitle 
} from "native-base"
import {getDeviceList, faceAppAdd, faceAppDel} from "@/actions/appAction"
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ToastTip } from "@/utils"



class DeviceList extends React.Component {
  static navigationOptions = {
    title: "人脸设备列表"
  }

  constructor(props){
    super(props)
    this.state = {
      deviceList: [],
      faceInfo: {}
    }
  }

  componentWillMount(){
    this.getDeviceList()
  }
  getDeviceList(){
    this.props.actions.getDeviceList({
      url: "/user/face/deviceList",
      body: {
        faceId: this.props.navigation.getParam("id")
      }
    }, res=>{
      console.log(res, "getDeviceList")
      if(!res) return
      this.setState({
        deviceList: res.deviceList,
        faceInfo: res.faceInfo
      })
    })
  }
  handlenAdd(item){
    this.props.actions.faceAppAdd({
      url: "/queue/julong/faceAppAdd",
      body: {
        faceId: this.props.navigation.getParam("id"),
        doorSubDeviceId: item.id,
        time: 0
      }
    }, res=>{
      this.getDeviceList()
      ToastTip()
    })
  }
  handlenDelete(item){
    this.props.actions.faceAppDel({
      url: "/queue/julong/faceAppDel",
      body: {
        relationId: item.doorFaceDeviceRelation.id,
        time: 0
      }
    }, res=>{
      this.getDeviceList()
      ToastTip()
    })
  }
  render(){
    const {deviceList} = this.state
    return (
      <Container>
        <List>
          {deviceList.map(item=>(
            <ListItem key={item.id} avatar >
              <Left>
                {item.online==1?
                <IconAntDesign name="checkcircle" size={20} color="#21ba63" />:
                <IconAntDesign name="closecircle" size={20} color="#f25d5a" />}
              </Left>
              <Body>
                <Text style={{marginRight:10}}>{item.deviceSerial}</Text>
                <Text >{item.subDeviceName}</Text>
                {/* {item.doorFaceDeviceRelation && item.doorFaceDeviceRelation.status==2?
                  <Text style={{color: "#333", textAlign: "left"}}>{item.doorFaceDeviceRelation.remark}</Text>:null} */}
              </Body>
              <Right style={{flexDirection: "row", justifyContent: "flex-end"}}>
                {!item.doorFaceDeviceRelation || (item.doorFaceDeviceRelation && item.doorFaceDeviceRelation.status==2)?
                  <Button style={{marginRight:15}} small transparent light onPress={this.handlenAdd.bind(this, item)}>
                    <IconEntypo name="add-to-list" size={26} />
                  </Button>:null}
                {item.doorFaceDeviceRelation && item.doorFaceDeviceRelation.status==1?
                <Button style={{marginRight:15}} small transparent light onPress={this.handlenDelete.bind(this, item)}>
                  <IconMaterialCommunityIcons name="playlist-remove" size={30} />
                </Button>:null}
              </Right>
            </ListItem>
          ))}
          
        </List>
      </Container>
    )
  }
}


function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeviceList, faceAppAdd, faceAppDel}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceList)