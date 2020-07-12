import React from "react"
import {Tag} from "antd"
import {Status} from "@/interface/attr"

export const roleColumns = [
  {
    title: "权限名称",
    dataIndex: "name"
  },
  {
    title: "状态",
    dataIndex: "status"
  },
  {
    title: "创建时间",
    dataIndex: "buildTime"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const usersColumns = [
  {
    title: "账户名",
    dataIndex: "name"
  },
  {
    title: "账号",
    dataIndex: "account"
  },
  {
    title: "联系方式",
    dataIndex: "phone"
  },
  {
    title: "状态",
    dataIndex: "status",
    render:(item:any)=><Tag>{Status[item]}</Tag>
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
  {
    title: "创建时间",
    dataIndex: "buildTime"
  },
]

export const companyColumns = [
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "logo",
    dataIndex: "logoUrl",
    render(item:any) {
      
      return <img src={item} style={{width: 100}}/>;
    }
  },
  {
    title: "编号",
    dataIndex: "code"
  },
  {
    title: "负责人名称",
    dataIndex: "manageName"
  },
  {
    title: "负责人电话",
    dataIndex: "managePhone"
  }
]