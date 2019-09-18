import React from "react"
import {View, Text, StyleSheet} from "react-native"
import Spinner from "react-native-spinkit"
import {RRCLoading} from "react-native-overlayer"
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top:230,
    left:"42%",
    zIndex: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  spinner: {
  }
})

RRCLoading.setLoadingOptions({
  text: '正在加载..',
  loadingBackgroundColor: 'rgba(0,0,0,0.0)',
  //loadingImage: LoadingImage,
  loadingViewStyle: {backgroundColor: 'rgba(0,0,0,0.6)'},
  loadingTextStyle: {}
})

class JCard extends React.Component {
  componentWillReceiveProps(){

  }
  render(){
    RRCLoading.show()
    return (
      <View></View>
    )
  }
}

export default JCard