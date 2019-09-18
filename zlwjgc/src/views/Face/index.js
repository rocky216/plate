import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container, 
  Text,
  Content,
  Thumbnail,
  ListItem,
  List,
  Left,
  Right,
  Body,
  Icon
} from "native-base"
import {getFaceList } from "@/actions/appAction"
import moment from "moment"


class Face extends React.Component {
  static navigationOptions = {
    title: "我的人脸列表"
  }

  constructor(props){
    super(props)
    this.state = {
      faceList: []
    }
  }

  componentWillMount(){
    this.props.actions.getFaceList({
      url: "/user/face/getFaceList"
    }, res=>{
      this.setState({
        faceList:res?res:[]
      })
      console.log(res, "res")
    })
  }

  deviceList(item){
    this.props.navigation.navigate("DeviceList", {
      id: item.id
    })
  }

  render(){
    const {faceList} = this.state
    return (
      <Container>
        <Content>
          <List>
            {faceList.map(item=>(
              <ListItem 
                thumbnail 
                key={item.id} 
                onPress={this.deviceList.bind(this, item)}>
                <Left>
                  <Thumbnail square  source={{uri:item.faceImgUrl}} />
                </Left>
                <Body>
                  <Text>{item.faceName}</Text>
                  <Text note>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
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
    actions: bindActionCreators({getFaceList}, dispatch)
  }
}

function mapStateProps(state){
  return{

  }
}

export default connect(mapStateProps, mapDispatchProps)(Face)