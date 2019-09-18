import React from "react"
import {connect } from "react-redux"
import {withNavigation } from "react-navigation"
import {StyleSheet, TouchableOpacity } from "react-native"
import {Text, Title, Card, Thumbnail} from "native-base"
import { Col, Row, Grid } from "react-native-easy-grid";
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import {imgUrl} from "@/config"

class ModularList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  handlenLink(item){
    if(!item.link) return
    this.props.navigation.navigate(item.link)
  }
  handlenMenu(arr, type){
    _.each(arr, item=>{
      switch(parseInt(item.sort)){
        case 1:
          item.link = "Door"
          break
        case 2:
          item.link = "Discuss"
          break
        case 3:
          item.link = "Guarantee" 
          break
        case 4:
          item.link = "ResealeComplaint" 
          break
        case 5:
          item.link = "Government"
          break
        case 6:
          item.link = "License"
          break
        case 7:
          item.link = "Card"
          break
        default:
            item.link = ""
            break
      }
    })
    if(type==1){
      return arr.slice(0,4)
    }else{
      return arr.slice(4)
    }
  }
  render(){
    const {rowList1, rowList2} = this.state
    const {appIndexMenu} = this.props
    
    return (
      <Card transparent style={{paddingBottom:10,marginTop:0, backgroundColor: "#fff"}}>
        {appIndexMenu?
        <Grid>
          <Row>
            {this.handlenMenu(appIndexMenu,1).map((item, index)=>(
              <Col key={index}>
                <TouchableOpacity style={styles.colStyle} onPress={this.handlenLink.bind(this, item)}>
                  <Thumbnail style={{width:60,height:60}} source={{uri: imgUrl+item.desc}} />
                  <Text style={styles.colFont}>{item.name}</Text>
                </TouchableOpacity>
              </Col>
            ))}
          </Row>
          <Row>
            {this.handlenMenu(appIndexMenu,2).map((item, index)=>(
              <Col key={index}>
                <TouchableOpacity style={styles.colStyle} onPress={this.handlenLink.bind(this, item)}>
                  <Thumbnail style={{width:60,height:60}} source={{uri: imgUrl+item.desc}} />
                  <Text style={styles.colFont}>{item.name}</Text>
                </TouchableOpacity>
              </Col>
            ))}
          </Row>
        </Grid>
        :null}
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  colStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  colFont: {
    fontSize: 13
  }
})

function mapStateProps(state){
  return {
    appIndexMenu: state.app.appIndexMenu
  }
}

export default withNavigation(connect(mapStateProps)(ModularList))