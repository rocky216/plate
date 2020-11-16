import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Alert, Button, Table, DatePicker, Form, Select} from "antd";
import {getPlateOrder, getListPark } from "@/actions/centerAction"
import {plateStatisColumns} from "../colmuns"
import moment from "moment";

const {Option} = Select;
const {RangePicker} = DatePicker

let params = {
  current: 1,
  startTime: "",
  endTime: "",
  status: "",
  parkId: ""
}

class CenterPlateOrderStatis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statistab: [
        {title: "已支付订单", key: "paidCount"},
        {title: "待支付订单", key: "unpaidConut"},
        {title: "异常待支付订单", key: "exceptionConut"},
        {title: "已收金额", key: "paidAmountSum"},
        {title: "系统未收到金额", key: "unpaidAmountSum"},
      ],
      statustab: [
        {name: "异常", value: "3"},
        {name: "待支付", value: "4"},
        {name: "已支付", value: "5"},
      ]
    }
  }
  
  componentDidMount(){
    this.props.actions.getListPark({})
    this.props.actions.getPlateOrder(params)
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {time, status, parkId} = values
        params.current=1
        params.startTime = time && time.length>0?moment(time[0]).format("YYYY-MM-DD"):""
        params.endTime = time && time.length>0?moment(time[1]).format("YYYY-MM-DD"):""
        params.status = status
        params.parkId = parkId
        this.props.actions.getPlateOrder(params)
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, platestatis, parklist} = this.props
    const {statistab, statustab} = this.state

    return (
      <>
        <Form className="mgb10 flexend" layout="inline">
          <Form.Item label="统计时间" >
            {getFieldDecorator('time', {
              initialValue: params.startTime?[moment(params.startTime), moment(params.endTime)]:null
            })(
              <RangePicker />
            )}
          </Form.Item>
          <Form.Item label="停车场" >
            {getFieldDecorator('parkId', {
              initialValue: ""
            })(
              <Select style={{width: 200}}>
                <Option value="">全部</Option>
                {parklist?parklist.map(item=>(
                  <Option value={item.id} key={item.id}>{item.carparkName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="停车场" >
            {getFieldDecorator('status', {
              initialValue: ""
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                {statustab.map(item=>(
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button icon="search" type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
          </Form.Item>
        </Form>
        {platestatis?<Alert className="mgb10" message={statistab.map(item=>(
          <Button type="link" key={item.key}>{item.title} <span className="mgl10" style={{color: "red"}}>{platestatis[item.key]}</span></Button>
        ))} />:null}
        
        <Table columns={plateStatisColumns} dataSource={platestatis?utils.addIndex(platestatis.page.list):[]} 
        pagination={platestatis?utils.Pagination(platestatis.page, page=>{
          params.current = page
          this.props.actions.getPlateOrder(params)
        }):false}
        />
      </>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlateOrder, getListPark}, dispatch)
  }
}

function mapStateProps(state){
  return {
    parklist: state.center.parklist,
    platestatis: state.center.platestatis,
    spinning: state.center.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(CenterPlateOrderStatis) )