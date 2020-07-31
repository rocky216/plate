import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input, Divider, Row, Col, Modal, DatePicker, Select, Table, Switch} from "antd";
import JCard from "@/components/JCard"
import {initBasePropertyOrder,initLoadOrderMoney,addBasePropertyOrder,getPropertyOrderPage} from "@/actions/otherAction"
import {ownersInfo, houseInfo, shopInfo, plateInfo} from "./data"
import moment from "moment"
import {propertyDetailColmuns} from "../colmuns"

const { RangePicker } = DatePicker;
const {Option } = Select
const {TextArea} = Input;

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
    const {houseItem} = this.props
    
    this.props.actions.initBasePropertyOrder({
      linkId: this.props.houseItem.id,
      orderType: this.props.houseItem.type,
    }, res=>{
      const {owners, templateList, accountList, house, startTime, shop, parkingSpace} = res
      
      let myhouse = house
      if(houseItem.type=="shops"){
        myhouse=shop
      }
      if(houseItem.type=="parkingSpace"){
        myhouse=parkingSpace
      }
      this.setState({owners, templateList, accountList, house:myhouse, startTime})
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

  confirm(values, next) {
    const {startTime } = this.state
    Modal.confirm({
      title: '是否创建订单？',
      content: (
        <>
          <div>缴费区间：{startTime.substring(0,10)}至{moment(values.endTime).format("YYYY-MM-DD")}</div>
          <span style={{background: "#ffe58f"}}>请确认业主已实际付款！</span>
        </>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk(){
        next()
      }
    });
  }

  handlenSubmit(){
    
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.confirm(values, ()=>{
          const {houseType, houseItem} = this.props
          const {templeId, accountId, endTime, remark, activeId} = values
          
          this.props.actions.addBasePropertyOrder({
            templateId:templeId, 
            remark,
            accountId, 
            feeEndTime: moment(endTime).format("YYYY-MM-DD"),
            orderTypeCode: houseItem.type,
            linkId: houseItem.id,
            freeDetailsIds: this.getFreeDetailsIds(),
            activeId
          }, res=>{
            this.props.utils.OpenNotification("success")
            this.props.onCancel()
            this.props.actions.getPropertyOrderPage({orderType: houseItem.type, 
              linkTypeId: houseItem.linkTypeId, linkId: houseItem.id})
          })
        })
      }
      
    })
    
  }

  handlenOwnerData(key, str){
    if(key==="sex"){
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

  handlenData(key, obj){
    const {isDate} = this.props.utils
    let arrKey = key.split(".")
    let val = obj
    _.each(arrKey, item=>{
      val = isDate(val[item])?val[item].substring(0,10):val[item]||""
    })
    if(key=="owners.sex"){
      return val=="1"?"男":"女"
    }
    if(key=="elevatorHouse"){
      return val=="0"?"楼梯房":"电梯房"
    }
    if(key=="heShopsInfo.packingStatus"){
      return val=="0"?"未装修":val=="1"?"装修中":"已装修"
    }
    if(key=="heShopsInfo.payLastTime"){
      return obj["heShopsInfo"]["payLastTime"]?obj["heShopsInfo"]["payFristTime"].substring(0,10)+"至"+obj["heShopsInfo"]["payLastTime"].substring(0,10):"无缴费记录"
    }else{
      val = isDate(obj[key])?obj[key].substring(0,10):obj[key]
    }
    
    return val
  }

  handlePlateData(key, obj){
    const {isDate} = this.props.utils
    if(_.isArray(key)){
      let str = ""
      _.each(key, item=>{
        
        str += isDate(obj[item])?'至'+obj[item].substring(0,10):obj[item]||""
      })
      return str.substring(1)
    }else {
      return isDate(obj[key])?obj[key].substring(0,10):obj[key] || ""
    }
  }

  handlenCountMomey(){
    this.props.form.setFieldsValue({activeId: undefined})
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      if(!err){
        const {houseType, houseItem} = this.props
        const {templeId, accountId, endTime} = values
        this.props.actions.initLoadOrderMoney({
          templeId, 
          endTime: moment(endTime).format("YYYY-MM-DD"),
          linkId: houseItem.id,
          orderType: houseItem.type,
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
  getTips(){
    const {getFieldValue } = this.props.form
    const {temDetail } = this.state
    if(getFieldValue("activeId")){
      let obj = _.filter(temDetail.activeList, o=>o.id==getFieldValue("activeId"))[0];
      return obj["activeInfo"]+obj["activeResult"]
    }
    return "";
  }

  getAssetsData(type){
    const {houseItem} = this.props
    if(type==="data"){
      switch(houseItem.type){
        case "shops":
          return shopInfo 
        case "parkingSpace":
          return plateInfo
        default :
          return houseInfo 
      }
    }
    if(type === "method"){
      switch(houseItem.type){
        case "house":
          return "handlenHouseData"
        case "parkingSpace":
          return "handlePlateData"
        default :
          return "handlenData"
      }
    }
    
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, utils, visible, onCancel, showName, houseItem} = this.props
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
                      initialValue: owners?this.handlenOwnerData(item.key,owners[item.key]):""
                    })(<Input disabled style={{ color: "#333"}} />)}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>:null}
          
          
          <Divider orientation="left" >资产信息</Divider>
          <Row className="specialForm">
            {this.getAssetsData("data").map((item, index)=>(
              <Col key={index} span={item.span?item.span:6}>
                <Form.Item  label={item.title}>
                  {getFieldDecorator(item.key, {
                    initialValue: house?this[this.getAssetsData("method")](item.key,house):""
                  })(<Input disabled style={{ color: "#333"}}  />)}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Divider orientation="left" >缴纳物业费设置</Divider>
          <Row>
            <Col span={7} >
              <Form.Item  label="开始时间">
                {getFieldDecorator("startTime", {
                  initialValue: startTime?startTime.substring(0,10):""
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
            {temDetail.activeList?
            <Col span={7} >
              <Form.Item  label="选择活动模板">
                {getFieldDecorator("activeId", {
                })(
                  <Select>
                    {temDetail.activeList.map(item=>(
                      <Option key={item.id} value={item.id} >{item.activeName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>:null}
            <Col span={2} >
              <Form.Item >
                <Button onClick={this.handlenCountMomey.bind(this)} className="mgl10" type="primary" ghost ><Icon type="table" />计算物业费</Button>
              </Form.Item>
            </Col>
          </Row>
          <span style={{background: "#ffe58f"}}>{this.getTips()}</span>
          <Table size="small" columns={this.getCol()} 
                dataSource={temDetail?utils.addIndex(temDetail.detailsList):[]}
                pagination={false}/>
          <div className="flexend">
            <span>总金额: {temDetail.orderTotalFee}</span>
          </div>
          <Form.Item  label="备注"  labelCol={{span: 1}} >
            {getFieldDecorator("remark", {
            })(<TextArea />)}
          </Form.Item>
        </Form>
        {temDetail.checkInfo?
          <div style={{color: "red"}}>ps: {temDetail.checkInfo.map((item, index)=>(
            <span key={index}>{item}</span>
          ))}</div>
        :null}
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({initBasePropertyOrder, initLoadOrderMoney,addBasePropertyOrder, getPropertyOrderPage,}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddPropertyfee) )