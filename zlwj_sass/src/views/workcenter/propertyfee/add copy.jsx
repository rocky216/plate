import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input, Divider, Row, Col, Modal, DatePicker, Select, Table, Switch} from "antd";
import JCard from "@/components/JCard"
import {initBasePropertyOrder,addInitPropertyfee, countPropertyOrder, addPropertyOrder, getPropertyfee} from "@/actions/otherAction"
import {ownersInfo, houseInfo} from "./data"
import moment from "moment"
import {propertyDetailColmuns} from "../colmuns"

const { RangePicker } = DatePicker;
const {Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

class AddPropertyfee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      owners: "",
      templateList: "",
      accountList: "",
      house: "",
      startTime: "",
      temDetail: []
    }
  }
  componentDidMount(){
    console.log(this.props.houseItem, "houseItemhouseItem")
    this.props.actions.initBasePropertyOrder({
      linkId: this.props.houseItem.id,
      orderType: this.props.houseItem.type,
    }, res=>{
      const {owners, templateList, accountList, house, startTime} = res
      this.setState({owners, templateList, accountList, house, startTime})
    })
  }

  getFreeDetailsIds(){
    const {temDetail} = this.state
    let arr = []
    _.each(temDetail.detailsList, item=>{
      if(item.checked){
        arr.push(item.templateId)
      }
    })
    return arr.join()
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      
      const {houseType, houseId} = this.props
      const {templeId, accountId, endTime} = values
      
      this.props.actions.addPropertyOrder({
        templateId:templeId, 
        accountId, 
        feeEndTime: moment(endTime).format("YYYY-MM-DD"),
        // orderType: houseType,
        houseId: houseId,
        freeDetailsIds: this.getFreeDetailsIds()
      }, res=>{
        this.props.utils.OpenNotification("success")
        this.props.onCancel()
        this.props.actions.getPropertyfee()
      })
    })
  }

  handlenData(key, str){
    if(key=="sex"){
      return str==1?"男":"女"
    }else {
      return str
    }
  }
  handlenHouseData(key, obj){
    let arrKey = key.split(".")
    let val = obj
    _.each(arrKey, item=>{
      val = val[item]
    })
    if(key=="elevatorHouse"){
      return val=="1"?"电梯房":"楼梯房"
    }
    if(key=="heHouseInfo.packingStatus"){
      return val=="0"?"未装修":val=="1"?"装修中":"已装修"
    }
    if(key=="heHouseInfo.payFristTime"){
      let start = obj["heHouseInfo"]["payFristTime"] , end=obj["heHouseInfo"]["payLastTime"]
      if(start && end){
        return start.substring(0,11)+'至'+end.substring(0,11)
      }
      return "无缴费记录"
    }
    return val
  }

  handlenCountMomey(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      if(!err){
        const {houseType, houseId} = this.props
        const {templeId, accountId, endTime} = values
        this.props.actions.countPropertyOrder({
          templeId, 
          endTime: moment(endTime).format("YYYY-MM-DD"),
          houseId: houseId
        }, res=>{
          _.each(res.detailsList, item=>{
            item.oldtotalFee = item.totalFee
          })
          res.orderTotalFee = res.orderTrueFee
          this.setState({temDetail: res})
        })
      }
      
    })
  }

  handlenDiscount(item, type){
    const {temDetail} = this.state
    let str = 0

    let index = _.findIndex(temDetail.detailsList, o=>o.templateId==item.templateId)
    temDetail.detailsList[index]["checked"] = !temDetail.detailsList[index]["checked"]

    if(temDetail.detailsList[index]["checked"]){
      temDetail.detailsList[index]["totalFee"] = (temDetail.detailsList[index]["totalFee"]*((100-temDetail.detailsList[index]["notFixPercentage"])/100)).toFixed(2)
    }else {
      temDetail.detailsList[index]["totalFee"] = temDetail.detailsList[index]["oldtotalFee"]
    }
    _.each(temDetail.detailsList, item=>{
      str+= parseFloat(item.totalFee) 
    })
    temDetail.orderTotalFee = Math.round(str)
    this.setState({temDetail})
  }

  getCol(){
    let _this = this
    return propertyDetailColmuns.concat([{
      title: "操作",
      render(item){
        console.log(item)
        return (
          <div>
            {item.notFixPercentage>0?<Switch size="small" 
              checked={item.checked}
              onChange={_this.handlenDiscount.bind(_this, item)} />:"无操作"}
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, visible, onCancel, showName} = this.props
    const {owners, templateList, accountList, house, startTime, temDetail} = this.state

    return (
      <Modal
      title={showName}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        width={1100}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        
        <Form {...formItemLayout}  >
          {owners?<div className="specialForm">
            <Divider orientation="left" >业主信息</Divider>
            <Row>
              {ownersInfo.map((item, index)=>(
                <Col key={index} span={6}>
                  <Form.Item  label={item.title}>
                    {getFieldDecorator(item.key, {
                      initialValue: owners?this.handlenData(item.key,owners[item.key]):""
                    })(<Input disabled style={{ color: "#333"}} />)}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>:null}
          
          
          <Divider orientation="left" >房屋信息</Divider>
          <Row className="specialForm">
            {houseInfo.map((item, index)=>(
              <Col key={index} span={item.span?item.span:6}>
                <Form.Item  label={item.title}>
                  {getFieldDecorator(item.key, {
                    initialValue: house?this.handlenHouseData(item.key,house):""
                  })(<Input disabled style={{ color: "#333"}} />)}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Divider orientation="left" >缴纳物业费设置</Divider>
          <Row>
            <Col span={7} >
              <Form.Item  label="开始时间">
                {getFieldDecorator("startTime", {
                  initialValue: startTime
                })(<Input disabled />)}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item  label="结束时间">
                {getFieldDecorator("endTime", {
                  rules: [
                    {
                      required: true,
                      message: '选择结束时间!',
                    }
                  ],
                })(<DatePicker disabledDate={(current)=>current && current <= moment(startTime)} />)}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item  label="选择账户">
                {getFieldDecorator("accountId", {
                  initialValue: accountList.length?accountList[0]["id"]:"",
                  rules: [
                    {
                      required: true,
                      message: '选择选择账户!',
                    }
                  ],
                })(
                  <Select>
                    {accountList?accountList.map(item=>(
                      <Option key={item.id} value={item.id} >{item.name}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item  label="选择收费模板">
                {getFieldDecorator("templeId", {
                  initialValue: templateList.length?templateList[0]["id"]:"",
                  rules: [
                    {
                      required: true,
                      message: '选择收费模板!',
                    }
                  ],
                })(
                  <Select>
                    {templateList?templateList.map(item=>(
                      <Option key={item.id} value={item.id} >{item.templateName}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={2} >
              <Form.Item >
                <Button onClick={this.handlenCountMomey.bind(this)} className="mgl10" type="primary" ghost ><Icon type="table" />计算物业费</Button>
              </Form.Item>
            </Col>
          </Row>
          <Table size="small" columns={this.getCol()} 
                dataSource={temDetail?utils.addIndex(temDetail.detailsList):[]}
                pagination={false}/>
          <div className="flexend">
            <span>总金额: {temDetail.orderTotalFee}</span>
          </div>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({initBasePropertyOrder, addInitPropertyfee, countPropertyOrder, addPropertyOrder, getPropertyfee}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddPropertyfee) )