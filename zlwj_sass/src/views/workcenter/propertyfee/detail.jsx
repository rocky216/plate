import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Row, Col, Button, Icon, Input, Radio, InputNumber, Table} from "antd";
import {getPropertyfee, getHousePropertyOrder, subOrderException} from "@/actions/otherAction"
import JCard from "@/components/JCard"
import {detailInfo} from "./data"
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

class PropertyFeeDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: "",
      isRemark: true,
    }
  }

  componentDidMount(){
    this.props.actions.getHousePropertyOrder({
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
        this.props.actions.subOrderException({
          ...values,
          id: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/propertyfee")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, match} = this.props
    const {detail, isRemark} = this.state
console.log(getFieldValue("updateFeeStatus"), "detail.order.heNameStr")
    return (
      <JCard spinning={spinning}>
        <Card title={match.params.type==2?
          <div>
            <ReactToPrint
              trigger={() => <Button type="primary"><Icon type="printer" />打印</Button>}
              content={() => this.componentRef}
            />
            <Button type="primary" ghost className="mgl10" onClick={()=>this.setState({isRemark:!this.state.isRemark})} >
              {this.state.isRemark?"隐藏备注":"显示备注"}
            </Button>
          </div>:null}  extra={<Link to="/workcenter/propertyfee"><Button><Icon type="rollback" />返回</Button></Link>} >
          
          <div className="PropertyFeeDetail" ref={el=>this.componentRef = el} >
            {detail?<Card >
              <div className="table_title" >
                <img src={detail.companyLogo} />
                <div className="mgt10">
                  <h2>{detail.order.heNameStr}服务部</h2>
                  <span >房间名称:{detail.order.houseUrlStr}</span>
                </div>
                <div style={{marginTop: 40}}>
                  <h3>{detail.order.orderNo}</h3>
                </div>
              </div>
              <table className="Property_table">
                <tr>
                  <td>业主姓名：{detail.order.owners.name}</td>
                  <td>业主电话：{detail.order.owners.phone}</td>
                  <td>建筑面积：{detail.order.houseArea}平方</td>
                </tr>
                <tr>
                  <td>房屋类型：{detail.order.houseElevatorHouse=="1"?"电梯房":"楼梯房"}</td>
                  <td colspan="2">缴费时间：{detail.order.feeStartTime.substring(0,11)+"至 "+detail.order.feeEndTime.substring(0,11)}</td>
                </tr>
              </table>
              <table className="Property_table mgt10">
                <tr>
                  <th>序号</th>
                  <th>收费详情名称</th>
                  <th>收费标准</th>
                  <th>收费总额</th>
                </tr>
                {detail.order.detailsList.map((item, index)=>(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.detailsName}</td>
                    <td>{`${item.fee}￥【${this.checkedType(item.feeType)}${this.checkedDate(item.feeTime)}】`}</td>
                    <td>{item.discountFee=="0"?item.trueFee+'￥':`${item.totalFee}-${item.discountFee}=${item.trueFee}￥`}</td>
                  </tr>
                ))}
                <tr>
                  <td colspan="3">合计金额(大写): {detail.order.orderTrueFeeChinese}</td>
                  <td>合计: {detail.order.orderTrueFee} ¥</td>
                </tr>
                {isRemark?<tr>
                  <td colspan="4">备注: {detail.order.remark} </td>
                </tr>:null}
              </table>
              <div className="footer mgt10">
                <div>打印时间:2019-12-23 15:07:47</div>
                <div>【智联万家物业云】技术支持:江西高超网络</div>
              </div>
            </Card>:null}
          </div>
        </Card>
        {match.params.type==1?<div>
          <Card className="mgt10">
            <Table columns={exceptionColumns} />
          </Card>
          

          {detail && detail.order.orderStatus==0?<Card className="mgt10" title="异常操作" extra={<Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save"/>提交</Button>}> 
            {detail?<Form {...formItemLayout}>
              <Form.Item label="创建信息">
                {detail.order.buildInfo}
              </Form.Item>
              <Form.Item label="异常说明">
                {getFieldDecorator("exceptionInfo")(
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
        </div>:null}
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHousePropertyOrder, subOrderException}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(PropertyFeeDetail) )