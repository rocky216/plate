import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Dimensions} from "react-native"
import {
  Container,
  Text,
  Content,
  Thumbnail,
  Card
} from "native-base"
import HTML from 'react-native-render-html';


class GuaranteDetail extends React.Component {
  static navigationOptions = {
    title: "详情"
  }

  constructor(props){
    super(props)
  }
  getImg(arr){
    let imgs = ''
    _.each(arr, item=>{
      imgs+=`<img src="${item}" />`
    })
    return imgs
  }
  render(){
    const {navigation} = this.props
    return (
      <Container>
        <Content style={{margin: 10}}>
          <Text style={{marginBottom: 20}}>{navigation.getParam("desc")}</Text>
          <HTML 
            html={this.getImg(navigation.getParam("imgUrl").split(","))} 
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

export default connect(mapStateProps)(GuaranteDetail)