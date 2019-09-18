import React from "react"
import {
  Container,
  Text
} from "native-base"
import  {WebView }  from 'react-native-webview'


class Monitor extends React.Component {
  render(){
    return (
      <WebView source={{ uri: 'https://open.ys7.com/view/h5/fa221ed3988242ecb293c4b7829869b6' }} />
    )
  }
}


export default Monitor