import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Row, Col, Button, Icon, Input, Radio, InputNumber, Table} from "antd";
import {getBasePropertyOrder, goPrintOrder, getPropertyfee, getHousePropertyOrder, subOrderException, revokeBaseOrderException} from "@/actions/otherAction"
import JCard from "@/components/JCard" 
import {detailInfo} from "./data"
import ReactToPrint from 'react-to-print';
import {exceptionColumns} from "../colmuns"
import PropertySheet from "@/components/PropertySheet"


const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class PropertyFeeDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: "",
      isRemark: true,
    }
  }

  componentDidMount(){
    this.props.actions.getBasePropertyOrder({
      id: this.props.match.params.id
    }, res=>{
      
      this.setState({detail: res})
    })
  }

  handlenHouseData(key, obj){
    let arrKey = key.split(".")
    let val = obj
    console.log(obj, "asasasas")
    _.each(arrKey, item=>{
      val = val[item]
    })
    
    return val
  }

  

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.subOrderException({
          ...values,
          orderType: "propertyOrder",
          id: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/propertyfee")
        })
      }
    });
  }

  handlenSubmitRecall(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.revokeBaseOrderException({
          orderType: "propertyOrder",
          revokeInfo:values.revokeInfo,
          id: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/propertyfee")
        })
      }
    });
  }

  handlenPrintOrder(){
    this.props.actions.goPrintOrder({id: this.props.match.params.id})
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning,utils, match} = this.props
    const {detail, isRemark} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card title={match.params.type==2?
          <div>
            <ReactToPrint
              trigger={() => <Button type="primary"><Icon type="printer" />打印</Button>}
              content={() => this.componentRef}
              onAfterPrint={this.handlenPrintOrder.bind(this)}
            />
            <Button type="primary" ghost className="mgl10" onClick={()=>this.setState({isRemark:!this.state.isRemark})} >
              {this.state.isRemark?"隐藏备注":"显示备注"}
            </Button>
          </div>:null}  extra={<Link to="/workcenter/propertyfee"><Button><Icon type="rollback" />返回</Button></Link>} >
          
          <div className="PropertyFeeDetail" ref={el=>this.componentRef = el} >
            {detail?<PropertySheet detail={detail} isRemark={isRemark} />:null}
          </div>
        
        </Card>
        {match.params.type==1?<div>

          {detail && detail.order.orderStatus=="0"?<Card className="mgt10" title="异常操作" extra={<Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save"/>提交</Button>}> 
            {detail?<Form {...formItemLayout}>
              <Form.Item label="异常说明">
                {getFieldDecorator("exceptionInfo", {
                  rules: [{ required: true, message:"填写异常说明！"}]
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item label="异常操作">
                {getFieldDecorator("exceptionStatus", {
                  initialValue:"0",
                  rules: [{ required: true, message:"异常操作"}]
                })(
                  <Radio.Group >
                    <Radio value="0">关闭订单</Radio>
                    <Radio value="1">增加金额</Radio>
                    <Radio value="2">减少金额</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              {getFieldValue("exceptionStatus")=="0"?null:
              <Form.Item label="增减金额(元)">
                {getFieldDecorator("updateFee", {
                  rules: [{ required: true, message:"填写金额！"}]
                })(<InputNumber min={0} style={{width: "100%"}} />)}
              </Form.Item>}
            </Form>:null}
          </Card>:null}

          {detail && detail.order.orderStatus=="1"?
          <Card className="mgt10" title="撤回异常操作" extra={<Button type="danger" onClick={this.handlenSubmitRecall.bind(this)}><Icon type="save"/>撤回</Button>}> 
            {detail?<Form {...formItemLayout}>
              <Form.Item label="异常说明">
                {getFieldDecorator("exceptionInfo", {
                  initialValue: detail.order.nowException.exceptionInfo,
                  rules: [{ required: true, message:"填写异常说明！"}]
                })(
                  <TextArea disabled autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item label="异常操作">
                {getFieldDecorator("exceptionStatus", {
                  initialValue: String(detail.order.nowException.updateFeeStatus),
                  rules: [{ required: true, message:"异常操作"}]
                })(
                  <Radio.Group disabled >
                    <Radio value="0">关闭订单</Radio>
                    <Radio value="1">增加金额</Radio>
                    <Radio value="2">减少金额</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              {getFieldValue("exceptionStatus")=="0"?null:
              <Form.Item label="增减金额(元)">
                {getFieldDecorator("updateFee", {
                  initialValue: detail.order.nowException.updateFee,
                  rules: [{ required: true, message:"填写金额！"}]
                })(<InputNumber disabled min={0} style={{width: "100%"}} />)}
              </Form.Item>}
              
              <Form.Item label="撤回说明">
                {getFieldDecorator("revokeInfo", {
                  rules: [{ required: true, message:"填写撤回说明！"}]
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>

            </Form>:null}
          </Card>:null}

          <Card className="mgt10" title="历史异常">
            <Table columns={exceptionColumns} dataSource={detail?utils.addIndex(detail.order.exceptionList):[]} pagination={false} />
          </Card>

        </div>:null}

        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBasePropertyOrder, getHousePropertyOrder,goPrintOrder, subOrderException, revokeBaseOrderException}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(PropertyFeeDetail) )