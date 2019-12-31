import React from "react"

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
    title: "序号",
    dataIndex: "状态",
    width:80,
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
    render(item){
      return item.owners?item.owners.name:"无"
    }
  },
  {
    title: "手机号",
    render(item){
      return item.owners?item.owners.phone:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  },
  {
    title: "优惠金额",
    dataIndex: "orderDiscountFee"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
]
export const allExpendColumns = [
  {
    title: "序号",
    dataIndex: "状态",
    width:80,
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
    render(item){
      return item.owners?item.owners.name:"无"
    }
  },
  {
    title: "手机号",
    render(item){
      return item.owners?item.owners.phone:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  },
  {
    title: "优惠金额",
    dataIndex: "orderDiscountFee"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
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