import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input, Divider, Row, Col, Modal, DatePicker, Select, Table, Switch} from "antd";
import JCard from "@/components/JCard"
import {initBasePropertyOrder,initLoadOrderMoney,addInsertFix, propertyPlanPage} from "@/actions/otherAction"
import {ownersInfo, houseInfo, shopInfo, plateInfo} from "../propertyfee/data"
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

class AddTrim extends React.Component {
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


  handlenSubmit(){
    
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {houseType, houseItem, params} = this.props
        const {fixType,director, linkPhone, linkName, fixStartTime } = values
        
        this.props.actions.addInsertFix({ 
          AssetsType: houseItem.type,
          assetsId: houseItem.id,
          ownerId: houseItem.ownersId,
          shopsTypeId: houseItem.linkTypeId,
          fixStartTime: fixStartTime?moment(fixStartTime).format("YYYY-MM-DD"):"",
          fixType,director, linkPhone, linkName, 
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          setTimeout(()=>{
            this.props.actions.propertyPlanPage(params)
          }, 100)
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
    const {owners, house} = this.state
    
    
    return (
      <Modal
      // title={showName}
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
          <Divider orientation="left" >装修计划信息</Divider>
          <Row>
            <Col span={6}>
              <Form.Item  label="装修类型">
                {getFieldDecorator("fixType")(
                  <Select>
                    <Option value="person" >个人</Option>
                    <Option value="company" >装修公司)</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="装修负责人">
                {getFieldDecorator("director")(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="联系人姓名">
                {getFieldDecorator("linkName")(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="联系人电话">
                {getFieldDecorator("linkPhone")(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  label="装修开始时间">
                {getFieldDecorator("fixStartTime")(
                  <DatePicker/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <p style={{color: "red"}}>ps：如暂时没有装修需求可不填相应信息~</p>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({initBasePropertyOrder, initLoadOrderMoney,addInsertFix,propertyPlanPage}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddTrim) )