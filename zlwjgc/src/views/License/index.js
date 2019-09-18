import React from "react"
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container, 
  Text,
  ListItem,
  List,
  Content,
  Left,
  Right,
  Icon,
  Card,
  Button,
  Footer,
  FooterTab
} from "native-base"
import {getLicenseList } from "@/actions/appAction"
import Empty from "@/components/Empty"

class License extends React.Component {
  static navigationOptions = ({navigation})=>({
    title: "车牌管理",
    headerRight: <Button transparent light 
                    onPress={()=>navigation.navigate("LicenseDetail")}><Text>访客车牌</Text>
                </Button>
  })
  constructor(props){
    super(props)
    this.state = {
      isEmpty: false
    }
  }

  componentWillMount(){ 
    this.props.actions.getLicenseList({
      url: "/plate/api/owner/car/list"
    }, res=>{
      console.log(res)
      
    })
  }

  componentWillReceiveProps(nextPros){
    if(nextPros.licenseList && nextPros.licenseList.length){
      this.setState({isEmpty:false})
    }else{
      this.setState({isEmpty:true})
    }
  }

  render(){
    const {licenseList } = this.props

    return (
      <Container>
        <Content  style={{margin:10}}>
          {this.state.isEmpty?<Empty/>:null}
          {licenseList && licenseList.length?<Card>
            <List>
              {licenseList.map(item=>(
                <ListItem key={item.id}>
                  <Left>
                    <Text style={{marginRight:10}}>{item.name}</Text>
                    <Text>{item.carNumber}</Text>
                  </Left>
                </ListItem>
              ))}
            </List>
          </Card>:null}
        </Content>
        <Footer>
          <FooterTab>
            <Button full light onPress={()=>this.props.navigation.navigate("AddLicense")}>
              <Text style={{fontSize:16}}>添加车牌</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getLicenseList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    licenseList: state.app.licenseList
  }
}

export default connect(mapStateProps, mapDispatchProps)(License)