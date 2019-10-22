import React from "react"
import {connect } from "react-redux"
import {NativeModules, DeviceEventEmitter, ToastAndroid} from "react-native"
import {withNavigation} from "react-navigation"
import {
  Card,
  CardItem,
  Text,
  Button,
  View,
  Right,
  Left
} from "native-base"
import Modal from "react-native-modal";
import JPushModule from 'jpush-react-native';


class SetNotice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isVisible: false,
      isUpdate: false,
      uploading: false
    }
  }
  componentDidMount(){
    const {version} = this.props
    NativeModules.BridgeManager.getAppVersion(event=>{
      if(parseInt(version.versionNo)> parseInt(event)){
        this.setState({isUpdate: true})
      }else {
        this.setState({isUpdate: false})
      }
    })

    JPushModule.hasPermission(res=>{
      if(!res && !this.state.isUpdate){
        this.setState({isVisible: true})
      } 
    })

    this.handlenClickListener()
  }
  setNotice(){
    this.setState({isVisible: false})
    NativeModules.OpenSettings.openNetworkSettings((data) => {
      console.log('call back data', data);
    }); 
  }

  getVerSion(){ 
    const {version} = this.props
    this.setState({uploading: true})
    NativeModules.upgrade.upgrade(version.appResourceUrl)
    DeviceEventEmitter.addListener("LOAD_PROGRESS", function(msg){ 
    })
  }
  componentWillUnmount(){
    
  }

  handlenClickListener(){
    JPushModule.addReceiveOpenNotificationListener(res=>{
      console.log(res, "res")
      let data = JSON.parse(res.extras)
      if(data.type == "vote"){
        this.props.navigation.navigate("DiscussDetail", {
          themeId: data.id
        })
      }
    })
  }

  render(){
    return (
      <View>
        <Modal isVisible={this.state.isVisible}>
          <Card style={{marginLeft: 30, marginRight:30}}>
            <CardItem>
              <Text>未开启通知权限，请前往 设置=>应用和通知=>智联万家</Text>
            </CardItem>
            <CardItem footer>
              <Left>
                <Button transparent onPress={()=>this.setState({isVisible: false})}>
                  <Text>取消</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent onPress={this.setNotice.bind(this)}>
                  <Text>去设置</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Modal>
        <Modal isVisible={this.state.isUpdate}>
          <Card style={{marginLeft: 40, marginRight:40}}>
            <CardItem>
              <Text>发现新版本请立即更新！</Text>
            </CardItem>
            <CardItem footer>
              <Left>
                {this.state.uploading?<Button transparent >
                  <Text style={{fontSize: 16}}>正在更新...</Text>
                </Button>
                  :<Button transparent onPress={this.getVerSion.bind(this)}>
                  <Text style={{fontSize: 16}}>去更新</Text>
                </Button>}
              </Left>
            </CardItem>
          </Card>
        </Modal>
      </View>
      
    )
  }
}

function mapStateProps(state){
  return {
    version: state.app.version
  }
}

export default withNavigation(connect(mapStateProps)(SetNotice))