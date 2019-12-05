import React from "react"
import {Tag} from "antd"

export const themeColmuns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "主题名称",
    dataIndex: "themeName",
  },
  {
    title: "描述",
    dataIndex: "themeEndText",
  },
  {
    title: "主题类型",
    dataIndex: "themeType",
  },
  {
    title: "投票类型",
    dataIndex: "voteType",
    render(item){
      return item=="0"?<Tag color="magenta">全体业主</Tag>:<Tag color="blue">部分业主</Tag>
    }
  },
  {
    title: "单人投票数量",
    dataIndex: "singleCount",
  },
  {
    title: "投票开始时间",
    dataIndex: "startTime",
  },
  {
    title: "投票结束时间",
    dataIndex: "endTime",
  },
]