import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  List,
  ListItem,
  Left,
  Text,
  Content
} from "native-base"
import {handlenHomeText } from "@/actions/homeAction"
import moment from "moment"



class DetailPage extends React.Component {
  static navigationOptions = {
    title: "通行记录"
  }

  handlenTest(){
    this.props.actions.handlenHomeText()
  }

  render(){
    const {plateRecords } = this.props
    return (
      <Container>
        <Content>
          <List>
          {plateRecords && plateRecords.length ? plateRecords.map(item=>(
            <ListItem key={item.id}>
              <Left>
                <Text style={{marginRight:10}}>{item.license}</Text>
                <Text>{moment(item.buildTime).format("YYYY-MM-DD hh:mm:ss")}</Text>
              </Left>
            </ListItem>
          )):null}
          </List>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({handlenHomeText}, dispatch)
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    plateRecords: state.app.plateRecords,
  }
}

export default connect(mapStateProps, mapDispatchProps)(DetailPage)