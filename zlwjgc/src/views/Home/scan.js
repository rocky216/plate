import React from "react"

import {
  Container,
  Text,
  Content,
  View
} from "native-base"
import { RNCamera } from 'react-native-camera';
import {ToastTip} from "@/utils"


class Scan extends React.Component {
  static navigationOptions = {
    title: "二维码扫描"
  }

  constructor(props){
    super(props)
    this.state = {
      result: ''
    }
  }
  onBarCodeRead(e){
    console.log(e)
    const {result } = this.state
    if (!result || result !== e.data) {
      this.setState({result: e.data})
      ToastTip("success", e.data)
      this.props.navigation.navigate("Home")
    }
  }
  render(){
    return (
      <View style={{flex:1, justifyContent:"center",alignItems:"center", backgroundColor:"rgba(0,0,0,0.8)"}}>
        <RNCamera
          style={{width: 220, height:240, marginTop: -100}}
          ref={(cam) => {
            this.camera = cam
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
      </View>
    )
  }
}


export default Scan