import React from "react"
import {Tag} from "antd"

export const operativeColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "合作商名称",
    dataIndex: "name"
  },
  {
    title: "合作商编码",
    dataIndex: "code"
  },
  {
    title: "合作商电话",
    dataIndex: "phone"
  },
]

export const allOrderColumns = [
  {
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 2:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>异常</div></div>
        case 3:
          return ""
        case 4: 
          return <div style={{color: "#ff6969", textAlign:"center"}}><i className="icon iconfont icon-close" /><div>关闭</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "姓名",
    dataIndex: "partnerName",
  },
  {
    title: "手机号",
    dataIndex: "partnerPhone"
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(e,rows){
      switch(parseInt(e)){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>非住宅</Tag>
        case 3:
          return <Tag>合作商</Tag>
      }
    }
  },
  {
    title: "关联信息",
    dataIndex: "partnerCode"
  },
  {
    title: "关联项目",
    dataIndex: "heNameStr"
  },
  {
    title: "订单标题",
    dataIndex: "orderTitle"
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
    width: 160
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  },
  {
    title: "打印信息",
    dataIndex: "printCount",
    render(item, rows){
      return (
        item!=0?
        <div>
          {rows.printUserName?<Tag>{rows.printUserName}</Tag>:null}
          <Tag>打印次数:{item}</Tag>
          {rows.printTime?<Tag>打印时间:{rows.printTime}</Tag>:null}
        </div>:<Tag>暂无打印</Tag>
      )
    }
  },
]
export const allExpendColumns = [
  {
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 2:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 3:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>驳回</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "姓名",
    dataIndex: "partnerName",
  },
  {
    title: "手机号",
    dataIndex: "partnerPhone"
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(e,rows){
      switch(parseInt(e)){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>非住宅</Tag>
        case 3:
          return <Tag>合作商</Tag>
      }
    }
  },
  {
    title: "关联信息",
    dataIndex: "partnerCode"
  },
  {
    title: "关联项目",
    dataIndex: "heNameStr"
  },
  {
    title: "订单标题",
    dataIndex: "orderTitle"
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "支出金额",
    dataIndex: "orderTrueFee"
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
    width: 160
  }
]

export const exceptionColumns = [ 
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "异常说明",
    dataIndex: "exceptionInfo"
  },
  {
    title: "状态",
    dataIndex: "exceptionStatus",
    render(item){
      switch(parseInt(item)){
        case 1:
          return <span style={{color:"#60b2ef"}}>待审核</span>
        case 2:
          return <span style={{color:"#26ba17"}}>审核通过</span>
        case 3:
          return <span style={{color:"#faaa39"}}>审核不通过</span>
        case 4:
          return <span style={{color:"#ff6969"}}>关闭订单</span>
        case 5:
          return <span style={{color:"#60b2ef"}}>撤回异常</span>
      }
    }
  },
  {
    title: "状态说明",
    render(item){ 
      if(item.exceptionStatus==2||item.exceptionStatus==3||item.exceptionStatus==4){
        return (
          <div>
            <Tag>{item.checkInfo}</Tag>
            <Tag>{item.checkUserName}</Tag>
            <Tag>{item.checkTime}</Tag>
            {item.updateFeeStatus=="0"?null:<Tag color="magenta">金额￥{item.updateFeeStatus=="2"?'-'+item.updateFee:item.updateFee}</Tag>}
            
          </div>
        )
      }else if(item.exceptionStatus==5){
        return (
          <div>
            <Tag>{item.remark}</Tag>
            <Tag>{item.updateUserName}</Tag>
            <Tag>{item.updateTime}</Tag>
          </div>
        )
      }else {
        return ""
      }
    }
  },
  {
    title: "创建人",
    dataIndex: "exceptionUserName"
  },
  {
    title: "创建时间",
    dataIndex: "buildTime"
  },
]

export const propertyfeeColmuns = [
  { 
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 2:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>异常</div></div>
        case 3:
          return ""
        case 4: 
          return <div style={{color: "#ff6969", textAlign:"center"}}><i className="icon iconfont icon-close" /><div>关闭</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(item){
      switch( parseInt(item) ){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>非住宅</Tag>
        case 2:
          return <Tag>停车位</Tag>
      }
    }
  },
  
  {
    title: "关联信息",
    dataIndex: "showOrderLinkName",
  },
  {
    title: "项目项目",
    dataIndex: "heNameStr",
  },
  {
    title: "业主信息",
    dataIndex: "owners",
    render(item){
      return item?`${item.name}(${item.phone})`:"无"
    }
  },
  {
    title: "缴费信息",
    dataIndex: "feeEndTime",
    render(item, rows){
      return item?`${rows.feeStartTime?rows.feeStartTime.substring(0,10):""}到${item.substring(0,10)}`:"无"
    }
  },
  {
    title: "金额",
    dataIndex: "orderTrueFee",
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
    width: 160
  },
  {
    title: "打印信息",
    dataIndex: "printCount",
    render(item, rows){
      return (
        item!=0?
        <div>
          {rows.printUserName?<Tag>{rows.printUserName}</Tag>:null}
          <Tag>打印次数:{item}</Tag>
          {rows.printTime?<Tag>打印时间:{rows.printTime}</Tag>:null}
        </div>:<Tag>暂无打印</Tag>
      )
    }
  },
]