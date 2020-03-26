import React from "react"
import {Icon, Tag} from "antd"

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
    title: "公司编号",
    dataIndex: "companyCode"
  },
  {
    title: "KEY",
    dataIndex: "appId"
  },
  {
    title: "Serct",
    dataIndex: "appSecret"
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return item=="1"?"正常":"异常"
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const companyDeviceColumns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render(item){
      return item=="1"?<Icon type="check-circle" style={{color: "#1DA57A", fontSize: 20}} />:<Icon type="close-circle" style={{color: "red", fontSize: 20}} />
    }
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "设备ID",
    width: 100,
    dataIndex: "iotId"
  },
  {
    title: "设备序列号",
    dataIndex: "deviceSerial"
  },
  {
    title: "设备KEY",
    dataIndex: "deviceKey"
  },
  {
    title: "设备Screct",
    dataIndex: "deviceSecret"
  },
  {
    title: "属性名称",
    dataIndex: "deviceAttrName"
  },
  {
    title: "版本名称",
    dataIndex: "deviceVerName"
  },
  {
    title: "设备型号",
    dataIndex: "deviceModelName"
  },
  {
    title: "字段1",
    dataIndex: "reserveOne"
  },
  {
    title: "字段2",
    dataIndex: "reserveTwo"
  },
  {
    title: "字段3",
    dataIndex: "reserveThree"
  },
  {
    title: "字段4",
    dataIndex: "reserveFour"
  },
  {
    title: "字段5",
    dataIndex: "reserveFive"
  },
  {
    title: "上下线日志",
    dataIndex: "deviceLogList",
    width: 150,
    render(item){
      return item.map(elem=>(
      <Tag color={elem.logType=="onLine"?"green":"red"}>{elem.logType=="onLine"?"上线":"下线"}{elem.buildTime}</Tag>
      ))
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]