import React from "react"
import {Switch, Link, Route} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Button,
  Table,
  Select
} from "antd"
import JCard from "@/components/JCard"
import {getAccountList, getRoleList, roleAccountLink} from "@/actions/projectAction"
import {accountColumns} from "../columns"
import {addIndex} from "@/utils"
import AddAccount from "./addAccount"
import Itemass from "./itemass"

const {Option} = Select

class Account extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      assVisible: false,
      detail: '',

    }
  }

  componentDidMount(){
    this.props.actions.getAccountList({})
    this.props.actions.getRoleList()
  }

  handlenItemAss(item){
    this.setState({detail: item, assVisible: true})
  }

  handlenRoleLink(item, value){
    if(value==-1) return
    this.props.actions.roleAccountLink({
      accountId:item.id,
      roleId: value
    },res=>{
      this.props.actions.getAccountList({})
    })
  }

  getCol(){
    let _this = this
    const {roleList} = this.props
    return accountColumns.concat([{
      title: "角色关联",
      render(item){
        return (
          <Select defaultValue={item.sysRoleList.length?item.sysRoleList[0]["roleId"]:''} style={{width: 130}} onChange={_this.handlenRoleLink.bind(_this, item)}>
            {roleList && roleList.length?roleList.map(item=>(
              <Option key={item.roleId} value={item.roleId}>{item.roleName}</Option>
            )):null}
          </Select>
        )
      }
    },{
      title: "操作",
      width: 180,
      render(item){
        return (
          <div>
            <a type="link" className="mgr10">修改密码</a>
            <a type="link" className="mgr10" onClick={_this.handlenItemAss.bind(_this, item)}>项目关联</a>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, accountList} = this.props
    const {assVisible, detail} = this.state
    return (
      <JCard spinning={spinning}>
        <div>
          <Itemass assVisible={assVisible} detail={detail} onCancel={()=>this.setState({assVisible: false})} />
          <div className="mgb10">
            <Switch>
              <Route path="/project/account/add" component={AddAccount} />
            </Switch>
          </div>
          <Card 
            size="small"
            title={<Button type="primary"><Link to="/project/account/add">添加账户</Link></Button>}>
              <Table columns={this.getCol()} dataSource={addIndex(accountList?accountList:[])} />
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAccountList, getRoleList, roleAccountLink}, dispatch)
  }
}

function mapStateProps(state){
  return {
    roleList: state.project.roleList,
    accountList: state.project.accountList,
    spinning: state.project.spinning,
  }
}

export default connect(mapStateProps, mapDispatchProps)(Account)