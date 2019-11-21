import React from "react"
import {Tag} from "antd"

export const stationColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "岗位名称",
    dataIndex: "jobName",
  },
  {
    title: "岗位编码",
    dataIndex: "jobCode",
    render(item){
      return <Tag color="volcano">{item}</Tag>
    }
  },
  {
    title: "岗位描述",
    dataIndex: "jobDesc"
  }
]

