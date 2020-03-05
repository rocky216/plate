import React from "react"
import {Tag} from "antd"

export const merchantColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "应用名称",
    dataIndex: "name"
  },
  {
    title: "应用Key",
    dataIndex: "skey"
  },
  {
    title: "应用Secret",
    dataIndex: "secret"
  },
  {
    title: "商户名称",
    dataIndex: "mchName"
  },
  {
    title: "商户号ID",
    dataIndex: "mchId"
  },
  {
    title: "商户号Key",
    dataIndex: "mchKey"
  },
  {
    title: "商户号Secret",
    dataIndex: "mchSecret"
  },
  {
    title: "类别",
    dataIndex: "type",
    render(item){
      switch(parseInt(item)){
        case 1:
          return "微信小程序"
        case 2:
          return "微信APP"
        case 3:
          return "支付宝小程序"
        case 4:
          return "支付宝APP"
      }
    }
  },
]

export const sysLibraryColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "字典名称",
    dataIndex: "dictName"
  },
  {
    title: "字典表名字段",
    dataIndex: "tableName"
  },
  {
    title: "表名类型字段",
    dataIndex: "tableField"
  },
  
]

export const companyColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "公司简称",
    dataIndex: "nickname"
  },
  {
    title: "公司全称",
    dataIndex: "name"
  },
]

export const heColmuns = function(_this){
  return [
    {
      title: "序号",
      dataIndex: "key"
    },
    {
      title: "项目名称",
      dataIndex: "name"
    },
    {
      title: "短息签名",
      dataIndex: "smsFeigeSigns",
      render(item, rows){
        return (
          <div>
            {item.map(elem=>(
              <Tag key={elem.id} visible={!elem.visible} 
              closable onClose={_this.handlenClose.bind(_this, rows, elem, "signName")}  >{elem.signName}</Tag>
            ))}
          </div>
        )
      }
    },
    {
      title: "短息模板",
      dataIndex: "smsFeigeTemplates",
      render(item, rows){
        return (
          <div>
            {item.map(elem=>(
              <Tag key={elem.id} visible={!elem.visible} closable 
              onClose={_this.handlenClose.bind(_this, rows, elem, "templateName")}  >{elem.templateName}</Tag>
            ))}
          </div>
        )
      }
    },
  ]
}

export const signColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "签名ID",
    dataIndex: "signId"
  },
  {
    title: "签名名称",
    dataIndex: "signName"
  },
]

export const mesTempColmuns = [
  {
    title: "序号",
    width:100,
    dataIndex: "key"
  },
  {
    title: "签名名称",
    width:200,
    dataIndex: "templateName"
  },
  {
    title: "内容",
    dataIndex: "templateContent"
  },
  {
    title: "变量数",
    width:80,
    dataIndex: "templateVarNum"
  },
]