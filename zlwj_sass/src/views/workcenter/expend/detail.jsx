import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Row, Col, Button, Icon, Input, Radio, InputNumber, Table} from "antd";
import {getExpendOrderDetail} from "@/actions/otherAction"
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
    this.props.actions.getExpendOrderDetail({
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



  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning,utils, match} = this.props
    const {detail, isRemark} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card title="其他支出单"  extra={<Link to="/workcenter/expend">
          <Button><Icon type="rollback" />返回</Button></Link>} >
          
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
                {detail?detail.order.faOtherExpendDescs.map((item, index)=>(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.feeName}</td>
                    <td>{`${item.feeMoney}`}</td>
                    <td>{item.remark}</td>
                  </tr>
                )):null}
                <tr>
                  <td colspan="3">合计金额(大写): {detail?detail.order.orderTrueFeeChinese:""}</td>
                  <td>合计: {detail?detail.order.orderTrueFee:""} ¥</td>
                </tr>
                {isRemark?<tr>
                  <td colspan="4">备注: {detail?detail.order.remark:""} </td>
                </tr>:null}
              </table>
              <div className="footer mgt10">
                <div>打印时间:{detail.nowTime}</div>
                <div>【智联万家物业云】技术支持:江西高超网络</div>
              </div>
            </Card>:null}
          </div>
        </Card>
        {detail && detail.order.orderStatus!="1"?
          <Card className="mgt10" title="审核信息">
            <Form {...formItemLayout}>
              <Form.Item label="审核说明">
                {getFieldDecorator("checkInfo", {
                  initialValue: detail?detail.order.remark:"",
                  rules: [{ required: true, message:"填写审核说明！"}]
                })(
                  <TextArea disabled autoSize={{minRows: 3}} />
                )}
              </Form.Item>
              <Form.Item label="审核人/日期">
                {getFieldDecorator("updateInfo", {
                  initialValue: detail.order.updateInfo,
                  rules: [{ required: true, message:"填写审核说明！"}]
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Form>
          </Card>:null}
          <Card>
            {detail && detail.order.attaList.length?detail.order.attaList.map(item=>(
              <div>
                <img key={item.id} src={item.dowloadHttpUrl} style={{width:600}} />
              </div>
            )):<span style={{color: "red"}}>未上传单据</span>} 
          </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getExpendOrderDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(OtherFeeDetail) )