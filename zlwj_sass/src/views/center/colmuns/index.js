import React from "react"
import {Tag, } from "antd"


export const plateStatisColumns = [
  {
    title: "通行时间",
    dataIndex: "buildTime"
  },
  {
    title: "停车场名称",
    dataIndex: "parkName"
  },
  {
    title: "车牌号码",
    dataIndex: "license"
  },
  {
    title: "联系人信息",
    dataIndex: "linkName"
  },
  {
    title: "入场时间",
    dataIndex: "iTime"
  },
  {
    title: "出场时间",
    dataIndex: "oTime"
  },
  {
    title: "停车时长",
    dataIndex: "sumTime",
  },
  {
    title: "收费金额",
    dataIndex: "money",
  },
  {
    title: "通行状态",
    dataIndex: "inOut",
    render(h) {
      switch (parseInt(h)){
        case 3:
          return <Tag color="red">异常</Tag>
        case 4:
          return <Tag color="orange">待支付</Tag>
        case 5:
          return <Tag color="blue">已支付</Tag>
      }
    },
  },
]

export const pileStatisColumns = [
  {
    title: "充电状态",
    dataIndex: "orderStatusStr"
  },
  {
    title: "订单编号",
    dataIndex: "orderNo"
  },
  {
    title: "订单信息",
    dataIndex: "remark"
  },
  {
    title: "下单途径",
    dataIndex: "userTypeStr"
  },
  {
    title: "订单金额信息",
    dataIndex: "orderMoneyInfo"
  },
  {
    title: "订单充电信息",
    dataIndex: "chargeInfo"
  },
  {
    title: "充电时长",
    dataIndex: "powerTimeStr"
  },
  {
    title: "充电量",
    dataIndex: "sumPower"
  },
  {
    title: "实际支付金额",
    dataIndex: "truePayFee",
    render: item=>item+"元"
  },
]

export const carLogColmuns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render: item=>item=="0"?<Tag color="red">掉线</Tag>:<Tag color="blue">在线</Tag>
  },
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "关联停车场",
    dataIndex: "carStr",
  },
  {
    title: "序列号",
    dataIndex: "deviceSerial",
  },
  {
    title: "设备类型",
    dataIndex: "deviceAttrInOut",
    render:item=>item=="out"?"出口":"入口"
  },
  {
    title: "24小时掉线次数",
    dataIndex: "offCount"
  },
  {
    title: "30天掉线次数",
    dataIndex: "offNearlyCount"
  },
  {
    title: "上下线信息",
    dataIndex: "deviceLogs",
    render(item) {
      return (
        <div>
          {item.length>0?item.map((elem, index)=>(
            <Tag key={index} >{elem.buildTime}</Tag> 
          )):null}
        </div>
      );
    }
  },
]

export const accessLogColmuns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render: item=>item=="0"?<Tag color="red">掉线</Tag>:<Tag color="blue">在线</Tag>
  },
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "序列号",
    dataIndex: "deviceSerial",
  },
  {
    title: "设备通道",
    dataIndex: "controllerDoorList",
    render(item) {
      return (
        <div>
          {item.length>0?item.map((elem, index)=>(
            <Tag key={index} color="blue" >{elem.doorName}{elem.portDetails}开门次数{elem.openSecond}</Tag>
          )):null}
        </div>
      );
    }
  },
  {
    title: "24小时掉线次数",
    dataIndex: "offCount"
  },
  {
    title: "30天掉线次数",
    dataIndex: "offNearlyCount"
  },
  {
    title: "上下线信息",
    dataIndex: "deviceLogs",
    render(item) {
      return (
        <div>
          {item.length>0?item.map((elem, index)=>(
            <Tag key={index} >{elem.buildTime}</Tag>
          )):null}
        </div>
      );
    }
  },
]

export const pileLogColmuns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render: item=>item=="0"?<Tag color="red">掉线</Tag>:<Tag color="blue">在线</Tag>
  },
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "设备端口",
    dataIndex: "portList",
    render(item) {
      return (
        <div>
          {item.length>0?item.map((elem, index)=>(
            <Tag key={index} color={elem.type==2?"red":"green"} >{elem.port}端口{elem.type==2?"异常":elem.type==0?"空闲":"使用"}</Tag>
          )):null}
        </div>
      );
    }
  },
  {
    title: "24小时掉线次数",
    dataIndex: "offCount"
  },
  {
    title: "30天掉线次数",
    dataIndex: "offNearlyCount"
  },
  {
    title: "上下线信息",
    dataIndex: "deviceLogs",
    render(item) {
      return (
        <div>
          {item.length>0?item.map((elem, index)=>(
            <Tag key={index} >{elem.buildTime}</Tag>
          )):null}
        </div>
      );
    }
  },
]