import React from "react"
import {View, Text} from "native-base"
import IconEntypo from "react-native-vector-icons/Entypo"

class Empty extends React.Component {
  render(){
    return (
      <View style={{flex: 1,justifyContent:"center", alignItems:"center", paddingBottom: 10}}>
        <IconEntypo name="inbox" size={70} color="#999" />
        <Text style={{color: "#999"}}>里面是空~</Text>
      </View>
    )
  }
}

export default Empty