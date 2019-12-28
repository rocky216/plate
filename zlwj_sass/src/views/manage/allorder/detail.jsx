import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Row, Col, Button, Icon, Input, Radio, InputNumber, Table, Modal, Alert} from "antd";
import JCard from "@/components/JCard"
import {getHousePropertyOrder, getShopsPropertyOrder, checkOrderException} from "@/actions/manageAction"
import "./index.less"
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

class AllOrderDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: ""
    }
  }

  componentDidMount(){
    if(this.props.match.params.order=="0"){
      this.props.actions.getHousePropertyOrder({id: this.props.match.params.id}, res=>{
        this.setState({detail: res})
      })
    }else if(this.props.match.params.order=="1"){
      this.props.actions.getShopsPropertyOrder({id: this.props.match.params.id}, res=>{
        this.setState({detail: res})
      })
    }
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

  handlenSubmit(val){
    let _this = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        function submit(){
          _this.props.actions.checkOrderException({
            ...values,
            checkStatus: val,
            id: _this.props.match.params.id
          }, res=>{
            _this.props.utils.OpenNotification("success")
            _this.props.history.push("/workcenter/propertyfee")
          })
        }
        if(val=="4"){
          Modal.confirm({
            title: '确认关闭？',
            content: "每个房间最后一个物业费订单才允许关闭, 警告1:关闭订单将会还原账户金额/缴费区间 警告2:关闭订单/修改订单金额 可能导致资金账户出现负数",
            okText: '确认',
            cancelText: '取消',
            onOk(){
              submit()
            }
          });
        }else{
          submit()
        }
        
      }
    });
  }

  handlenSubmitRecall(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.recallPropertyOrder({
          revokeInfo:values.revokeInfo,
          id: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/manage/allorder")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator, getFieldValue } = this.props.form
    const {spinning, utils, match } = this.props
    const {detail} = this.state
    console.log(detail, "detail")
    return (
      <JCard spinning={spinning}>
        <Card extra={<Link to="/manage/allorder"><Button><Icon type="rollback" />返回</Button></Link>}>
          <div className="PropertyFeeDetail"  >
            {detail?<Card >
              <div className="table_title" >
                <img src={detail.companyLogo} />
                <div className="mgt10">
                  <h2>{detail.order.heNameStr}服务部</h2>
                  <span >房间名称:{match.params.order=="0"?detail.order.houseUrlStr:detail.order.shopsCode}</span>
                </div>
                <div style={{marginTop: 40}}>
                  <h3>{detail.order.orderNo}</h3>
                </div>
              </div>
              <table className="Property_table">
                <tr>
                  <td>业主姓名：{detail.order.owners?detail.order.owners.name:"无"}</td>
                  <td>业主电话：{detail.order.owners?detail.order.owners.phone:"无"}</td>
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
                <tr>
                  <td colspan="4">备注: {detail.order.remark} </td>
                </tr>
              </table>
              <div className="footer mgt10">
                <div>创建信息:{detail.order.buildInfo}</div>
              </div>
            </Card>:null}
          </div>
        </Card>

        {match.params.type==1?<div>

          {detail && detail.order.orderStatus=="1"?<Card className="mgt10" title="审核异常操作" > 
            {detail?<Form {...formItemLayout}>
              <Form.Item label="异常说明">
                {getFieldDecorator("exceptionInfo", {
                  initialValue: detail.order.nowException.exceptionInfo
                })(
                  <TextArea disabled autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item label="更新订单金额">
                {getFieldDecorator("updateFeeStatus", {
                  initialValue: String(detail.order.nowException.updateFeeStatus),
                  rules: [{ required: true, message:"选择更新订单！"}]
                })(
                  <Radio.Group  >
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
                })(<InputNumber min={0} style={{width: "100%"}} />)}
              </Form.Item>}
              
              <Form.Item label="审核说明">
                {getFieldDecorator("checkInfo", {
                  rules: [{ required: true, message:"填写审核说明！"}]
                })(
                  <TextArea autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item wrapperCol={{sm: {span:10, offset: 3}}}>
                <Button onClick={this.handlenSubmit.bind(this,"3")} type="primary" style={{background: "#faad14", borderColor: "#faad14"}} className="mgr10"><Icon type="save"/>驳回申请</Button>
                <Button onClick={this.handlenSubmit.bind(this,"2")} type="primary" className="mgr10"><Icon type="save"/>通过审核</Button>
                
                {detail.order.nowException.checkClossException?
                <Button onClick={this.handlenSubmit.bind(this,"4")} type="danger"><Icon type="save"/>关闭订单</Button>:null}
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
    actions: bindActionCreators({getHousePropertyOrder, getShopsPropertyOrder, checkOrderException}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.manage.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AllOrderDetail) )