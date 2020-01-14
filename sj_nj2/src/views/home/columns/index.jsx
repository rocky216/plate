import React from "react"
import {Button} from "antd"

export const overworkColumns = function(_this){
  return [
    {
      title: "加班申请单号",
      dataIndex: "workNo"
    },
    {
      title: "车间",
      dataIndex: "deptName"
    },
    {
      title: "标题",
      dataIndex: "workTitle"
    },
    {
      title: "申请人",
      dataIndex: "applyName"
    },
    {
      title: "流程节点",
      dataIndex: "dName"
    },
    {
      title: "审批流程",
      render(item){
        return <Button type="link" size="small" onClick={_this.handlenOverFlow.bind(_this, item)} >查看</Button>
      }
    },
    {
      title: "创建时间",
      dataIndex: "applyTime"
    }
  ]
}