import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Tabs, Table, Select, Form, Button, Icon, Input} from "antd";
import JCard from "@/components/JCard"
import {getPlateRecord, getPowerOrder,controlSlectLog, selectListDoor} from "@/actions/otherAction"
import {loadCarparkList} from "@/actions/appAction"
import {powerOrderColumns, plateRecordColumns, controlPassColumns} from "../colmuns"
import MySearch from "@/components/MySearch"

const {TabPane} = Tabs
const {Option} = Select

class Record extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: "1",
      carparams: {
        current: 1,
      },
      powerparams: {
        current: 1,
        useType: "",
        orderStatus:""
      },
      controlParams: {
        current: 1,
        cardNumber: "",
        controlId:"",
        throughType:"",
      }
    }
  }
  componentDidMount(){
    this.initial(this.state.activeKey, this.state.activeKey=="1"?this.state.carparams:this.state.powerparams)
    this.props.actions.loadCarparkList({})
    this.props.actions.selectListDoor({})
  }
  initial(type, params){
    if(type==="1"){
      this.props.actions.getPlateRecord(params)
    }else if(type==="2"){
      this.props.actions.getPowerOrder(params)
    }else if(type==="3"){
      this.props.actions.controlSlectLog(params)
      
    }
  }
  handlenSwitch(key){
    this.setState({activeKey: key})
    this.initial(key,key=="1"?this.state.carparams:this.state.powerparams)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {activeKey, carparams, powerparams} = this.state
        if(activeKey==1){
          carparams.license = values.license 
          carparams.inOut = values.inOut 
          carparams.parkId = values.parkId 
          this.setState({carparams})
        }else if(activeKey == 2){
          powerparams.useType = values.useType
          powerparams.orderStatus = values.orderStatus 
          this.setState({powerparams})
        }
        this.initial(activeKey, activeKey==1?carparams:powerparams)
      }
    });
  }

  handleSearch(values){
    const {controlParams, activeKey } = this.state
    controlParams.cardNumber = values.cardNumber 
    controlParams.controlId = values.controlId 
    controlParams.throughType = values.throughType 
    this.setState({controlParams})
    this.initial(activeKey, controlParams)
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, recordpower, recordcar, loadcarpark, controldevices, slectLog} = this.props
    const {activeKey, powerparams, carparams, controlParams} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Tabs 
            activeKey={activeKey}
            onChange={this.handlenSwitch.bind(this)}
          >
            <TabPane key="1" tab="车辆通行日志" />
            <TabPane key="2" tab="充电订单日志" />
            <TabPane key="3" tab="门禁日志" />
          </Tabs>
          {activeKey=="1"?<div>
            <div className="flexend mgb10">
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
              <Form.Item label="车牌号码" >
                  {getFieldDecorator('license',{
                    initialValue: ""
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="停车场" >
                  {getFieldDecorator('parkId',{
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      {loadcarpark?loadcarpark.map(item=>(
                        <Option key={item.id} value={item.id}>{item.carparkName}</Option>
                      )):null}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="状态">
                  {getFieldDecorator('inOut', {
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="1">进口</Option>
                      <Option value="2">出口</Option>
                      <Option value="3">异常</Option>
                      <Option value="4">待支付</Option>
                      <Option value="5">已支付</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                </Form.Item>
              </Form>
            </div>
            <Table bordered columns={plateRecordColumns} dataSource={recordcar?utils.addIndex(recordcar.list):[]}
              pagination={utils.Pagination(recordcar, page=>{
                carparams.current = page
                this.setState({carparams})
                this.initial(activeKey, carparams)
              })}/>
            </div>:null}
          {activeKey=="2"?<div>
            <div className="flexend mgb10">
              <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="支付类型" >
                  {getFieldDecorator('useType',{
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="W">微信</Option>
                      <Option value="C">充点卡</Option>
                      <Option value="G">智联万家</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="订单状态">
                  {getFieldDecorator('orderStatus', {
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="0">待充电</Option>
                      <Option value="1">充电中</Option>
                      <Option value="2">充电完成</Option>
                      <Option value="3">充电失败</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                </Form.Item>
              </Form>
            </div>
            <Table bordered columns={powerOrderColumns} dataSource={recordpower?utils.addIndex(recordpower.list):[]} 
            pagination={utils.Pagination(recordpower, page=>{
              powerparams.current = page
              this.setState({powerparams})
              this.initial(activeKey, powerparams)
            })}/>
          </div>:null}
          {activeKey=="3"?<div>
            <div className="flexend mgb10">
              <MySearch  
                data={[
                  {label: "门禁卡号", field: "cardNumber"},
                  {label: "控制器设备", field: "controlId",  type: "select", title: "doorName", value: "id", list: controldevices},
                  {label: "控制器设备", field: "throughType",  type: "select", title: "name", value: "value", list: [
                    
                    {name: "一卡通行", value: "1"},
                    {name: "二维码", value: "2"},
                    {name: "密码", value: "3"},
                    {name: "手机开门", value: "4"},
                  ]},
                ]}
                handleSearch={this.handleSearch.bind(this)}

              />
              {/* <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="门禁卡号" >
                  {getFieldDecorator('cardNumber',{
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="控制器设备" >
                  {getFieldDecorator('controlId',{
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      {controldevices?controldevices.map(item=>(
                        <Option value={item.id} key={item.id}>{item.doorName}</Option>
                      )):null}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="通行类型">
                  {getFieldDecorator('throughType', {
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="1">一卡通行</Option>
                      <Option value="2">二维码</Option>
                      <Option value="3">密码</Option>
                      <Option value="3">手机开门</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                </Form.Item>
              </Form> */}
            </div>
            <Table bordered columns={controlPassColumns} dataSource={slectLog?utils.addIndex(slectLog.list):[]} 
            pagination={utils.Pagination(slectLog, page=>{
              controlParams.current = page
              this.setState({controlParams})
              this.initial(activeKey, controlParams)
            })}/>
          </div>:null}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlateRecord, getPowerOrder, loadCarparkList, controlSlectLog, selectListDoor}, dispatch)
  }
}

function mapStateProps(state){
  return {
    controldevices: state.other.controldevices,
    slectLog: state.other.slectLog,
    loadcarpark: state.app.loadcarpark,
    recordcar: state.other.recordcar,
    recordpower: state.other.recordpower,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Record) )