import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Table, Popconfirm, Input, DatePicker, Select, Upload, Form} from "antd";
import JCard from "@/components/JCard"
import {getPlanInfo, selectUserList, deleteAttaCheck, getAccount, accomplishPlan, settleDeposit, 
  DepositCountPrint, uploadPlanSingle} from "@/actions/otherAction"
import "../../workcenter/trim/index.less"
import {inspectionColumns, depositColumns, deductColumns} from "../../workcenter/colmuns"
import {PrintSettle, DepositSettle} from "../../workcenter/trim/print"
import moment from 'moment';
import ReactToPrint, {PrintContextConsumer} from 'react-to-print';


const {Option} = Select;


class TrimDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: "",
      depositKey: [1]
    }
  }
  
  componentDidMount(){
    this.props.actions.selectUserList({})
    this.props.actions.getAccount({})
    this.initial()
  }
  initial(){
    this.props.actions.getPlanInfo({
      planId: this.props.match.params.id,
      type: "details"
    }, res=> this.setState({detail: res}))
  }

  render(){
    const {getFieldDecorator } = this.props.form;
    const {utils, spinning, match, accounts, commonFiles} = this.props
    const {detail, depositKey} = this.state
    

    return (
      <JCard spinning={spinning}>
       
        {detail?
        <Card size="small"
          extra={(
          <Link to="/manage/trim">
            <Button icon="rollback">返回</Button>
          </Link>
        )}>
          {detail?<PrintSettle  detail={detail}/>:null}
        </Card>:null}
        <Card
          className="mgt10"
          size="small"
          title="巡查记录"
        >
          <Table size="small" columns={inspectionColumns} dataSource={detail?utils.addIndex(detail.fixPlanCheck):[]} pagination={false} />
        </Card>
        <Card
          className="mgt10"
          size="small"
          title="合计押金"
          extra={(
            <div>
              <span className="mgr10">合计押金：{detail && detail.fixPlan.sumDepositMoney?detail.fixPlan.sumDepositMoney:0}</span>
            </div>
          )}
        >
          {detail?
          <Table size="small" 
            columns={depositColumns} 
            dataSource={detail?utils.addIndex(detail.deposit):[]} 
            pagination={false} 
            expandedRowKeys={depositKey}
            expandedRowRender={record=>(
              <div ref={el=>this['componentRefDeposit'+record.id] = el} >
                <DepositSettle detail={detail} item={record} />
              </div>
            )}
            onExpand={(expanded, record)=>this.setState({depositKey: [record.key]})}
          />:null}
        </Card>
        <Card
          className="mgt10"
          size="small"
          title="违规装修扣费记录"
          extra={(
            <div>
              <span className="mgr10">合计扣费：{detail && detail.fixPlan.sumTearMoney?detail.fixPlan.sumTearMoney:0}</span>
            </div>
          )}
        >
          <Table size="small" columns={deductColumns} dataSource={detail?utils.addIndex(detail.tear):[]} 
            pagination={false}  />
        </Card>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({uploadPlanSingle, DepositCountPrint, getPlanInfo, selectUserList, deleteAttaCheck, getAccount, accomplishPlan, settleDeposit}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles:state.app.commonFiles,
    accounts: state.other.accounts,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(TrimDetail) )