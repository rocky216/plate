import React from "react"
import {connect} from "react-redux"
import {withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card} from "antd";


class PropertySheet extends React.Component {

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
    const {utils, detail, isRemark, match } = this.props

    return (
      <Card >
        <div className="table_title" >
          <img src={detail.companyLogo} />
          <div className="mgt10">
            <h2>{detail.order.heNameStr}</h2>
            <span >{detail.order.houseUrlStr}</span>
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
            <td>类型：{detail.order.assetsTypeName}</td>
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
          {detail.orderActive?
          detail.orderActive.activeType==="date"?
          (
            <tr >
              <td colspan="4">【活动】{detail.orderActive.activeName} 
              （{detail.orderActive.startDateReward.substring(0,10)}到{detail.orderActive.endDateReward.substring(0,10)}为赠送时间）</td>
            </tr>
          ):
          (
            <tr >
            <td colspan="3">【活动】{detail.orderActive.activeName}</td>
            <td>-{detail.orderActive.moneyReward}￥</td>
          </tr>
          ):null}
          <tr>
            <td colspan="3">合计金额(大写): {detail.order.orderTrueFeeChinese}</td>
            <td>合计: {detail.order.orderTrueFee} ¥</td>
          </tr>
          {isRemark?<tr>
            <td colspan="4">备注: {detail.order.remark} </td>
          </tr>:null}
        </table>
        <div className="footer mgt10">
          {match.params.type=="2"?<div>打印时间:{detail.nowTime}</div>:<div>创建信息:{detail.order.buildInfo}</div>}
          <div>【智联万家物业云】技术支持:江西高超网络</div>
        </div>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(PropertySheet) )