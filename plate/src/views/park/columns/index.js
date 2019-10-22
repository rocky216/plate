import React from "react"
import {InputNumber} from "antd"
import {Row,Col, Tag } from 'antd';

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
      title: "联系人",
      dataIndex: "mobile",
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

export const parkOrderListColumns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "订单号",
    dataIndex: "orderNo",
  },
  {
    title: "租赁号",
    dataIndex: "leaseNo",
  },
  {
    title: "金额(元)",
    dataIndex: "payment",
  },
  {
    title: "回执单号",
    dataIndex: "payNo",
  },
  {
    title: "支付时间",
    dataIndex: "payTime",
  },
  {
    title: "回调时间",
    dataIndex: "payCallbackTime",
  },
]

export const leaseListColumns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "车牌",
    dataIndex: "license",
  },
  {
    title: "租赁号",
    dataIndex: "leaseNo",
  },
  {
    title: "状态",
    dataIndex: "leaseStatus",
    render(item){
      return (
        <span>{item==1?<Tag color="green">已生效</Tag>:<Tag color="red">未生效</Tag>}</span>
      )
    }
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
  }
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
  }
]

export const passListColumns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  {
    title: "车牌",
    dataIndex: "license",
  },
  {
    title: "入口信息",
    width: 600,
    render(item){
      return (
        <Row>
          <Col span={6}>
            <Tag className="mgb5" color="red">{item.iSerialnoName?item.iSerialnoName:"无"}</Tag>
            <br></br>
            <Tag className="mgb5" color="green">{item.iSerialno?item.iSerialno:"无"}</Tag>
            <br></br>
            <Tag>{item.iTime?item.iTime:"无"}</Tag>
          </Col>
          <Col  span={6}>
            <img src={item.iImageFragment} style={{width: 100}} />
          </Col>
          <Col span={6}>
            <img src={item.iImage} style={{width: 120}} />
          </Col>
        </Row>
      )
    }
  },
  {
    title: "出口信息",
    width: 600,
    render(item){
      return (
        <Row>
          <Col span={6}>
            <Tag className="mgb5" color="red">{item.oSerialnoName?item.oSerialnoName:"无"}</Tag>
            <br></br>
            <Tag className="mgb5" color="green">{item.oSerialno?item.oSerialno:"无"}</Tag>
            <br></br>
            <Tag>{item.oTime?item.oTime:"无"}</Tag>
          </Col>
          <Col  span={6}>
            <img src={item.oImageFragment} style={{width: 100}} />
          </Col>
          <Col span={6}>
            <img src={item.oImage} style={{width: 120}} />
          </Col>
        </Row>
      )
    }
  },
  {
    title: "通行状态",
    dataIndex: "inOut",
    render(item){
      switch(parseInt(item)){
        case 0:
          return <Tag color="geekblue">进口</Tag>
        case 1:
          return <Tag color="cyan">出口</Tag>
        case 2:
          return <Tag color="#f50">异常</Tag>
      }
    }
  }
]