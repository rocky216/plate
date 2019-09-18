import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Switch} from "react-native"
import {
  Container, 
  Text,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  SwipeRow,
  Alert,
  Button,
  Body,
  ActionSheet
} from "native-base"
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {getCardList, handlenCardSwitch, handlenDeleteCard} from "@/actions/appAction"
import Empty from "@/components/Empty" 


class Card extends React.Component {
    static navigationOptions = {
      title: "卡券管理"
    }

    constructor(props) {
      super(props)
      this.state = {
        cardList: [],
        isEmpty: false
      }
    }
    componentWillMount(){
      this.getCardList()
    }
    getCardList(){
      this.props.actions.getCardList({
        url: "/user/card/cardList"
      }, res=>{
        console.log(res, "res")
        res && res.length?this.setState({
          cardList: res?res:[],
        }):this.setState({
          isEmpty: true
        })
        
      })
    }

    handlenDelete(item){
      ActionSheet.show({
        options: [
          {text: "删除"},
          {text: "取消"}
        ],
        title: "是否删除?"
      }, (value)=>{
        if(value==0){
          this.props.actions.handlenDeleteCard({
            url: "/user/card/del",
            body: {
              cardId: item.id
            }
          }, res=>{
            console.log(res)
            this.getCardList()
          })
        }
      })
    }

    handlenSwitch(item){
      this.props.actions.handlenCardSwitch({
        url: "/user/card/forbidden",
        body: {
          cardId: item.id
        }
      }, res=>{
        console.log(res)
        this.getCardList()
      })
    }

    render(){
      const {cardList, isEmpty} = this.state
      return (
        <Container>
          <Content>
            {isEmpty?<Empty/>:null}
            <List>
              {cardList.map(item=>(
                <ListItem key={item.id} thumbnail>
                  <Left>
                    <Button small transparent light onPress={this.handlenDelete.bind(this, item)}>
                      <IconAntDesign name="delete" size={20} />
                    </Button>
                  </Left>
                  <Body>
                    <Text>卡号：{item.cardNumber}</Text>
                  </Body>
                  <Right>
                    <Button small transparent light >
                      <Switch value={item.status==1} onValueChange={this.handlenSwitch.bind(this, item)} />
                    </Button>
                  </Right>
                </ListItem>
              ))}
            </List>
          </Content>
        </Container>
      )
    }
}


function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCardList, handlenCardSwitch, handlenDeleteCard}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Card)