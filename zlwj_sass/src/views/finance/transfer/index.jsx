import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Form, Input, Select} from "antd";
import JCard from "@/components/JCard"
import {getTransferRecord, getAccountTurns} from "@/actions/financeAction"
import {transferColumns} from "../colmuns"
import AddFinanceTransfer from "./add"

const {Option} = Select;

let params = {
  current: 1,
  orderNo: "",
  inAccountId: ""
}

class FinanceTransfer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }
  

  componentDidMount(){
    this.props.actions.getTransferRecord(params)
    this.props.actions.getAccountTurns({})
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      params.orderNo = values.orderNo
      params.inAccountId = values.inAccountId
      this.props.actions.getTransferRecord(params)
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, transfer, accounturns} = this.props
    const {visible} = this.state;

    return (
      <JCard spinning={spinning}>
        <AddFinanceTransfer visible={visible} onCancel={()=>this.setState({visible: false})} />

        <Card size="small" title={<Button icon="plus" type="primary" 
          onClick={()=>this.setState({visible: true})} >新增记录</Button>}>

          <Form className="flexend mgb10" layout="inline" onSubmit={this.handleSearch.bind(this)} >
            <Form.Item label="转账单号">
              {getFieldDecorator("orderNo")(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label="入账资金账户">
              {getFieldDecorator("inAccountId", {
                initialValue: ""
              })(
                <Select style={{width: 180}}>
                  <Option value="">全部</Option>
                  {accounturns?accounturns.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button icon="search" type="primary" htmlType="submit" >搜索</Button>
            </Form.Item>
          </Form>

          <Table columns={transferColumns} dataSource={transfer?utils.addIndex(transfer.list):[]} 
            pagination={utils.Pagination(transfer, page=>{
              params.current = page
              this.props.actions.getTransferRecord(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTransferRecord, getAccountTurns}, dispatch)
  }
}

function mapStateProps(state){
  return {
    accounturns: state.finance.accounturns,
    transfer: state.finance.transfer,
    spinning: state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(FinanceTransfer) )