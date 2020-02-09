import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {withRouter} from "react-router-dom"
import {Layout, Icon, Button, Dropdown, Menu, Modal, Badge} from "antd"
import {goLoginOut, getNoticeNum} from "@/actions/appAction" 
import "./style.less"

const {Header} = Layout
const { confirm } = Modal;
let timer = null
class Head extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount(){
    // if(NOTICE=="pro"){
    //   timer && clearInterval(timer)
    //   timer = setInterval(()=>{
    //     this.initial()
    //   }, 3000)
    // }
    this.initial()
    
  }
  initial(){
    this.props.actions.getNoticeNum({}, res=>{
      this.setState({count: res})
    })
  }

  handlenToggle(collapsed){
    collapsed?this.props.actions.setCollapsedFalse():this.props.actions.setCollapsedTrue()
  }
  handleMenuClick({key}){
    console.log(key)
  }

  loginOut(){
    let _this = this
    confirm({
      title: '是否退出?',
      content: '退出后需重新登录',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _this.props.actions.goLoginOut({}, res=>{
          _this.props.history.push("/login")
        })
        
      }
    });
  }

  render(){
    const {collapsed} = this.props
    const {count} = this.state


    return (
      <Header style={{ background: '#1e9eff', padding: 0}} >
        <div className="header">
          <div className="left">
            <div className="logo">
              <img src={require("@/assets/images/system-logo.png")} style={{width: "50%"}} />
            </div>
            <div className="mgl10">
              <img src={require("@/assets/images/system-name.png")} />
            </div>
          </div>
          
          
          <div className="right">
            <ul className="rightUl">
              <li style={{paddingTop: 2, marginRight: 10}}>
                <Link to="/other/news">
                  <Badge count={count?count:0} offset={[5,0]} showZero={true} >
                    <Icon type="message" style={{color: "#fff"}}  />
                  </Badge>
                </Link>
              </li>
              <li onClick={this.loginOut.bind(this)}>
                <i className="icon iconfont icon-tuichudenglu"></i>
              </li>
            </ul>
          </div>
        </div>
      </Header>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({goLoginOut, getNoticeNum}, dispatch)
  }
}

function mapStateProps(state){
  return {
    collapsed: state.app.collapsed
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Head) )