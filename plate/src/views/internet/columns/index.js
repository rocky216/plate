import React from "react"
import {Tag} from "antd"
import moment from "moment"

export const internetListColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "物联网卡iccid",
    dataIndex: "iccid"
  },
  {
    title: "卡类型 SINGLE",
    dataIndex: "type",
    render(item){
      return item=="POOL"?<Tag color="magenta">流量池卡</Tag>:<Tag color="blue">单卡</Tag>
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      switch(item){
        case "testing":
          return <Tag>测试中</Tag>
        case "inventory":
            return <Tag>库存</Tag>
        case "pending-activation":
          return <Tag>待激活</Tag>
        case "activation":
          return <Tag>已激活</Tag>
        case "deactivation":
          return <Tag>已停卡</Tag>
        case "retired":
          return <Tag>已销卡</Tag>
      }
    }
  },
  {
    title: "对应的手机号码",
    dataIndex: "msisdn" 
  },
  {
    title: "过期时间",
    dataIndex: "expiredate",
    render(item){
      return item?moment(item).format("YYYY-MM-DD hh:mm:ss"):''
    }
  },
  {
    title: "网络限速值(Kbps)",
    dataIndex: "speedlimit"
  },
  {
    title: "卡本月用量",
    dataIndex: "dataUsage"
  },
  {
    title: "运营商",
    dataIndex: "carrier",
    render(item){
      switch(item){
        case "unicom":
          return <Tag>中国联通</Tag>
        case "cmcc":
          return <Tag>中国移动</Tag>
        case "chinanet":
          return <Tag>中国电信</Tag>
      }
    }
  },
  {
    title: "项目",
    dataIndex: "reserveOne"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]