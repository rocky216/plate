import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {
  Container,
  Text,
  Button,
  Content,
  Left,
  ListItem,
  List,
  Right,
  Icon,
  Body,
  Thumbnail,
  ActionSheet
} from "native-base"
import {getGuranteList, getGuranteDelete} from "@/actions/appAction"
import IconAntDesign from "react-native-vector-icons/AntDesign"
import {ToastTip} from "@/utils"



class Guarantee extends React.Component {
  static navigationOptions = ({navigation})=>({
    title: "保洁维修",
    headerRight: <Button transparent light onPress={()=>navigation.navigate("ReleaseGuarantee")}><Text>我要帮忙</Text></Button>
  })

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    this.getGuranteList()
  }

  getGuranteList(){
    this.props.actions.getGuranteList({
      url: "/user/repair/list"
    })
  }
  handlenDelete(item){
    console.log(item)
    ActionSheet.show({
      options: [
        {text: "删除"},
        {text: "取消"}
      ],
      title: "是否删除"
    }, buttonIndex=>{
      if(buttonIndex==0){
        this.props.actions.getGuranteDelete({
          url: "/user/repair/del",
          body: {
            Rid: item.id
          }
        }, res=>{
          this.getGuranteList()
          ToastTip("success", "删除成功！")
        })
      }
    })
  }

  render(){
    const {guaranteList, navigation} = this.props
    return (
      <Container>
        <Content>
          <List>
            {guaranteList && guaranteList.length ?guaranteList.map(item=>(
              <ListItem 
                key={item.id} 
                thumbnail
                onPress={()=>navigation.navigate("GuaranteeDetail",{
                  ...item
                })}
                >
                <Left>
                  <Thumbnail 
                    square  
                    source={{uri: item.imgUrl?item.imgUrl.split(",")[0]:''}} 
                    style={{width:70, height:60}} />
                </Left>
                <Body>
                  <Text numberOfLines={2}>{item.desc}</Text>
                  {item.repairName?<Text note>{item.repairName}</Text>:null}
                </Body>
                <Right>
                  <IconAntDesign 
                    name="delete" 
                    size={20} 
                    onPress={this.handlenDelete.bind(this, item)} />
                </Right>
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
    actions: bindActionCreators({getGuranteList, getGuranteDelete}, dispatch)
  }
}

function mapStateProps(state){
  return {
    guaranteList: state.app.guaranteList
  }
}

export default connect(mapStateProps, mapDispatchProps)(Guarantee)