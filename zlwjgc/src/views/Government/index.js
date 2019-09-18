import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {RefreshControl } from "react-native"
import {
  Container, 
  Text,
  Content,
  List,
  ListItem,
  Thumbnail,
  Body,
  Right,
  Icon,
  Left
} from "native-base"
import {getGovernmentList } from "@/actions/appAction"
import moment from "moment"
import Empty from "@/components/Empty"
import {imgUrl} from "@/config"


class Government extends React.Component {
  static navigationOptions = {
    title: "政务公开"
  }

  constructor(props){
    super(props)
    this.state = {
      governmentList: [],
      isEmpty: false
    }
  }

  componentWillMount(){
    this.getGovernmentList()
  }

  getGovernmentList(){
    this.props.actions.getGovernmentList({
      url:"/user/he/governmentList"
    }, (res)=>{
      res && res.length?this.setState({
        governmentList: res?res:[]
      }):this.setState({isEmpty: true})
      console.log(res, "res")
    })
  }

  handlenDetail(item){
    this.props.navigation.navigate("GovernmentDetail", {
      ...item
    })
  }

  render(){
    const {spinning } = this.props
    const {governmentList, isEmpty} = this.state
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={spinning}
              onRefresh={this.getGovernmentList.bind(this)}
            />
          }
        >
          {isEmpty?<Empty/>:null}
          <List>
            {governmentList.map((item, index)=>(
              <ListItem 
                key={item.id} 
                onPress={this.handlenDetail.bind(this, item)}
                thumbnail>
                <Left>
                  <Thumbnail large square  source={{uri: imgUrl+item.cover}}/>
                </Left>
                <Body>
                  <Text numberOfLines={1}>{item.title}</Text>
                  <Text numberOfLines={2} style={{fontSize: 14, color: "#999", marginTop:5}}>{item.desc}</Text>
                  <Text style={{fontSize: 14, color: "#999", marginTop:5}}>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
                </Body>
                <Right>
                  <Icon  name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
            
          </List>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getGovernmentList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Government)