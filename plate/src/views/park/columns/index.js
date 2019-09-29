import React from "react"
import {InputNumber} from "antd"

const models = [
  {title: "天", value: "D"},
  {title: "星期", value: "W"},
  {title: "月", value: "M"},
  {title: "季", value: "S"},
  {title: "年", value: "Y"},
]

export const parkColumns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "租赁模式",
    dataIndex: "leaseModel",
    render(item, row){
      let data = _.filter(models, o=>o.value==row.leaseModel)[0]
      return(
        <div>{data.title}</div>
      )
    }
  },
  {
    title: "租赁金额",
    dataIndex: "money"
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


export function plateColumns(_this){
  return [
    {
      title: "序号",
      dataIndex: "key",
    },
    {
      title: "姓名",
      dataIndex: "username",
    },
    {
      title: "车牌号",
      dataIndex: "license",
    },
    {
      title: "车位编号",
      dataIndex: "parkingLot",
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
}

export const plateConfColumns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "车位数量",
    dataIndex: "carNum",
  },
  {
    title: "没车位时是否控制外来",
    dataIndex: "foreignControl",
    render(item){
      return item==1?<span>没车位时不允许</span>:<span>没车位也允许</span>
    }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
]