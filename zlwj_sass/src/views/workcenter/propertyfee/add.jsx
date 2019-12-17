import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input, Divider, Row, Col, Modal, DatePicker, Select} from "antd";
import JCard from "@/components/JCard"
import {addInitPropertyfee} from "@/actions/otherAction"
import {ownersInfo, houseInfo} from "./data"

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
      
    }
  }
  componentDidMount(){
    this.props.actions.addInitPropertyfee({
      orderType: this.props.houseType,
      linkId: this.props.houseId
    }, res=>{
      const {owners, templateList, accountList, house} = res
      this.setState({owners, templateList, accountList, house})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
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

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, visible, onCancel, showName} = this.props
    const {owners, templateList, accountList, house} = this.state

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
        
        <Form {...formItemLayout} >
          <Divider orientation="left" >业主信息</Divider>
          <Row>
            {ownersInfo.map((item, index)=>(
              <Col key={index} span={6}>
                <Form.Item  label={item.title}>
                  {getFieldDecorator(item.key, {
                    initialValue: owners?this.handlenData(item.key,owners[item.key]):""
                  })(<Input disabled />)}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Divider orientation="left" >房屋信息</Divider>
          <Row>
            {houseInfo.map((item, index)=>(
              <Col key={index} span={item.span?item.span:6}>
                <Form.Item  label={item.title}>
                  {getFieldDecorator(item.key, {
                    initialValue: house?this.handlenHouseData(item.key,house):""
                  })(<Input disabled />)}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Divider orientation="left" >缴纳物业费设置</Divider>
          <Row>
            <Col span={7} >
              <Form.Item  label="缴纳时间">
                {getFieldDecorator("time", {
                })(<RangePicker onChange={val=>console.log(val)} />)}
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item  label="选择账户">
                {getFieldDecorator("account", {
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
                {getFieldDecorator("model", {
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
                <Button className="mgl10" type="primary" ghost ><Icon type="table" />计算物业费</Button>
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
    actions: bindActionCreators({addInitPropertyfee}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddPropertyfee) )