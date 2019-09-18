import React from "react"
import {connect } from "react-redux"
import {Dimensions} from "react-native"
import {
  Container,
  Content,
  Text,
  H3
} from "native-base"
import HTML from 'react-native-render-html';
import moment from "moment"


class Notice extends React.Component {
  static navigationOptions = {
    title: "公告详情"
  }
  render(){
    const {navigation } = this.props
    return (
      <Container>
        <Content style={{marginTop:10}}>
          <H3 style={{textAlign: "center", marginBottom: 10}} >{navigation.getParam('title')}</H3>
          <Text style={{textAlign: "center"}} note>{moment(navigation.getParam('buildTime')).format("YYYY-MM-DD hh:mm:ss")}</Text>
          <HTML 
            html={navigation.getParam('content')?navigation.getParam('content'):'<div></div>'} 
            tagsStyles={{p: {lineHeight: 26, fontSize:14}}}
            containerStyle={{padding: 10}}
            imagesMaxWidth={Dimensions.get('window').width} />
        </Content>
      </Container>
    )
  }
}

function mapStateProps(state){
  return {

  }
}

export default Notice