import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {getAccounts} from "@/actions/financeAction"
import {getHeHousingEstate} from "@/actions/projectAction"
import {accountColmuns} from "../colmuns"
import AddAccount from "./add"
import EditAccount from "./edit"


class FinanceAccount extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: '',
      params: {
        current: 1,
      }
    }
  }
  componentDidMount(){
    this.props.actions.getAccounts(this.state.params)
    this.props.actions.getHeHousingEstate({pageSize: 1000})
  }


  getCol(){
    let _this = this
    return accountColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({editVisible: true, detail:item})} >编辑</Button>
            <Link to={`/finance/account/${item.id}/log`}>
              <Button size="small" type="link" >资金日志</Button>
            </Link>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, account} = this.props
    const {addVisible, editVisible, detail, params} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus"/>新增资金账户</Button>}>
          <AddAccount visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <EditAccount visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ''})} />
          <Table
            size="small"
            columns={this.getCol()}
            dataSource={account?utils.addIndex(account.list):[]}
            pagination={utils.Pagination(account, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getAccounts(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAccounts, getHeHousingEstate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    account: state.finance.account,
    spinning: state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(FinanceAccount)