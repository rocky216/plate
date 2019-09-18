import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Dimensions } from "react-native"
import {
  Container, 
  Text,
  Thumbnail,
  Footer,
  Content,
  Card,
  Grid,
  Col,
  List,
  ListItem,
  CheckBox,
  Body,
  Radio, 
  Right,
  Left,
  CardItem,
  Button,
  H3
} from "native-base"
import {getVoteThemeDetail, getVoteThemeVote} from "@/actions/appAction"
import {imgUrl } from "@/config"
import {ToastTip } from "@/utils"
import HTML from 'react-native-render-html';
import moment from "moment"


class DiscussDetail extends React.Component {
  static navigationOptions = ({navigation})=>{
    return {
      title: "详情",
      isVote: false
    }
  }


  constructor(props){
    super(props)
    this.state = {
      content: {},
      opts: '',
      options: ''
    }
  }
  componentWillMount(){
    
    let themeId = this.props.navigation.getParam("themeId")
    this.props.actions.getVoteThemeDetail({
      url: "/user/vote/themeInfo",
      body: {themeId}
    }, (res)=>{
      this.setState({
        content: res.themeInfo,
        opts:res.themeOptions,
        isVote: res.vote?res.vote: false
      })
      console.log(res, "detail")
    })
  }

  handlenSelect(item, index){
    const {opts, content} = this.state
    if( _.filter(opts,o=>o.select).length>=content.voteCount && !opts[index]["select"]){
      ToastTip("warning", `只能选择${content.voteCount}项`)
      opts[index]["select"] = false
    }else{
      opts[index]["select"] = !opts[index]["select"]
    }
    
    
    this.setState({
      opts, 
      options: this.handlenOpts(opts, "optios").join()
    })
  }

  handlenSubmit(){
    const {options} = this.state
    let themeId = this.props.navigation.getParam("themeId")
    if(!options) {
      ToastTip("warning", "请选择~")
      return
    }
    this.props.actions.getVoteThemeVote({
      url: "/user/vote/vote",
      body: {
        themeId,
        options
      }
    }, (res)=>{
      ToastTip()
      this.props.navigation.navigate("Discuss")
    })
  }

  handlenOpts(opts){
    var arr=[]
    _.each(opts, item=>{
      if(item.select){
        arr.push(item.id)
      }
    })
    return arr
  }

  render(){
    const {content, opts, isVote} = this.state 
    console.log(isVote, "isVote")
    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <H3 style={{textAlign: "center",  marginBottom: 10}}>{content.themeName}</H3>
          <Text style={{textAlign: "center"}} note>{moment(content.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
          <HTML 
            html={content.themeText?content.themeText:'<div></div>'} 
            tagsStyles={{p: {lineHeight: 26, fontSize:14}}}
            containerStyle={{padding: 10}}
            imagesMaxWidth={Dimensions.get('window').width}   />
          <Card>
          <List>
            {opts?opts.map((item, index)=>(
              <ListItem 
                key={item.id} 
                thumbnail 
                onPress={this.handlenSelect.bind(this, item, index)}>
                <Left >
                  <Thumbnail 
                    style={{width: 40, height: 40}} 
                    source={{uri: imgUrl+item.optionsImgUrl}}/>
                </Left>
                <Body>
                  <Text>{item.optionsName}</Text>
                </Body>
                <Right  >
                  <Radio  selected={item.select} />    
                </Right>
              </ListItem>
            )):null}
            <Button disabled={isVote} full style={{margin: 20}} onPress={this.handlenSubmit.bind(this)}> 
                <Text>提交</Text>
              </Button>
          </List>
          </Card>
        </Content>
      </Container>
    )
  }
}


function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getVoteThemeDetail, getVoteThemeVote }, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(DiscussDetail)