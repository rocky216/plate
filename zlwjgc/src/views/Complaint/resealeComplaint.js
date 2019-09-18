import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  Text,
  Content,
  Textarea,
  Footer,
  Button,
  FooterTab
} from "native-base"
import {releaseComplaint} from "@/actions/appAction"
import {ToastTip} from "@/utils"


class ResealeComplaint extends React.Component {
  static navigationOptions = {
    title: "投诉建议"
  }

  constructor(props){
    super(props)
    this.state = {
      desc: ''
    }
  }

  handlenSubmit(){
    if(!this.state.desc){
      ToastTip("warning", "投诉建议不能为空！")
      return
    }
    this.props.actions.releaseComplaint({
      url: "/user/complaint/send",
      body: {
        desc: this.state.desc
      }
    }, res=>{
      ToastTip("success", "发布成功!")
      this.setState({desc: ''})
    })
  }
  render(){
    console.log(this.state.desc)
    return (
      <Container>
        <Content style={{margin:10}}>
          <Textarea 
            rowSpan={7} 
            bordered 
            placeholder="请填写您的建议~"
            value={this.state.desc}
            onChangeText={val=>this.setState({desc: val})}  
          />
        </Content>
        <Footer>
          <Button full transparent light onPress={this.handlenSubmit.bind(this)}> 
            <Text style={{fontSize: 16}}>提交</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}


function mapDisptchProps(dispatch){
  return {
    actions: bindActionCreators({releaseComplaint }, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDisptchProps)(ResealeComplaint)