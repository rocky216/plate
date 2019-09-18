import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {
  Container,
  Content,
  Text,
  Card,
  List,
  ListItem
} from "native-base"



class HouseInfo extends React.Component {
  static navigationOptions = {
    title: "房屋信息"
  }

  render(){
    const {houseList } = this.props
    console.log(houseList, 77)
    return (
      <Container>
        <Content style={{margin:10}}>
          <Card>
            <List>
              {houseList && houseList.length? houseList.map(item=>(
                <ListItem key={item.id}>
                  <Text>{item.houseUrlName}</Text>
                </ListItem>
              )):null}
            </List>
          </Card>
        </Content>
      </Container>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    houseList: state.app.houseList
  }
}

export default connect(mapStateProps, mapDispatchProps)(HouseInfo)