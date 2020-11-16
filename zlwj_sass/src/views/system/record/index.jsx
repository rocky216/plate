import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Tabs, Table, Select, Form, Button, Icon, Input, Cascader, Col, Row, Alert, DatePicker} from "antd";
import JCard from "@/components/JCard"
import {getPlateRecord, getPowerOrder} from "@/actions/otherAction"
import {getAllplateRecord, getAllPowerOrder} from "@/actions/systemAction"
import {getCompanyProject} from "@/actions/appAction"
import {powerOrderColumns, plateRecordColumns} from "../colmuns"
import moment from "moment";
import MySearch from "@/components/MySearch"

const {TabPane} = Tabs
const {Option} = Select
const {RangePicker} = DatePicker

class Record extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: "1",
      carparams: {
        current: 1,
        startTime: "",
        endTime: ""
      },
      powerparams: {
        current: 1,
        useType: "",
        status:"",
        startTime: "",
        endTime: ""
      },
      statustab: [
        {name: "充电中", value: "1"},
        {name: "设备异常无法启动订单", value: "2"},
        {name: "订单无负载未启动", value: "3"},
        {name: "订单负载丢失结束", value: "4"},
        {name: "订单正常结束", value: "5"},
        {name: "订单过载结束", value: "6"},
        {name: "订单设备重启结束", value: "7"},
      ],
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
      statiscartab: [
        {title: "已支付订单", key: "paidCount"},
        {title: "待支付订单", key: "unpaidConut"},
        {title: "异常待支付订单", key: "exceptionConut"},
        {title: "已收金额", key: "paidAmountSum"},
        {title: "系统未收到金额", key: "unpaidAmountSum"},
      ],
    }
  }
  componentDidMount(){
    this.initial(this.state.activeKey, this.state.activeKey=="1"?this.state.carparams:this.state.powerparams)
    this.props.actions.getCompanyProject({isLoad:"carpark"})
  }
  initial(type, params){
    if(type==="1"){
      this.props.actions.getAllplateRecord(params)
      this.props.actions.getCompanyProject({isLoad:"carpark"})
    }else if(type==="2"){
      this.props.actions.getAllPowerOrder(params)
      this.props.actions.getCompanyProject({})
    }
  }
  handlenSwitch(key){
    this.setState({activeKey: key})
    this.initial(key,key=="1"?this.state.carparams:this.state.powerparams)
  }
  handleSubmit(values){
    const {activeKey, carparams, powerparams} = this.state
    const {time} = values
    
    if(activeKey==1){
      const {park} =values
      carparams.license = values.license 
      carparams.inOut = values.inOut 
      carparams.companyId = park && park.length?park[0]:""
      carparams.heId = park && park.length>1?park[1]:""
      carparams.parkId = park && park.length>2?park[2]:""
      carparams.startTime = time && time.length>0?moment(time[0]).format("YYYY-MM-DD"):""
      carparams.endTime = time && time.length>0?moment(time[1]).format("YYYY-MM-DD"):""
      this.setState({carparams})
    }else if(activeKey == 2){
      const {project} = values
      powerparams.companyId = project && project.length?project[0]:""
      powerparams.heId = project && project.length>1?project[1]:""
      powerparams.useType = values.useType
      powerparams.status = values.status 
      powerparams.startTime = time && time.length>0?moment(time[0]).format("YYYY-MM-DD"):""
      powerparams.endTime = time && time.length>0?moment(time[1]).format("YYYY-MM-DD"):""
      this.setState({powerparams})
    }
    this.initial(activeKey, activeKey==1?carparams:powerparams)
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, allpowerecord, allcardrecord, companyPro } = this.props
    const {activeKey, powerparams, carparams, statustab, statistab, statiscartab} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Tabs 
            activeKey={activeKey}
            onChange={this.handlenSwitch.bind(this)}
          >
            <TabPane key="1" tab="车辆通行日志" />
            <TabPane key="2" tab="充电订单日志" />
          </Tabs>
          {activeKey=="1"?<div>
            <div className="flexend mgb10">
            <MySearch
              data={[
                {label: "时间", field: "time", type: "rangePicker"},
                {label: "停车场", field: "park", type: "cascader", options: companyPro, 
                fieldNames: { label: 'name', value: 'id' }, style: {width: 220} },
                {label: "状态", field: "inOut", type: "select", list: [
                  {title: "进口", value: "1"},
                  {title: "出口", value: "2"},
                  {title: "异常", value: "3"},
                  {title: "待支付", value: "4"},
                  {title: "已支付", value: "5"},
                ],  style:{width: 200} },
              ]}
              handleSearch={this.handleSubmit.bind(this)}
            />
            </div>
            <Table bordered columns={plateRecordColumns} dataSource={allcardrecord?utils.addIndex(allcardrecord.page.list):[]}
              pagination={allcardrecord?utils.Pagination(allcardrecord.page, page=>{
                carparams.current = page
                this.setState({carparams})
                this.initial(activeKey, carparams)
              }):false}/>
              {allcardrecord? 
              <Alert className="mgt10" message={(
                <div style={{display: "flex"}}>
                  {statiscartab.map((item, index)=>(
                    <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{allcardrecord[item.key]}</span></Button> 
                  ))}
                </div>
              )} />:null}
            </div>:null}
          {activeKey=="2"?<div>
            <div className="flexend mgb10">
              <MySearch
                data={[
                  {label: "时间", field: "time", type: "rangePicker"},
                  {label: "支付类型", field: "useType", type: "select", list: [
                    {title: "微信", value: "W"},
                    {title: "充点卡", value: "C"},
                    {title: "智联万家", value: "G"},
                  ]},
                  {label: "项目", field: "project", type: "cascader", options: companyPro, 
                  fieldNames: { label: 'name', value: 'id' }, style: {width: 220} },
                  {label: "订单状态", field: "status", type: "select", list: statustab, title: "name", style:{width: 200} },
                ]}
                handleSearch={this.handleSubmit.bind(this)}
              />
              
            </div>
            <Table bordered columns={powerOrderColumns} dataSource={allpowerecord?utils.addIndex(allpowerecord.data.list):[]} 
            pagination={allpowerecord?utils.Pagination(allpowerecord.data, page=>{
              powerparams.current = page
              this.setState({powerparams})
              this.initial(activeKey, powerparams)
            }):false}/>
            {allpowerecord?<Alert className="mgb10" message={statistab.map(item=>(
              <Button type="link" key={item.key}>{item.title} <span className="mgl10" style={{color: "red"}}>{allpowerecord[item.key]}</span></Button>
            ))} />:null}
          </div>:null}
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlateRecord, getPowerOrder, getCompanyProject, getAllplateRecord, getAllPowerOrder}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allpowerecord: state.system.allpowerecord,
    allcardrecord: state.system.allcardrecord,
    companyPro: state.app.companyPro,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Record) )