import React from "react"
import {connect} from "react-redux"
import { withNavigation } from 'react-navigation';
import {TouchableOpacity} from "react-native"
import {
  Card,
  View,
  Text,
  CardItem,
  Left
} from "native-base"
import Swiper from 'react-native-swiper'
import IconAntDesign from "react-native-vector-icons/AntDesign"
import Empty from "@/components/Empty"
import moment from "moment"



class Notice extends React.Component {
  render(){
    const {noticeList, navigation} = this.props

    console.log(navigation, "navigation")
    return (
      <Card transparent style={{paddingBottom:10, backgroundColor: "#fff", paddingBottom: 0}} >
        <CardItem header bordered>
        <IconAntDesign name="sound" size={20} color="#ff9b00" style={{marginRight:10}} /><Text>公告</Text>
        </CardItem>
        {noticeList && noticeList.length?noticeList.map(item=>(
          <CardItem key={item.id} bordered  >
            <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("Notice", {...item})}>
              <Text numberOfLines={1}>{item.title}</Text>
              <Text numberOfLines={2}>{item.remark}</Text>
              <Text note>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
            </TouchableOpacity>
        </CardItem>
        )):<Empty/>}
        {/* <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{paddingLeft:5, paddingRight:10}}>
            <IconFontAwesome5 name="bullhorn" size={16} color="#ff9b00" />
          </Text>
          {noticeList && noticeList.length?<Swiper 
            height={30}
            showsButtons={false}
            showsPagination={false}
            autoplay
            loop={true}
            horizontal={false}
            autoplayTimeout={3}
          >
            {noticeList.map(item=>(
              <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("Notice", {...item})}>
                <Text umberOfLines={1} style={{lineHeight: 34}}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>:null}
          
        </View> */}
      </Card>
    )
  }
}

function mapStateProps(state){
  return {
    noticeList: state.app.noticeList,
  }
}

export default withNavigation(connect(mapStateProps)(Notice))