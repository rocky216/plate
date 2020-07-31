import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Form, DatePicker, Select, Row, Col, Alert } from "antd";
import JCard from "@/components/JCard";
import {bookExportinfo, loadAccount} from "@/actions/financeAction"
import moment from "moment"
import {bookColumns} from "../colmuns"
import "./index.less"

const {Option} = Select;

let params = {
  accountId: "",
  startTime: "2020-07-01",//moment().format("YYYY-MM-DD"),
  endTime: moment().format("YYYY-MM-DD"),
}

class FinanceBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  

  async componentDidMount(){
    let data = await this.props.actions.loadAccount({})
    if(data.length){
      params.accountId = data[0]["id"]
      this.props.actions.bookExportinfo(params)
    }
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {accountId, startTime, endTime} = values;
      params.accountId = accountId
      params.startTime = startTime?moment(startTime).format("YYYY-MM-DD"):""
      params.endTime = endTime?moment(endTime).format("YYYY-MM-DD"):""
      this.props.actions.bookExportinfo(params)
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
            </ul>
            {row.child.map((item, index)=>(
              <ul key={index}>
                <li>{index+1}</li>
                <li>{item.detailsName}</li>
                <li>{item.detailsStandard}</li>
              </ul>
            ))}
            <ul>
              <li style={{width: "100%", textAlign: "center"}}>【活动】{row.activeName || "暂无"}</li>
            </ul>
            <ul>
              <li style={{width: "75%"}}>订单备注：{row.remark}</li>
              <li style={{width: "25%"}}>合计：{row.linkMoeny}</li>
            </ul>
          </div>
      </div>
    )
    
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
              {getFieldDecorator('accountId', {
                initialValue: params.accountId
              })(
                <Select style={{width: 150}}>
                  {myaccount?myaccount.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="开始时间">
              {getFieldDecorator('startTime', {
                initialValue: moment(params.startTime)
              })(
                <DatePicker/>
              )}
            </Form.Item>
            <Form.Item label="结束时间">
              {getFieldDecorator('endTime', {
                initialValue: moment(params.endTime)
              })(
                <DatePicker/>
              )}
            </Form.Item>
            <Form.Item>
              <Button icon="search" htmlType="submit" type="primary">搜索</Button>
            </Form.Item>
          </Form>

          <Table columns={bookColumns} dataSource={book?utils.addIndex(book.allList):[]} pagination={false} 
            expandedRowRender={record=>{
              return this.createTable(record)
            }}
          />
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