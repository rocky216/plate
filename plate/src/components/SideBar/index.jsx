import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Layout,
  Menu,
  Icon
} from "antd"
import {Link} from "react-router-dom"
import menus from "./menus"
import {getMeunByAccountId} from "@/actions/appAction"

const {Sider } = Layout
const {SubMenu } = Menu

class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      menus
    }
  }

  componentWillMount(){
    this.props.actions.getMeunByAccountId()
  }
  componentWillReceiveProps(nextProps){
  }

  getMenus(key, meunList){
    
    if(this.bBtn(key, meunList)){
      return this.bBtn(key, meunList)
    }else{
      return _.findIndex(meunList, o=>o.perms==key)>-1
    }
    
  }
  bBtn(key, meunList){
    let bBtn = false
    _.each(meunList,item=>{
      let str = item.perms.toString()
      let s = str.substring(0,1)
      if(key == s && _.findIndex(meunList, o=>o.perms==s)==-1){
        bBtn=true
        return
      }
    })
    return bBtn
  }

  render(){
    const {meunList} = this.props
    const {menus} = this.state
    return (
      <Sider trigger={null} collapsible >
        <div className="logo" style={{height: 80}} >
          <img style={{width: "70px", display:"block", margin: "auto"}} src="/images/logo.png" />
        </div>
        {meunList && meunList.length?
        <Menu theme="dark" mode="inline" >
          {menus.map(item=>(
            item.children && item.children.length?
            (this.getMenus(item.key, meunList)?<SubMenu 
                key={item.key} 
                title={<span>
                        <i className={item.icon} style={{fontSize: 18, marginRight:10}} />
                        {item.title}
                      </span>}>
                {item.children.map(elem=>(
                  this.getMenus(elem.key, meunList)? 
                  <Menu.Item key={elem.key}>
                    <Link to={elem.link} replace>
                      <span>{elem.title}</span>
                    </Link>
                  </Menu.Item>:null
                ))}
              </SubMenu>:null)
            :(
              this.getMenus(item.key, meunList)?
              <Menu.Item key={item.key}>
                <Link to={item.link} replace>
                  <i className={item.icon} style={{fontSize: 18, marginRight:10}} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>:null
            )
          ))}
        </Menu>:null}
      </Sider>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getMeunByAccountId}, dispatch)
  }
}

function mapStateProps(state){
  return {
    meunList: state.app.meunList
  }
}

export default connect(mapStateProps, mapDispatchProps)(SideBar)