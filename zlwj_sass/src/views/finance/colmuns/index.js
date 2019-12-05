import React from "react"
import {Tag} from "antd"

export const accountColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "账户名称",
    dataIndex: "name"
  },
  {
    title: "账号",
    dataIndex: "account",
    render(item){
      return item?item:"无"
    }
  },
  {
    title: "资金(元)",
    dataIndex: "amount"
  },
  {
    title: "账户类型",
    dataIndex: "accountType",
    render(item){
      switch(item){
        case "cash":
          return <Tag color="red">现金账户</Tag>
        case "wechat":
          return <Tag color="volcano">微信账户</Tag>
        case "alipay":
          return <Tag color="orange">支付宝账户</Tag>
        case "bank":
          return <Tag color="blue">银行账户</Tag>
      }
    }
  },
  {
    title: "关联信息",
    dataIndex: "linkType",
    render(item, rows){
      if(item==1){
        return <Tag color="geekblue">{rows.heNameStr}</Tag>
      }else{
        return "无"
      }
    }
  },
  {
    title: "账户说明",
    dataIndex: "accountInfo"
  },
]

export const accountLogColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "账户名称",
    dataIndex: "accountNameStr"
  },
  {
    title: "变更时间",
    dataIndex: "buildTime"
  },
  
  {
    title: "收支类型",
    dataIndex: "logType",
    render(item){
      return <Tag color={item=="0"?"#f50":"#2db7f5"}>{item=="0"?"出账":"进账"}</Tag>
    }
  },
  {
    title: "日志类型",
    dataIndex: "linkTypeStr"
  },
  {
    title: "关联单号",
    dataIndex: "linkNo",
    render(item){
      return item?<Tag color="magenta">{item}</Tag>:"无"
    }
  },
  {
    title: "起始金额(元)",
    dataIndex: "startAmount"
  },
  {
    title: "操作金额(元)",
    dataIndex: "handleAmount",
    render(item, rows){
      return rows.logType=="1"?<span className="greenColor">+{item}</span>:<span className="redColor">-{item}</span>
    }
  },
  {
    title: "余额(元)",
    dataIndex: "endAmount"
  },
]