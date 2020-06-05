import React from "react"
import {Tag} from "antd"
import {ENABLE} from "./constant"


export const estateColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "小区名称",
    dataIndex: "itemName"
  },
  {
    title: "小区编码",
    dataIndex: "itemCode"
  },
  {
    title: "负责人联系方式",
    dataIndex: "phone"
  },
  {
    title: "是否启用",
    dataIndex: "status",
    render:(item:number)=><Tag color={item==0?"red":"blue"}>{ENABLE[item]}</Tag>
  },
  {
    title: "公司名称",
    dataIndex: "key1"
  }
]

export const companyColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "公司名称",
    dataIndex: "companyName"
  },
  {
    title: "公司编码",
    dataIndex: "companyCode"
  },
  {
    title: "联系方式",
    dataIndex: "phone"
  },
  {
    title: "物业联动编码(由物业系统那边提供)",
    dataIndex: "wuyeLinkCode"
  },
  {
    title: "APPID",
    dataIndex: "appId"
  },
  {
    title: "APPSERCRT",
    dataIndex: "appSecret"
  },
  {
    title: "充电是否启用",
    dataIndex: "status",
    render:(item:number)=><Tag color={item==0?"red":"blue"}>{ENABLE[item]}</Tag>
  },
]