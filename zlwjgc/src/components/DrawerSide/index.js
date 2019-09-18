import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {TouchableOpacity } from "react-native"
import {
  Container,
  Header, 
  Body, 
  List, 
  ListItem, 
  Text, 
  Left, 
  Title, 
  Button, 
  Footer,
  FooterTab,
  Content
} from "native-base"
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {changeCurrenthouse, getHomeInfo} from "@/actions/appAction"

class DrawerSide extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    
    
  }
  handlenHouse(item){
    this.props.actions.changeCurrenthouse(item, ()=>{
      this.props.actions.getHomeInfo({
        url: "/user/index"
      })
    })
    
    this.props.navigation.closeDrawer()
  }
  render(){
    const {houseList, navigation} = this.props
    
    return (
      <Container>
        <Header>
          <Body>
            <Title style={{fontSize: 14}}>
              <IconFontAwesome5 name="house-damage" size={16} style={{marginRight:10}}/>我的房屋列表
            </Title>
          </Body>
        </Header>
        <Content>
          <List>
            {houseList?houseList.map((item, index)=>(
              <ListItem key={index} onPress={this.handlenHouse.bind(this, item)}>
                <Left>
                  <Text>{item.houseUrlName}</Text>
                </Left>
              </ListItem>
            )):null}
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button  light full onPress={()=>navigation.closeDrawer()}>
              <Text style={{fontSize:16}}>关闭</Text> 
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({changeCurrenthouse, getHomeInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    houseList: state.app.houseList
  }
}

export default connect(mapStateProps, mapDispatchProps)(DrawerSide)