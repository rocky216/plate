import React from "react"
import {withRouter} from "react-router-dom"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {
  Dropdown,
  Icon,
  Menu,
  Row,
  Col,
  Modal
} from "antd"
import {getSysItemList} from "@/actions/projectAction"
import {getHouse, getItemByAccount} from "@/actions/appAction"
import {outLogin} from "@/utils"

class Head extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentWillMount(){
    this.props.actions.getItemByAccount({}, res=>{ 
      this.props.actions.getHouse(res[0])
    })
  }

  handleMenuClick({key}){
    const {mySysItemList, houseInfo} = this.props
    if(key == houseInfo.id) return
    let data = _.filter(mySysItemList, o=>o.id==key)[0]
    this.props.actions.getHouse(data)
    this.props.history.push("/")
  }

  handlenOutLogin(){
    
    Modal.confirm({
      title: '是否退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        outLogin()
        this.props.history.push("/login")
      }
    });
    
  }

  render(){
    const {mySysItemList, houseInfo} = this.props

    const menu = (
      <Menu 
        onClick={this.handleMenuClick.bind(this)}
        theme="dark">
          {mySysItemList && mySysItemList.length?mySysItemList.map(item=>(
            <Menu.Item key={item.id}>
              <Icon type="project" />{item.housingEstateName}
            </Menu.Item>
          )):null}
      </Menu>
    );

    return (
      <div style={{display: "flex", justifyContent: "flex-end", paddingRight:24}}>
        <div style={{display: "flex", marginRight: 30}}>
          {mySysItemList && mySysItemList.length?
            <Dropdown.Button trigger={["click"]} overlay={menu} icon={<Icon type="project" />}>
            {houseInfo?houseInfo.housingEstateName:''}</Dropdown.Button>:null}
        </div>
        <div onClick={this.handlenOutLogin.bind(this)} style={{cursor:"pointer"}}>
          <Icon type="logout" style={{fontSize: 20}} />
          <span>退出</span>
        </div>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSysItemList, getHouse, getItemByAccount}, dispatch)
  }
}

function mapStateProps(state){
  return {
    mySysItemList: state.app.mySysItemList,
    houseInfo: state.app.houseInfo
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Head))

