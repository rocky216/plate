import React from "react"
import {Tag} from "antd"

export const accountColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "账户名称",
    dataIndex: "name"
  },
  {
    title: "账号",
    dataIndex: "account",
    render(item){
      return item?item:"无"
    }
  },
  {
    title: "资金(元)",
    dataIndex: "amount"
  },
  {
    title: "账户类型",
    dataIndex: "accountType",
    render(item){
      switch(item){
        case "cash":
          return <Tag color="red">现金账户</Tag>
        case "wechat":
          return <Tag color="volcano">微信账户</Tag>
        case "alipay":
          return <Tag color="orange">支付宝账户</Tag>
        case "bank":
          return <Tag color="blue">银行账户</Tag>
      }
    }
  },
  {
    title: "关联信息",
    dataIndex: "linkType",
    render(item, rows){
      if(item==1){
        return <Tag color="geekblue">{rows.heNameStr}</Tag>
      }else{
        return "无"
      }
    }
  },
  {
    title: "账户说明",
    dataIndex: "accountInfo"
  },
]

export const accountLogColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "账户名称",
    dataIndex: "accountNameStr"
  },
  {
    title: "变更时间",
    dataIndex: "buildTime"
  },
  
  {
    title: "收支类型",
    dataIndex: "logType",
    render(item){
      return <Tag color={item=="0"?"#f50":"#2db7f5"}>{item=="0"?"出账":"进账"}</Tag>
    }
  },
  {
    title: "日志类型",
    dataIndex: "linkTypeStr"
  },
  {
    title: "关联单号",
    dataIndex: "linkNo",
    render(item){
      return item?<Tag color="magenta">{item}</Tag>:"无"
    }
  },
  {
    title: "起始金额(元)",
    dataIndex: "startAmount"
  },
  {
    title: "操作金额(元)",
    dataIndex: "handleAmount",
    render(item, rows){
      return rows.logType=="1"?<span className="greenColor">+{item}</span>:<span className="redColor">-{item}</span>
    }
  },
  {
    title: "余额(元)",
    dataIndex: "endAmount"
  },
]


export const propertyTemColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "模板名称",
    dataIndex: "templateName"
  },
  {
    title: "所属项目",
    dataIndex: "heNameStr"
  },
  {
    title: "模板类型",
    dataIndex: "templateType",
    render(item){
      return item=="0"?"住宅":"商铺"
    }
  },
  {
    title: "运用数量",
    dataIndex: "companyNameStr"
  },
]

export const chargeColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "模板名称",
    dataIndex: "detailsName"
  },
  {
    title: "房屋类型",
    dataIndex: "houseType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "电梯和楼梯房"
        case 1:
          return "电梯房"
        case 2:
          return "楼梯房"
      }
    }
  },
  {
    title: "房屋面积条件",
    dataIndex: "areaConditionType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "无条件"
        case 1:
          return "建筑面积"
        case 2:
          return "室内面积"
        case 3:
          return "公摊面积"
      }
    }
  },
  {
    title: "适用面积",
    render(rows){
      if(!rows.areaStart || !rows.areaEnd){
        return "无"
      }else{
        return <span>{rows.areaStart+'-'+rows.areaEnd+"m"}<sup>2</sup></span>
      } 
    }
  },
  {
    title: "房屋楼层",
    render(rows){
      if(!rows.floorStart || !rows.floorEnd){
        return "无"
      }else{
        return rows.floorStart+'-'+rows.floorEnd+"层"
      }
    }
  },
  {
    title: "收费类型",
    dataIndex: "feeType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "固定金额"
        case 1:
          return "建筑面积*金额"
        case 2:
          return "室内面积*金额"
        case 3:
          return "公摊面积*金额"
      }
    }
  },
  {
    title: "收费金额(元)",
    dataIndex: "fee",
  },
  {
    title: "时间单位",
    dataIndex: "feeTime",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "一月"
        case 1:
          return "一季度"
        case 2:
          return "一年"
      }
    }
  },
  {
    title: "未装修减免",
    dataIndex: "notFixPercentage",
  },
]