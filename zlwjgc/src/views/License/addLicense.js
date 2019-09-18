import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  Text,
  Button,
  Content,
  Form,
  Item,
  Input,
} from "native-base"
import {addOwnerLicense, getLicenseList} from "@/actions/appAction"

class AddLicense extends React.Component {
  static navigationOptions = {
    title: "添加业主车牌"
  }

  constructor(props){
    super(props)
    this.state = {
      name: '',
      mobile: '',
      carNumber: ''
    }
  }

  handlenSubmit(){
    const {name, mobile, carNumber} = this.state
    this.props.actions.addOwnerLicense({
      url: "/plate/api/owner/add/carnum",
      body: {
        name, mobile, carNumber
      }
    }, res=>{
      this.props.navigation.navigate("License")
      this.props.actions.getLicenseList({
        url: "/plate/api/owner/car/list"
      })
    })
  }
  render(){
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="姓名" onChangeText={(text)=>this.setState({name: text})} />
            </Item>
            <Item>
              <Input placeholder="车牌号" onChangeText={(text)=>this.setState({carNumber: text})} />
            </Item>
            <Item>
              <Input placeholder="手机号" onChangeText={(text)=>this.setState({mobile: text})} />
            </Item>
          </Form>
          <Button full  onPress={this.handlenSubmit.bind(this)}   style={{ margin: 15, marginTop: 50}} >
            <Text style={{color: '#fff', fontSize: 16, textAlign:"center"}}>保存</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addOwnerLicense, getLicenseList}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(AddLicense)