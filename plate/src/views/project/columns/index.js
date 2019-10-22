
import React from "react"
import {Tag} from "antd"

export const projectColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "项目名称",
    dataIndex: "housingEstateName"
  },
  {
    title: "项目编号",
    dataIndex: "code"
  },
  {
    title: "经度",
    dataIndex: "longitude"
  },
  {
    title: "纬度",
    dataIndex: "latitude"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  }
]

export const accountColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "账号",
    dataIndex: 'account'
  },
  {
    title: "邮箱",
    dataIndex: 'email'
  },
  {
    title: "创建时间",
    dataIndex: 'createTime'
  },
  {
    title: "更新时间",
    dataIndex: 'updateTime'
  },
  {
    title: "备注",
    dataIndex: 'remark'
  },
  
]

export const roleColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "角色名称",
    dataIndex: "roleName"
  },
  {
    title: "角色标识",
    dataIndex: "roleKey"
  },
  {
    title: "角色排序",
    dataIndex: "roleSort"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "更新时间",
    dataIndex: "updateTime"
  },
]

export const deviceListColumns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "设备序列号",
    dataIndex: "deviceSerial",
  },
  {
    title: "出入口",
    dataIndex: "inOut",
    render(item){
      switch(item.toString()){
        case "0":
          return "无"
        case "1":
          return "进口"
        case "2":
          return "出口"
      }
    }
  },
  {
    title: "状态",
    dataIndex: "online",
    render(item){
      return (
        <span>{item==1?<Tag color="#2db7f5">上线</Tag>:<Tag color="#f50">下线</Tag>}</span>
      )
    }
  },
  {
    title: "经度",
    dataIndex: "longitude",
  },
  {
    title: "纬度",
    dataIndex: "latitude",
  },
  {
    title: "设备描述",
    dataIndex: "deviceDesc",
  },
  {
    title: "描述",
    dataIndex: "remark",
  }
]