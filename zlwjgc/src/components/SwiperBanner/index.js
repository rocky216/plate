import React from "react"
import {connect } from "react-redux"
import {View, Text, StyleSheet, Image} from "react-native"
import {Thumbnail } from "native-base"
import Swiper from 'react-native-swiper'
import {imgUrl } from "@/config"


class SwiperBanner extends React.Component {
  render(){
    const {bannerList } = this.props

    return (
      <View>
        {bannerList?
        <Swiper style={styles.container}>
          {bannerList.map(item=>(
            <View key={item.id} style={{flex: 1}}>
              <Image source={{uri: imgUrl+item.desc}} style={{height:150, width: "100%"}} />
            </View>
          ))}
        </Swiper>:null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150
  }
})


function mapStateProps(state){
  console.log(state, "bannerList")
  return {
    bannerList: state.app.bannerList
  }
}
export default connect(mapStateProps)(SwiperBanner)