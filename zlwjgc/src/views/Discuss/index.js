import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {RefreshControl, Image, TouchableOpacity} from "react-native"
import {
  Container, 
  List, 
  ListItem, 
  Text, 
  Content, 
  Left,
  Right,
  Title,
  Icon,
  Subtitle,
  Card,
  CardItem,
  H3,
  View
} from "native-base"
import {getVoteThemeList } from "@/actions/appAction"
import Empty from "@/components/Empty"
import moment from "moment"


class Discuss extends React.Component {
  static navigationOptions = {
    title: "议事堂"
  }

  constructor(props){
    super(props)
    this.state={
      voteList: [],
      isEmpty: false
    }
  }

  componentWillMount(){
    this.getVoteThemeList()
  }
  getVoteThemeList(){
    this.props.actions.getVoteThemeList({
      url: "/user/vote/themeList"
    }, (res)=>{
      console.log(res, "Discuss")
      res && res.length?this.setState({voteList: res}):this.setState({isEmpty: true})
    })
  }
  handlenDetail(item){
    console.log(item, 121)
    this.props.navigation.navigate("DiscussDetail", {
      themeId: item.id,
      themeName: item.themeName
    })
  }
  getimgsrc(htmlstr) {  
    var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;  
    var imgsrcArr = [];  
    while (tem = reg.exec(htmlstr)) {  
        imgsrcArr.push(tem[2]);  
    }  
    if(imgsrcArr.length>3){
      imgsrcArr.length = 3
    }
    return imgsrcArr;  
  }
  render(){
    const {spinning} = this.props
    const {voteList, isEmpty} = this.state
    console.log(spinning, 999)
    return (
      <Container>
        <Content
          style={{backgroundColor: "#ddd"}}
          refreshControl={
            <RefreshControl
              refreshing={spinning}
              onRefresh={this.getVoteThemeList.bind(this)}
            />
          }
        >
          {isEmpty?<Empty/>:null}
          {voteList.map((item, index)=>(
            <TouchableOpacity key={index}  onPress={this.handlenDetail.bind(this, item)}>
              <Card  
                transparent 
                style={{borderBottomColor: "#ddd", borderBottomWidth: 1}}
                >
                <CardItem bordered style={{flexDirection:"column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                  <Text numberOfLines={2} style={{marginRight: 10}}>{item.themeName}</Text>
                  <View>
                    <Text note>{item.remark}</Text>
                  </View>
                </CardItem>
                {this.getimgsrc(item.themeText)?(
                  <CardItem bordered>
                    {this.getimgsrc(item.themeText).map((elem,i)=>(
                      <Image key={i} source={{uri: elem}} style={{width: 100, height: 100}} />
                    ))}
                  </CardItem>
                ):null}
                <CardItem bordered>
                  <Text style={{color: "#999"}}>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
                  {/* <Left></Left> */}
                  {/* <Right>
                    <Text style={{color: "#999"}}>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
                  </Right> */}
                </CardItem>
              </Card>
            </TouchableOpacity>
            
          ))}
          
          {/* <List>
            {voteList.map((item, index)=>(
              <ListItem key={index} onPress={this.handlenDetail.bind(this, item)}>
                <Left>
                  <Text>{item.themeName}</Text>
                  <Text>{item.remark}</Text>
                  {this.getimgsrc(item.themeText).length?this.getimgsrc(item.themeText).map((elem, i)=>(
                    <Image key={i} source={{uri: elem}} style={{width: 100, height: 100}} />
                  )):null}
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List> */}
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getVoteThemeList }, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Discuss)