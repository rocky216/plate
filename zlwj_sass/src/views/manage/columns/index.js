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
    dataIndex: "buildInfo"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
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
    title: "创建信息",
    dataIndex: "buildInfo"
  },
  {
    title: "支出金额",
    dataIndex: "orderTrueFee"
  }
]

export const exceptionColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "审批人",
    dataIndex: "checkUserName"
  },
  {
    title: "异常说明",
    dataIndex: "exceptionInfo"
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
    dataIndex: "buildInfo"
  },
]