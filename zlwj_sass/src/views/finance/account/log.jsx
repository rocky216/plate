import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import {getAccountLog } from "@/actions/financeAction"
import JCard from "@/components/JCard"
import {accountLogColmuns} from "../colmuns"

class AccountLog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1,
        accountId: props.match.params.id,
        pageSize: 15
      }
    }
  }

  componentDidMount(){
    this.props.actions.getAccountLog(this.state.params)
  }

  render(){
    const {spinning,utils, accountLog} = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" title="日志记录" extra={<Link to="/finance/account"><Button><Icon type="rollback" />返回</Button></Link>} >
          <Table
            size="small"
            columns={accountLogColmuns}
            dataSource={accountLog?utils.addIndex(accountLog.list):[]}
            pagination={utils.Pagination(accountLog, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getAccountLog(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAccountLog}, dispatch)
  }
}

function mapStateProps(state){
  return {
    accountLog: state.finance.accountLog,
    spinning: state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AccountLog)