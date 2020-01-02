import React from "react"
import {Input, InputNumber, Icon, Button, Tag} from "antd"
const {TextArea} = Input

export const propertyfeeColmuns = [
  {
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 2:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>异常</div></div>
        case 3:
          return ""
        case 4: 
          return <div style={{color: "#ff6969", textAlign:"center"}}><i className="icon iconfont icon-close" /><div>关闭</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "姓名",
    dataIndex: "owners",
    render(item){
      return item?item.name:"无"
    }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render(e,rows){
      return rows.owners?rows.owners.phone:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "房间号",
    dataIndex: "houseUrlStr"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
  {
    title: "优惠金额",
    dataIndex: "orderDiscountFee"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
]

export const propertyDetailColmuns = [
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
    title: "房屋楼层条件",
    dataIndex: "floorStart",
    render(item, rows){
      return `${item}-${rows.floorEnd}层`
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
          return "建筑面积乘金额"
        case 2:
          return "室内面积乘金额"
        case 3:
          return "公摊面积乘金额"
      } 
    }
  },
  {
    title: "收费金额",
    dataIndex: "fee"
  },
  {
    title: "时间单位",
    dataIndex: "feeTime",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "月"
        case 1:
          return "季度"
        case 2:
          return "年"
      } 
    }
  },
  {
    title: "总金额",
    dataIndex: "totalFee"
  },
]

export const shopPropertyfeeColmuns = [
  {
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 2:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>异常</div></div>
        case 3:
          return ""
        case 4: 
          return <div style={{color: "#ff6969", textAlign:"center"}}><i className="icon iconfont icon-close" /><div>关闭</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "姓名",
    dataIndex: "owners",
    render(item){
      return item?item.name:"无"
    }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render(e,rows){
      return rows.owners?rows.owners.phone:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "商铺号",
    dataIndex: "houseUrlStr"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
  {
    title: "优惠金额",
    dataIndex: "orderDiscountFee"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
]

export const exceptionColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "异常说明",
    dataIndex: "exceptionInfo"
  },
  {
    title: "状态",
    dataIndex: "exceptionStatus",
    render(item){
      switch(parseInt(item)){
        case 1:
          return <span style={{color:"#60b2ef"}}>待审核</span>
        case 2:
          return <span style={{color:"#26ba17"}}>审核通过</span>
        case 3:
          return <span style={{color:"#faaa39"}}>审核不通过</span>
        case 4:
          return <span style={{color:"#ff6969"}}>关闭订单</span>
        case 5:
          return <span style={{color:"#60b2ef"}}>撤回异常</span>
      }
    }
  },
  {
    title: "状态说明",
    render(item){ 
      if(item.exceptionStatus==2||item.exceptionStatus==3||item.exceptionStatus==4){
        return (
          <div>
            <Tag>{item.checkInfo}</Tag>
            <Tag>{item.checkUserName}</Tag>
            <Tag>{item.checkTime}</Tag>
            {item.updateFeeStatus=="0"?null:<Tag color="magenta">金额￥{item.updateFeeStatus=="2"?'-'+item.updateFee:item.updateFee}</Tag>}
            
          </div>
        )
      }else if(item.exceptionStatus==5){
        return (
          <div>
            <Tag>{item.remark}</Tag>
            <Tag>{item.updateUserName}</Tag>
            <Tag>{item.updateTime}</Tag>
          </div>
        )
      }else {
        return ""
      }
    }
  },
  {
    title: "创建人",
    dataIndex: "exceptionUserName"
  },
  {
    title: "创建时间",
    dataIndex: "buildTime"
  },
]

export const otherDetailColumns = function(_this){
  return [
    {
      title: "序号",
      dataIndex: "key"
    },
    {
      title: "收费名称",
      dataIndex: "feeName",
      render(item, rows, index){
        return <Input value={item} onChange={_this.changeFeeName.bind(_this, index, "feeName")} />
      }
    },
    {
      title: "收费金额",
      dataIndex: "feeMoney",
      render(item, rows, index){
        return <InputNumber min={0} value={item} onChange={_this.changeFeeName.bind(_this, index, "feeMoney")} />
      }
    },
    // {
    //   title: "缴费开始时间",
    //   dataIndex: "feeStartTime"
    // },
    // {
    //   title: "缴费结束时间",
    //   dataIndex: "feeEndTime"
    // },
    {
      title: "备注",
      dataIndex: "remark",
      render(item, rows, index){
        return <TextArea autoSize={{minRows: 1}} value={item} onChange={_this.changeFeeName.bind(_this, index, "remark")} />
      }
    },
    {
      title: "操作",
      render(item, rows, index){
        return <Icon type="delete" onClick={_this.deleteDetail.bind(_this, index)} style={{color: "red", cursor: "pointer"}} />
      }
    }
  ]
}

export const otherfeeColmuns = [
  {
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 2:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>异常</div></div>
        case 3:
          return ""
        case 4: 
          return <div style={{color: "#ff6969", textAlign:"center"}}><i className="icon iconfont icon-close" /><div>关闭</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "姓名",
    dataIndex: "faOtherCostsOrderR",
    render(item){
      return item?item.name:"无"
    }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render(e,rows){
      return rows.faOtherCostsOrderR?rows.faOtherCostsOrderR.phone:"无"
    }
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(e,rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>商铺</Tag>
        case 3:
          return <Tag>合作商</Tag>
      }
    }
  },
  {
    title: "名称",
    render(e,rows){
      return rows.faOtherCostsOrderR?rows.faOtherCostsOrderR.nickname:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
]

export const expendfeeColmuns = [
  {
    title: "状态",
    width:80,
    dataIndex: "key",
    render(item, rows){
      switch(parseInt(rows.orderStatus)){
        case 2:
          return <div style={{color: "#26ba17", textAlign:"center"}}><i className="icon iconfont icon-zhengchang" /><div>正常</div></div>
        case 1:
          return <div style={{color: "#60b2ef", textAlign:"center"}}><i className="icon iconfont icon-xingzhuang" /><div>待审核</div></div>
        case 3:
          return <div style={{color: "#faaa39", textAlign:"center"}}><i className="icon iconfont icon-yichang" /><div>驳回</div></div>
        default: 
          return ""
      }
    }
  },
  {
    title: "姓名",
    dataIndex: "faOtherCostsOrderR",
    render(item){
      return item?item.name:"无"
    }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render(e,rows){
      return rows.faOtherCostsOrderR?rows.faOtherCostsOrderR.phone:"无"
    }
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(e,rows){
      switch(parseInt(rows.orderStatus)){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>商铺</Tag>
        case 3:
          return <Tag>合作商</Tag>
      }
    }
  },
  {
    title: "名称",
    render(e,rows){
      return rows.faOtherCostsOrderR?rows.faOtherCostsOrderR.nickname:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
]