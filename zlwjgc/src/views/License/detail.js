import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {
  Container,
  Text,
  Button,
  ListItem,
  List,
  Left,
  Content,
  Card
} from "native-base"
import {getVistorLicenseList } from "@/actions/appAction"
import Empty from "@/components/Empty"

class LicenseDetail extends React.Component {
  static navigationOptions = ({navigation})=>({
    title: "访客车牌",
    headerRight: <Button transparent light 
                    onPress={()=>navigation.navigate("AddVistorLicense")}><Text>添加访客车牌</Text>
                </Button>
  })

  constructor(props){
    super(props)
    this.state = {
      isEmpty: false
    }
  }

  componentDidMount(){
    this.getVistorLicenseList()
  }
  componentWillReceiveProps(nextPros){
    if(nextPros.visitorLicense && nextPros.visitorLicense.length){
      this.setState({isEmpty:false})
    }else{
      this.setState({isEmpty:true})
    }
  }

  getVistorLicenseList(){
    this.props.actions.getVistorLicenseList({
      url: "/plate/api/visitor/car/list",
    }, res=>{
    })
  }
  render(){
    const {visitorLicense } = this.props
    return (
      <Container>
        <Content style={{margin:10}}>
          {this.state.isEmpty?<Empty/>:null}
          {visitorLicense && visitorLicense.length?<Card>
            <List>
              {visitorLicense.map(item=>(
                <ListItem key={item.id}>
                  <Left>
                    <Text style={{marginRight: 10}}>{item.name}</Text>
                    <Text style={{marginRight: 10}}>{item.carNumber}</Text>
                    <Text>{item.mobile}</Text>
                  </Left>
                </ListItem>
              ))}
            </List>
          </Card>:null}
          
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getVistorLicenseList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    visitorLicense: state.app.visitorLicense
  }
}

export default connect(mapStateProps, mapDispatchProps)(LicenseDetail) 