import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {
  Container,
  Text,
  Content,
  Form,
  Item,
  Input,
  Button,
} from "native-base"
import {AddVistor, getVistorLicenseList} from "@/actions/appAction"


class AddVistorLicense extends React.Component {
  static navigationOptions = {
    title: "添加访客车牌"
  }

  constructor(props){
    super(props)
    this.state = {
      name: '',
      mobile: '',
      carNum: ''
    }
  }

  handlenSubmit(){
    const {name, mobile, carNum} = this.state
    this.props.actions.AddVistor({
      url: "/plate/api/visitor/carnum",
      body: {name, mobile, carNum}
    }, res=>{
      console.log(res, "carnum")
      this.props.navigation.navigate("LicenseDetail")
      this.props.actions.getVistorLicenseList({
        url: "/plate/api/visitor/car/list"
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
              <Input placeholder="车牌号" onChangeText={(text)=>this.setState({carNum: text})} />
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
    actions: bindActionCreators({AddVistor, getVistorLicenseList}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(AddVistorLicense)

