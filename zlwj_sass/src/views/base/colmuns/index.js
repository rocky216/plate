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
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return <Tag color={item=="0"?"#2db7f5":"#f50"}>{item=="0"?"启用":"禁用"}</Tag>
    }
  }
]

export const roleColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "角色名称",
    dataIndex: "roleName"
  }
]

