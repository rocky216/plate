import React from "react"
import {connect } from "react-redux"
import {RefreshControl} from "react-native"
import {
  Container,
  Content
} from "native-base"
import {getStorage } from "@/utils"


class AuthLoading extends React.Component {
  constructor(props){
    super(props)
    global._navigation = this.props.navigation
  }
  componentDidMount(){
    this.gowhere()
  }
  
  componentWillReceiveProps(nextProps){
    
  }

  async gowhere(){
    try{
      let token = await getStorage('token')
      console.log(token, "token")
      this.props.navigation.navigate("Login")
      // this.props.navigation.navigate(token?"Main":"Login")
    }catch(err){

    }
  }

  render(){
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={true}
            />
          }
        ></Content>
      </Container>
    )
  }
}

function mapStateProps(state){
  return {
    token: state.app.token
  }
}

export default connect(mapStateProps)(AuthLoading)