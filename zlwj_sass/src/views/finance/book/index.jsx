import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Form, DatePicker, Select, Row, Col, Alert, Icon, Tabs, Tag, Cascader} from "antd";
import JCard from "@/components/JCard";
import {bookExportinfo, loadAccount} from "@/actions/financeAction"
import moment from "moment"
import {bookColumns} from "../colmuns"
import "./index.less"
import {CreateTable, CreateOtherTable, CreateEndFixTable} from "./data"


const {Option} = Select;
const { TabPane } = Tabs;

let params = {
  heId: "",
  accountId: "",
  startTime: null,
  endTime: null,
}

class FinanceBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  

  async componentDidMount(){
    let data = await this.props.actions.loadAccount({})
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const {accountId, startTime, endTime, account} = values;
        params.heId = account?account[0]:""
        params.accountId = account?account[1]:""
        params.startTime = startTime?moment(startTime).format("YYYY-MM-DD"):""
        params.endTime = endTime?moment(endTime).format("YYYY-MM-DD"):""
        this.props.actions.bookExportinfo(params)
      }
    });
  }

  getParams(){
    const {utils} = this.props
    return `?token=${utils.getCookie("token")}&accountId=${params.accountId}&startTime=${params.startTime}&endTime=${params.endTime}`
  }

  createTable(row){
    return (
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <div className="bookchild">
            <ul>
              <li>详情编号</li>
              <li>详情名称</li>
              <li>详情收费标准</li>
              <li>详情总额</li>
            </ul>
            {row.child.map((item, index)=>(
              <ul key={index}>
                <li>{index+1}</li>
                <li>{item.detailsName}</li>
                <li>{item.detailsStandard}</li>
                <li>{item.detailsMoeny}</li>
              </ul>
            ))}
            <ul>
              <li style={{width: "75%", textAlign: "center"}}>【活动】{row.activeName || "暂无"}</li>
              <li style={{width: "25%"}}>{row.moneyReward || 0}</li>
            </ul>
            <ul>
              <li style={{width: "75%"}}>订单备注：{row.remark}</li>
              <li style={{width: "25%"}}>合计：{row.linkMoeny}</li>
            </ul>
          </div>
      </div>
    )
    
  }
  print(){
    return {
      title: "打印信息",
      render(item, rows){
        return (
          <div>
            <Tag>{item.orderPrinting}</Tag>
            <Tag>{item.orderTime}</Tag>
            <Tag>打印次数：{item.orderNum}</Tag>
          </div>
        )
      }
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, myaccount, book} = this.props 
    
    return (
      <JCard spinning={spinning} >
        <Card size="small" title={book?(
          <a href={`/api/pc/accountLog/export${this.getParams()}`}>
            <Button icon="export" type="danger" ghost >导出台账</Button>
          </a>
        ):null}
        >
          {book?(
            <Alert className="mgb10" message={(
              <Row>
                {book.list.map((item, index)=>(
                  <Col span={3} key={index}>{item}</Col>
                ))}
              </Row>
            )} type="success" />
          ):null}

          

          <Form className="flexend mgb10" layout="inline" onSubmit={this.handleSearch.bind(this)}>
            
            <Form.Item label="资金账户">
              {getFieldDecorator('account', {
                initialValue: params.accountId?[params.heId, params.accountId]:"",
                rules: [{required: true,message: '资金账户!'}],
              })(
                <Cascader 
                  style={{width:250}}
                  fieldNames={{label: "name", value: "id", children: "faAssetAccountList"}} 
                  options={myaccount?myaccount:[]} />
              )}
            </Form.Item>
            <Form.Item label="开始时间">
              {getFieldDecorator('startTime', {
                initialValue: params.startTime?moment(params.startTime):null,
                rules: [{required: true,message: '开始时间!'}],
              })(
                <DatePicker/>
              )}
            </Form.Item>
            <Form.Item label="结束时间">
              {getFieldDecorator('endTime', {
                initialValue: params.endTime?moment(params.endTime):null,
                rules: [{required: true,message: '结束时间!'}],
              })(
                <DatePicker/>
              )}
            </Form.Item>
            <Form.Item>
              <Button icon="search" htmlType="submit" type="primary">搜索</Button>
            </Form.Item>
          </Form>
          <Tabs>
              <TabPane tab="物业费订单" key="pro" >
                <Table columns={bookColumns.concat([
                  {
                    title: "资产面积",
                    dataIndex: "assetArea"
                  },
                  {
                    title: "缴费时间段",
                    dataIndex: "startTIme",
                    render:(item, rows)=>`${item?item.substring(0,10):""}到${rows.startTIme?rows.startTIme.substring(0,10):""}`
                  },
                  this.print()
                ])} dataSource={book?utils.addIndex(book.pro):[]} pagination={false} 
                  expandedRowRender={record=>{

                    return <CreateTable row={record}/>
                  }}
                  rowClassName={record=>{
                    if(
                      record.linkType.indexOf("close")>-1 
                      || record.linkType.indexOf("Error")>-1 
                      || record.linkType=="fixPlanDeposit"
                    ) return 'noExpand'
                    
                  }}
                />
              </TabPane>
              <TabPane tab="其他缴费订单" key="owOrder" >
                <Table columns={bookColumns.concat([{
                  title: "订单标题",
                  dataIndex: "orderTitle"
                }, this.print() ])} dataSource={book?utils.addIndex(book.owOrder):[]} pagination={false} 
                  expandedRowRender={record=>{
                    return <CreateOtherTable row={record} />
                  }}
                  rowClassName={record=>{
                    if(
                      record.linkType.indexOf("close")>-1 
                      || record.linkType.indexOf("Error")>-1 
                      || record.linkType=="fixPlanDeposit"
                    ) return 'noExpand'
                    
                  }}
                />
              </TabPane>
              <TabPane tab="其他支出订单" key="payOrder">
                <Table columns={bookColumns.concat([{
                  title: "订单标题",
                  dataIndex: "orderTitle"
                },
                {
                  title: "审核人",
                  dataIndex: "reviewer"
                },
                {
                  title: "审核说明",
                  dataIndex: "auditInstructions"
                },
                {
                  title: "审核时间",
                  dataIndex: "reviewerTime"
                },
              ])} dataSource={book?utils.addIndex(book.payOrder):[]} pagination={false} 
                  expandedRowRender={record=>{
                    return <CreateOtherTable row={record} />
                  }}
                  rowClassName={record=>{
                    if(
                      record.linkType.indexOf("close")>-1 
                      || record.linkType.indexOf("Error")>-1 
                      || record.linkType=="fixPlanDeposit"
                    ) return 'noExpand'
                    
                  }}
                />
              </TabPane>
              <TabPane tab="装修计划履约金" key="fix" >
                <Table columns={_.slice(bookColumns, 0,6).concat([
                  {
                    title: "押金说明",
                    dataIndex: "depositInfo"
                  },
                  {
                    title: "关联人",
                    dataIndex: "relatedPerson"
                  },
                  {
                    title: "关联信息",
                    dataIndex: "information"
                  },
                  this.print()
                ])} dataSource={book?utils.addIndex(book.fix):[]} pagination={false} />
              </TabPane>
              <TabPane tab="装修计划结算单" key="endFixPlan">
                <Table columns={_.slice(bookColumns, 0,6).concat([,
                {
                  title: "关联人",
                  dataIndex: "relatedPerson"
                },
                {
                  title: "关联信息",
                  dataIndex: "information"
                },
                this.print()
              ])} dataSource={book?utils.addIndex(book.endFixPlan):[]} pagination={false} 
                  expandedRowRender={record=>{
                    return <CreateEndFixTable row={record} />
                  }}
                  rowClassName={record=>{
                    if(
                      record.linkType.indexOf("close")>-1 
                      || record.linkType.indexOf("Error")>-1 
                      || record.linkType=="fixPlanDeposit"
                    ) return 'noExpand'
                    
                  }}
                />
              </TabPane>
              <TabPane tab="异常订单" key="close">
                <Table columns={_.slice(bookColumns, 0,6).concat([
                {
                  title: "订单标题",
                  dataIndex: "orderTitle"
                },
                {
                  title: "资产面积",
                  dataIndex: "assetArea"
                },
                {
                  title: "提交时间",
                  dataIndex: "reviewerTime"
                },
                {
                  title: "提交人",
                  dataIndex: "abnormal"
                },
                {
                  title: "关闭/异常说明",
                  dataIndex: "abnormalExplain"
                },
                {
                  title: "审核人",
                  dataIndex: "reviewer"
                },
                {
                  title: "审核说明",
                  dataIndex: "auditInstructions"
                },
              ])} dataSource={book?utils.addIndex(book.close):[]} pagination={false} />
              </TabPane>
              <TabPane tab="转账记录" key="turn">
                <Table columns={_.slice(bookColumns, 0,6).concat([
                {
                  title: "转账账户",
                  dataIndex: "turnObject"
                },
                {
                  title: "转账说明",
                  dataIndex: "depositInfo"
                },
                {
                  title: "转账人",
                  dataIndex: "reviewer"
                }
              ])} dataSource={book?utils.addIndex(book.turn):[]} pagination={false} />
              </TabPane>
          </Tabs>
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({bookExportinfo, loadAccount}, dispatch)
  }
}

function mapStateProps(state){
  return {
    book: state.finance.book,
    myaccount: state.finance.myaccount,
    spinning: state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(FinanceBook) )