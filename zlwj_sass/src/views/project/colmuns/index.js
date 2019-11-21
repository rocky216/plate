import React from "react"
import {Tag} from "antd"

export const itemColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "小区名称",
    dataIndex: "name",
  },
  {
    title: "小区编码",
    dataIndex: "code",
    render(item){
      return <Tag color="volcano">{item}</Tag>
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return <Tag color={item=="0"?"#108ee9":"#f50"}>{item=="0"?"启用":"禁用"}</Tag>
    }
  }
]