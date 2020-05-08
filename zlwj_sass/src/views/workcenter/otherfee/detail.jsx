import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Row, Col, Button, Icon, Input, Radio, InputNumber, Table} from "antd";
import {getPropertyfee, countPrintOrderNum, getOtherCostsOrderDesc, getBaseOtherCostsOrderDetail, otherFeesignException, otherFeeRecallException} from "@/actions/otherAction"
import JCard from "@/components/JCard"
import ReactToPrint from 'react-to-print';
import {exceptionColumns} from "../colmuns"



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

class OtherFeeDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: "",
      isRemark: true,
    }
  }

  componentDidMount(){
    this.props.actions.getBaseOtherCostsOrderDetail({
      id: this.props.match.params.id
    }, res=>{
      console.log(res)
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

  checkedDate(item){
    switch(parseInt(item)){
      case 0:
        return "月"
      case 1:
        return "季度"
      case 2:
        return "年"
    }
  }
  checkedType(item){
    switch(parseInt(item)){
      case 0:
        return ""
      case 1:
        return "1平方(建筑面积)/"
      case 2:
        return "1平方(室内面积)/"
      case 3:
        return "1平方(公摊面积)/"
    }
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.otherFeesignException({
          ...values,
          orderId: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/otherfee")
        })
      }
    });
  }

  handlenSubmitRecall(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.otherFeeRecallException({
          recallInfo:values.recallInfo,
          exceptionId: this.state.detail.faOrderException.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/otherfee")
        })
      }
    });
  }

  handlenPrintOrder(){
    this.props.actions.countPrintOrderNum({id: this.props.match.params.id})
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
          </div>:null}  extra={<Link to="/workcenter/otherfee"><Button><Icon type="rollback" />返回</Button></Link>} >
          
          <div className="PropertyFeeDetail"  ref={el=>this.componentRef = el} >
            {detail?<Card >
              <div className="table_title" style={{justifyContent: "start"}} >
                <img src={detail.companyLogo} />
                <div className="mgt10" style={{marginLeft:30}}>
                  <h2>{detail.heNameStr}</h2>
                  <span >编号:{detail.linkCode}</span>
                </div>
              </div>
              <table className="Property_table">
                <tr>
                  <td>姓名：{detail.linkName}</td>
                  <td>电话：{detail.linkPhone}</td>
                  <td>{detail?detail.order.orderNo:""}</td>
                </tr>
              </table>
              <table className="Property_table mgt10">
                <tr>
                  <th>序号</th>
                  <th>收费详情名称</th>
                  <th>收费金额</th>
                  <th>备注</th>
                </tr>
                {detail?detail.order.faOtherOrderDescs.map((item, index)=>(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.feeName}</td>
                    <td>{`${item.feeMoney}`}</td>
                    <td>{item.remark}</td>
                  </tr>
                )):null}
                <tr>
                  <td colspan="3">合计金额(大写): {detail.orderTrueFeeChinese}</td>
                  <td>合计: {detail.orderTrueFee} ¥</td>
                </tr>
                {isRemark?<tr>
                  <td colspan="4">备注: {detail.remark} </td>
                </tr>:null}
              </table>
              <div className="footer mgt10">
                <div>打印时间:{detail.nowTime}</div>
                <div>【智联万家物业云】技术支持:江西高超网络</div>
              </div>
            </Card>:null}
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
              <Form.Item label="更新订单金额">
                {getFieldDecorator("updateFeeStatus", {
                  initialValue: "0",
                  rules: [{ required: true, message:"选择更新订单！"}]
                })(
                  <Radio.Group >
                    <Radio value="0">不做修改</Radio>
                    <Radio value="1">增加金额</Radio>
                    <Radio value="2">减少金额</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              {getFieldValue("updateFeeStatus")=="0"?null:
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
                  initialValue: detail?detail.nowException.exceptionInfo:"",
                  rules: [{ required: true, message:"填写异常说明！"}]
                })(
                  <TextArea disabled autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item label="更新订单金额">
                {getFieldDecorator("updateFeeStatus", {
                  initialValue: String(detail?detail.nowException.updateFeeStatus:""),
                  rules: [{ required: true, message:"选择更新订单！"}]
                })(
                  <Radio.Group disabled >
                    <Radio value="0">不做修改</Radio>
                    <Radio value="1">增加金额</Radio>
                    <Radio value="2">减少金额</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              {getFieldValue("updateFeeStatus")=="0"?null:
              <Form.Item label="增减金额(元)">
                {getFieldDecorator("updateFee", {
                  initialValue: detail?detail.nowException.updateFee:"",
                  rules: [{ required: true, message:"填写金额！"}]
                })(<InputNumber disabled min={0} style={{width: "100%"}} />)}
              </Form.Item>}
              
              <Form.Item label="撤回说明">
                {getFieldDecorator("recallInfo", {
                  rules: [{ required: true, message:"填写撤回说明！"}]
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>

            </Form>:null}
          </Card>:null}

          <Card className="mgt10" title="历史异常">
            <Table columns={exceptionColumns} dataSource={detail?utils.addIndex(detail.exceptionList):[]} pagination={false} />
          </Card>

        </div>:null}

        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOtherCostsOrderDesc,countPrintOrderNum, getBaseOtherCostsOrderDetail, otherFeesignException, otherFeeRecallException}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(OtherFeeDetail) )