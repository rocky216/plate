import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withRouter, Link} from "react-router-dom"
import {Layout, Icon, Button, Dropdown, Menu, Modal} from "antd"
import {setCollapsedTrue, setCollapsedFalse, goLoginOut, getBaseInfo, updateNowHe, getCommonFile} from "@/actions/appAction"
import "./style.less"

const {Header} = Layout
const { confirm } = Modal;

class Head extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      proName: '选择小区'
    }
  }
  componentDidMount(){
    this.props.actions.getCommonFile({})
    this.props.actions.getBaseInfo({}, res=>{
      this.setState({proName: res.heList.length?res.heList[0]["name"]:"暂无"})
    })
  }

  

  handlenToggle(collapsed){
    collapsed?this.props.actions.setCollapsedFalse():this.props.actions.setCollapsedTrue()
  }
  handleMenuClick({key}){
    let obj = _.filter(this.props.baseInfo.heList, o=>o.id==key)[0]
    if(obj.key == key) return;
    this.setState({proName: obj.name})
    this.props.actions.updateNowHe({
      heId: key
    },res=>{
      this.props.utils.OpenNotification("success")
      this.props.history.push("/")
    })
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
          _this.props.utils.removeCookie("token")
        })
        
      }
    });
  }

  render(){
    const {collapsed, baseInfo} = this.props
    const {proName} = this.state

    const menu = (
      <Menu theme="dark" onClick={this.handleMenuClick.bind(this)}>
        {baseInfo && baseInfo.heList? baseInfo.heList.map(item=>(
          <Menu.Item key={item.id}> <Icon type="project" />{item.name}</Menu.Item>
        )):null}
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handlenToggle.bind(this, collapsed)}
        />
        <div className="header_right">
          <Dropdown.Button overlay={menu} icon={<Icon type="project" />}>
            {proName}
          </Dropdown.Button>

          <Button style={{margin: "10px 0 0 30px"}} type="link">
            <Link to="/user/person" style={{display: "flex"}}>
              {baseInfo && baseInfo.userInfo.headUrl?<img src={baseInfo.userInfo.headUrl} style={{width: 36, height: 36, borderRadius: "50%"}} />:
              <i className="icon iconfont icon-touxiang" style={{fontSize: 30}} />}
                <span style={{margin: "10px 0 0 5px"}}>{baseInfo?baseInfo.userInfo.nickname:''}</span>
            </Link>
          </Button>

          <Button type="link" onClick={this.loginOut.bind(this)} style={{margin: "15px 10px 0 0"}}>
            <Icon type="logout" />
            <span>退出</span>
          </Button>
        </div>
      </Header>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({setCollapsedTrue, setCollapsedFalse, goLoginOut, getBaseInfo, updateNowHe, getCommonFile}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    collapsed: state.app.collapsed,
    utils: state.app.utils
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Head) )