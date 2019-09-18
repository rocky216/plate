import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {TouchableOpacity, RefreshControl, ScrollView} from "react-native"
import {
  Container,
  Content,
  Header,
  Body,
  Title, 
  Left, 
  Button, 
  Right, 
  List, 
  ListItem, 
  Icon,
  Card,
  CardItem,
  Subtitle,
  Text,
  View,
  Spinner 
} from "native-base"
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Modular from "@/components/Modular"
import SwiperBanner from "@/components/SwiperBanner"
import {getHomeInfo} from "@/actions/appAction"
import {imgUrl } from "@/config"
import moment from "moment"
import SetNotice from "@/components/SetNotice"
import Notice from "@/components/Notice"
import Empty from "@/components/Empty"




class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isVisible: true
    }
  }

  componentWillMount(){
    
    this.getHomeInfo()
  }

  

  getHomeInfo(){
    this.props.actions.getHomeInfo({
      url: "/user/index"
    })
  }

  handlenTest(){
    this.props.navigation.navigate("Login")
  }

  render(){
    const {navigation, currentHouse, plateRecords, spinning} = this.props
    
    let plateRecordsClone = plateRecordsClone = plateRecords?_.cloneDeep(plateRecords):[]
    if(plateRecordsClone.length>5){
      plateRecordsClone.length = 5
    }
    return (
      <Container  style={{backgroundColor: "#ddd"}}>
        <Header>
          <Left>
            <Button small transparent light onPress={()=>navigation.toggleDrawer()} >
              <IconEntypo name="menu" size={26} color="#fff"  />
            </Button>
          </Left>
          <Body>
            <Title style={{width: 235, fontSize: 14,  }} >
              {currentHouse?currentHouse.houseUrlName:''}
            </Title>
          </Body>
          <Right>
            <Button small transparent light onPress={()=>navigation.navigate("Scan")}>
              <IconAntDesign name="scan1" size={26} color="#fff" />
            </Button>
          </Right>
        </Header>
        <Content 
          refreshControl={
            <RefreshControl
              refreshing={spinning}
              onRefresh={this.getHomeInfo.bind(this)}
            />
          }
        >
          <SetNotice />
          <SwiperBanner/>
          <Modular/>
          <Notice/>
          <View >
            <Card transparent style={{paddingBottom:10, backgroundColor: "#fff"}}>
              <CardItem header bordered>
                <Left>
                  <IconSimpleLineIcons name="camrecorder" color="#ff9b00" size={20} />
                  <Text style={{color: "#3F51B5"}}>通行记录</Text>
                </Left>
                <Right>
                  <TouchableOpacity  onPress={()=>navigation.navigate("PassList")}>
                    <Text>更多</Text>
                  </TouchableOpacity>
                </Right>
              </CardItem>
              {plateRecordsClone && plateRecordsClone.length ? plateRecordsClone.map(item=>(
                <CardItem key={item.id}>
                  <Left>
                    <Text style={{marginRight:10}}>{item.license}</Text>
                    <Text>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
                  </Left>
                </CardItem>
              )):<Empty/>}
            </Card>
          </View>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHomeInfo}, dispatch)
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    HomeText: state.app.homeText,
    currentHouse: state.app.currentHouse,
    plateRecords: state.app.plateRecords,
    houseList: state.app.houseList,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(HomePage)