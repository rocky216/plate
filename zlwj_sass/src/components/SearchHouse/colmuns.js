import React from "react"
import {Tag} from "antd"

export const houseColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "姓名",
    dataIndex: "ownersName"
  },
  {
    title: "手机号",
    dataIndex: "ownersPhone"
  },
  {
    title: "小区/房间",
    dataIndex: "detailsList",
    render(item){
      return item.map((elem, index)=>(
              <Tag key={index}>{elem.heName}{elem.linkCode}({elem.linkType})({elem.type})</Tag>
              ))
    }
  },
  
]