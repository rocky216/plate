import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Alert, Button, Table, DatePicker, Form, Select} from "antd";
import {getChargStatistics, getPileDeviceLog} from "@/actions/centerAction"
import {pileStatisColumns} from "../colmuns"
import moment from "moment";

const {Option} = Select;
const {RangePicker} = DatePicker

let params = {
  current: 1,
  startTime: "",
  endTime: "",
  status: "",
}

class CenterPileOrderStatis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statis: "",
      statistab: [
        {title: "实际扣款订单", key: "truePay"},
        {title: "微信支付收入", key: "wxPay"},
        {title: "一卡通支付收入", key: "cPay"},
        {title: "充电中", key: "charging"},
        {title: "订单正常结束", key: "normal"},
        {title: "设备异常无法启动订单", key: "noStart"},
        {title: "设备无负载未启动(未扣款)", key: "noLoad"},
        {title: "设备负载丢失结束(已扣款)", key: "load"},
        {title: "设备重启结束", key: "restart"},
        {title: "设备过载结束", key: "overload"},
      ],
      statustab: [
        {name: "充电中", value: "1"},
        {name: "设备异常无法启动订单", value: "2"},
        {name: "订单无负载未启动", value: "3"},
        {name: "订单负载丢失结束", value: "4"},
        {name: "订单正常结束", value: "5"},
        {name: "订单过载结束", value: "6"},
        {name: "订单设备重启结束", value: "7"},
      ]
    }
  }
  
  componentDidMount(){
    // this.props.actions.getChargStatistics(params, res=>{
    //   this.setState({statis: res})
    // })
    this.props.actions.getPileDeviceLog(params)
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {time, status} = values
        params.current=1
        params.startTime = time && time.length>0?moment(time[0]).format("YYYY-MM-DD"):""
        params.endTime = time && time.length>0?moment(time[1]).format("YYYY-MM-DD"):""
        params.status = status
        this.props.actions.getPileDeviceLog(params)
        this.props.actions.getChargStatistics(params, res=>{
          this.setState({statis: res})
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, pilestatis} = this.props
    const {tabs, statis, statistab, statustab} = this.state;

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
          <Form.Item label="状态" >
            {getFieldDecorator('status', {
              initialValue: ""
            })(
              <Select style={{width: 200}}>
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
        {pilestatis?<Alert className="mgb10" message={statistab.map(item=>(
          <Button type="link" key={item.key}>{item.title} <span className="mgl10" style={{color: "red"}}>{pilestatis[item.key]}</span></Button>
        ))} />:null}
        
        <Table columns={pileStatisColumns} dataSource={pilestatis?utils.addIndex(pilestatis.data.list):[]} 
        pagination={pilestatis?utils.Pagination(pilestatis.data, page=>{
          params.current = page
          this.props.actions.getPileDeviceLog(params)
        }):false}/>
      </>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getChargStatistics, getPileDeviceLog}, dispatch)
  }
}

function mapStateProps(state){
  return {
    pilestatis: state.center.pilestatis,
    spinning: state.center.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(CenterPileOrderStatis) )