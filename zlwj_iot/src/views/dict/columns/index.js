import React from "react"
import {Tag} from "antd"


export const argumentsColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "名称",
    dataIndex: "callbackParamName"
  },
  {
    title: "编码",
    dataIndex: "callbackParamCode"
  }
]

export const apiColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "请求路径",
    dataIndex: "requestUrl"
  },
  {
    title: "请求名称",
    dataIndex: "requestName"
  },
  {
    title: "描述",
    dataIndex: "remark"
  }
]

export const queuesColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "名称",
    dataIndex: "queuesName"
  },
  {
    title: "公司名称",
    dataIndex: "companyNameStr"
  },
  {
    title: "设备类型",
    dataIndex: "deviceTypeName"
  },
  {
    title: "设备品牌",
    dataIndex: "deviceBrandName"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const switchColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "名称",
    dataIndex: "exchangesName"
  },
  {
    title: "交换机类型",
    dataIndex: "exchangesType"
  },
  {
    title: "公司名称",
    dataIndex: "companyNameStr"
  },
  {
    title: "设备类型",
    dataIndex: "deviceTypeName"
  },
  {
    title: "队列",
    width: 120,
    dataIndex: "iotQueues",
    render(item){
      return item.map(elem=>(
        <Tag key={elem.id} >{elem.queuesName}</Tag>
      ))
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]