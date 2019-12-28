import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Card, Form, Input, Divider, Row, Col, DatePicker, Select, Button, Icon, Table, Switch } from "antd";
import {getShopAddInit, loadShopOrderMoney, addShopsPropertyOrder, getShopOrder} from "@/actions/otherAction"
import {ownersInfo, houseInfo} from "./data"
import moment from "moment"
import {propertyDetailColmuns} from "../colmuns"

const {Option} = Select 
const {TextArea} = Input

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

class AddShopfee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        shopId: props.shopItem.id
      },
      shop: "",
      startTime: "",
      accountList: "",
      templateList: "",
      temDetail: []
    }
  }

  componentDidMount(){
    this.props.actions.getShopAddInit(this.state.params, res=>{
      const {shop, startTime, accountList, templateList} = res
      this.setState({shop, startTime,accountList,templateList})
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
      const {shopItem} = this.props
      const {templeId, accountId, endTime, remark} = values
      
      this.props.actions.addShopsPropertyOrder({
        templateId:templeId, 
        accountId, 
        feeEndTime: moment(endTime).format("YYYY-MM-DD"),
        shopsId: shopItem.id,
        freeDetailsIds: this.getFreeDetailsIds(),
        remark
      }, res=>{
        this.props.utils.OpenNotification("success")
        this.props.onCancel()
        this.props.actions.getShopOrder()
      })
    })
    
  }

  handlenData(key, obj){
    let arrKey = key.split(".")
    let val = obj
    _.each(arrKey, item=>{
      val = val[item]
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
      return obj["heShopsInfo"]["payLastTime"]?obj["heShopsInfo"]["payFristTime"]+"至"+obj["heShopsInfo"]["payLastTime"]:"无缴费记录"
    }
    return val
  }

  handlenCountMomey(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {shopItem} = this.props
        const {templeId, accountId, endTime, } = values
        this.props.actions.loadShopOrderMoney({
          templeId, 
          endTime: moment(endTime).format("YYYY-MM-DD"),
          shopId: shopItem.id,
        }, res=>{
          _.each(res.detailsList, item=>{
            item.oldtotalFee = item.totalFee
          })
          this.setState({temDetail: res})
        })
      }
    })
  }

  handlenDiscount(item){
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
    const {shopItem, spinning, visible, onCancel, utils } = this.props
    const {shop, startTime, accountList, templateList, temDetail } = this.state
    
    return (
      <Modal
        title={shopItem.shopsName}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        width={1100}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          {shop.owners?<div>
            <Divider orientation="left" >业主信息</Divider>
            <Row className="specialForm" >
              {ownersInfo.map((item, index)=>(
                <Col key={index} span={6}>
                  <Form.Item  label={item.title}>
                    {getFieldDecorator(item.key, {
                      initialValue: shop?this.handlenData(item.key,shop):""
                    })(<Input disabled style={{ color: "#333"}} />)}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>:null}
          <Divider orientation="left" >商铺信息</Divider>
          <Row className="specialForm">
            {houseInfo.map((item, index)=>(
              <Col key={index} span={item.span?item.span:6}>
                <Form.Item  label={item.title}>
                  {getFieldDecorator(item.key, {
                    initialValue: shop?this.handlenData(item.key,shop):""
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
                })(<Input disable />)}
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
                  <Select style={{width: "100%"}}>
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
            <span>总金额: {temDetail.orderTotalFee?Math.round(temDetail.orderTotalFee):0}</span>
          </div>
          <Row>
            <Col>
              <Form.Item labelCol={{sm: { span: 1 }}} wrapperCol={{sm: { span: 20 }}} label="备注">
                {getFieldDecorator("remark")(<TextArea autoSize={{minRows: 3}} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getShopAddInit, loadShopOrderMoney, getShopOrder, addShopsPropertyOrder}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddShopfee))