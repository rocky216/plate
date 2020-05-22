import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Row, Col, Button, Icon, Input, Radio, InputNumber, Table} from "antd";
import {getOtherCostsOrderDesc, } from "@/actions/otherAction"
import { checkSignException, setCheckOrderException, getBaseOtherCostsOrderDetail} from "@/actions/manageAction"
import JCard from "@/components/JCard"
import ReactToPrint from 'react-to-print';
import {exceptionColumns} from "../columns"



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

  handlenSubmit(value){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.setCheckOrderException({
          ...values,
          orderType: "otherOrder",
          id: this.props.match.params.id,
          checkStatus: value
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/manage/otherorder")
        })
      }
    });
  } 


  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning,utils, match} = this.props
    const {detail, isRemark} = this.state 
    
    return (
      <JCard spinning={spinning}>
        <Card   extra={<Link to="/manage/otherorder"><Button><Icon type="rollback" />返回</Button></Link>} >
          
          <div className="PropertyFeeDetail"  ref={el=>this.componentRef = el} >
            {detail?<Card >
              <div className="table_title" style={{justifyContent: "start"}}>
                <img src={detail.companyLogo} />
                <div className="mgt10" style={{marginLeft:30}}>
                  <h2>{detail.heNameStr}</h2>
                  <span >{detail?detail.order.orderTitle:""}</span>
                </div>
                <div style={{marginTop: 40}}>
                </div>
              </div>
              <table className="Property_table">
                <tr>
                  <td>姓名：{detail.linkName}</td>
                  <td>电话：{detail.linkPhone}</td>
                  <td>订单号：{detail?detail.order.orderNo:""}</td>
                  <td>编号：{detail.linkCode}</td>
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
                  <td colspan="3">合计金额(大写): {detail.order.orderTrueFeeChinese}</td>
                  <td>合计: {detail.order.orderTrueFee} ¥</td>
                </tr>
                {isRemark?<tr>
                  <td colspan="4">备注: {detail.order.remark} </td>
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


          {detail && detail.order.orderStatus=="1"?<Card className="mgt10" title="撤回异常操作" > 
            {detail?<Form {...formItemLayout}>
              <Form.Item label="异常说明">
                {getFieldDecorator("exceptionInfo", {
                  initialValue: detail.order.nowException.exceptionInfo,
                  rules: [{ required: true, message:"填写异常说明！"}]
                })(
                  <TextArea disabled autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item label="更新订单金额">
                {getFieldDecorator("updateFeeStatus", {
                  initialValue: String(detail.order.nowException.updateFeeStatus),
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
                  initialValue: detail.order.nowException.updateFee,
                  rules: [{ required: true, message:"填写金额！"}]
                })(<InputNumber  min={0} style={{width: "100%"}} />)}
              </Form.Item>}
              
              <Form.Item label="审核说明">
                {getFieldDecorator("checkInfo", {
                  rules: [{ required: true, message:"填写撤回说明！"}]
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>

              <Form.Item wrapperCol={{sm: {span:10, offset: 3}}}>
                <Button onClick={this.handlenSubmit.bind(this,"no")} type="primary" style={{background: "#faad14", borderColor: "#faad14"}} className="mgr10"><Icon type="save"/>驳回申请</Button>
                <Button onClick={this.handlenSubmit.bind(this,"yes")} type="primary" className="mgr10"><Icon type="save"/>通过审核</Button>
                
              </Form.Item>

            </Form>:null}
          </Card>:null}
        </div>:null}
        <Card className="mgt10" title="历史异常">
            <Table columns={exceptionColumns} dataSource={detail?utils.addIndex(detail.order.exceptionList):[]} pagination={false} />
          </Card>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOtherCostsOrderDesc, checkSignException, setCheckOrderException, getBaseOtherCostsOrderDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.manage.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(OtherFeeDetail) )