import React from "react"
import {Tag} from "antd"

export const newsColumns  = [
  {
    title: "发件人",
    dataIndex: "key",
    render(){
      return "系统通知"
    }
  },
  {
    title: "标题",
    dataIndex: "noticeName"
  },
  {
    title: "时间",
    dataIndex: "organTime"
  },
  {
    title: "状态",
    dataIndex: "readTime",
    render(item){
      return !item?<Tag color="red">未读</Tag>:<Tag color="green">已读</Tag>
    }
  },
]