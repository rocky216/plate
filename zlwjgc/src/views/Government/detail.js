import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Dimensions } from "react-native"
import {
  Container,
  Text,
  H3,
  Content
} from "native-base"
import {getGovernmentDetail } from "@/actions/appAction"
import HTML from 'react-native-render-html';
import moment from "moment"


class GovernmentDetail extends React.Component {
  static navigationOptions = {
    title: "政务公开详情"
  }

  constructor(props){
    super(props)
    this.state = {
      info: {}
    }
  }

  componentWillMount(){
    const {navigation} = this.props
    this.props.actions.getGovernmentDetail({
      url: "/user/he/government/info",
      body: {
        id: navigation.getParam("id")
      }
    }, (res)=>{
      console.log(res, "res")
      this.setState({info: res})
    })
  }

  render(){
    const {info } = this.state
    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <H3 style={{textAlign: "center", marginBottom: 10}}>{info.title}</H3>
          <Text style={{textAlign: "center"}} note >{moment(info.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
          <HTML 
            html={info.content?info.content:'<div></div>'} 
            tagsStyles={{p: {lineHeight: 26, fontSize:14}}}
            containerStyle={{padding: 10}}
            imagesMaxWidth={Dimensions.get('window').width} />
        </Content>
        
        
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getGovernmentDetail }, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(GovernmentDetail)