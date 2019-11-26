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

function handlenJob(arr, key){
  if(!_.isArray(arr)) return ""
  let str = []
  _.each(arr, item=>{
    str.push(item[key])
  })
  return str.join()
}

export const staffColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "员工名称",
    dataIndex: "name"
  },
  {
    title: "员工账号",
    dataIndex: "account"
  },
  {
    title: "部门",
    dataIndex: "dept",
    render(item){
      return (
        <span>{item.deptName}</span>
      )
    }
  },
  {
    title: "项目",
    dataIndex: "heList",
    render(item){
      return (
        <Tag color="orange">{handlenJob(item, "name")}</Tag>
      )
    }
  },
  {
    title: "岗位",
    dataIndex: "jobList",
    render(item){
      return (
        <Tag color="blue">{handlenJob(item, "jobName")}</Tag>
      )
    }
  },
  {
    title: "权限模板",
    dataIndex: "role",
    render(item){
      return (
        <span>{item?item.roleName:"暂无"}</span>
      )
    }
  },
]

