import React from "react"
import {Input, InputNumber, Icon, Button, Tag} from "antd"
const {TextArea} = Input

export const ownerLinkAssetsListColumns = [
  {
    title: "资产类型",
    dataIndex: "assetsType",
    render(item){
      switch(item){
        case "house":
          return "住宅"
        case "other":
          return "非住宅"
        case "parkingSpace":
          return "停车位"
      }
    }
  },
  {
    title: "资产编号",
    dataIndex: "assetsCode"
  },
  {
    title: "关联类型",
    dataIndex: "linkType"
  },
  {
    title: "建筑面积",
    dataIndex: "houseArea",
    render(item){
    return <div>{item}m&sup2;</div>;
    }
  },
  {
    title: "交付时间",
    dataIndex: "deliversTime",
    render(item) {
      return item?item.substring(0,10):""
    }
  },
  {
    title: "已缴物业费区间",
    dataIndex: "payFristTime",
    render(item, rows){
      return item && rows.payLastTime? `${item.substring(0,10)}到${rows.payLastTime.substring(0,10)}`:"暂无"
    }
  },
]

export const repairColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "报修名称",
    dataIndex: "repairName"
  },
  {
    title: "报修类型",
    dataIndex: "repairTypeName"
  },
  {
    title: "报修单号",
    dataIndex: "repairNo"
  },
  {
    title: "提交途径",
    dataIndex: "submitType",
    render(item){
      switch(item){
        case "A":
          return "业主App"
        case "B":
          return "物业后台"
        case "C":
          return "物业APP"
      }
    }
  },
  {
    title: "处理状态",
    dataIndex: "processingState",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "待处理"
        case 1:
          return "处理中"
        case 2:
          return "已处理"
      }
    }
  },
  {
    title: "备注",
    dataIndex: "processingInfo"
  },
  {
    title: "接单类型",
    dataIndex: "processingOrderType",
    render(item){
      switch(item){
        case "A":
          return "物业后台接单"
        case "B":
          return "物业APP"
      }
    }
  },
]

export const plateRecordColumns = [
  {
    title: "通行时间",
    dataIndex: "updateTime"
  },
  {
    title: "车牌号码",
    dataIndex: "license"
  },
  {
    title: "入口信息",
    dataIndex: "inIotName",
    render(item, rows){
      return (
        <div>
          <Tag>{item?item:"暂无"}</Tag>
          <Tag>{rows.iTime?rows.iTime:"暂无"}</Tag>
        </div>
      )
    }
  },
  {
    title: "出口信息",
    dataIndex: "outIotName",
    render(item, rows){
      return (
        <div>
          <Tag>{item?item:"暂无"}</Tag>
          <Tag>{rows.oTime?rows.oTime:"暂无"}</Tag>
        </div>
      )
    }
  },
  {
    title: "收费金额",
    dataIndex: "money"
  },
  {
    title: "通行状态",
    dataIndex: "inOut",
    render(item){
      switch(parseInt(item)){
        case 1:
          return <Tag>进口</Tag>
        case 2:
          return <Tag>出口</Tag>
        case 3:
          return <Tag>异常</Tag>
        case 4:
          return <Tag>待支付</Tag>
        case 5:
          return <Tag>已支付</Tag>
      }
    }
  },
]

export const powerOrderColumns = [
  {
    title: "充电状态",
    dataIndex: "orderStatus",
    render(item){
      switch(parseInt(item)){
        case 0:
          return <div style={{color: "rgb(135, 208, 104)", textAlign:"center"}}>
                  <Icon type="exclamation-circle"  />
                  <p>待充电</p>
                </div>
        case 1:
          return <div style={{color: "rgb(45, 183, 245)", textAlign:"center"}}>
                  <Icon type="clock-circle"  />
                  <p>充电中</p>
                </div>
              
        case 2:
          return <div style={{color: "rgb(16, 142, 233)", textAlign:"center"}}>
                  <Icon  type="check-circle" />
                  <p>充电完成</p>
                </div>
        case 3:
          return <div style={{color: "rgb(255, 85, 0)", textAlign:"center"}}>
                  <Icon  type="close-circle" />
                  <p>待充失败</p>
                </div>
      }
    }
  },
  {
    title: "下单途径",
    dataIndex: "useType",
    render(item){
      switch(item){
        case "W":
          return "微信"
        case "C":
          return "充点卡"
        case "G":
          return "智联万家"
      }
    }
  },
  {
    title: "充电桩",
    dataIndex: "deviceName",
    render(item, rows){
    return <Tag>{item+" 端口"+rows.port}</Tag>
    }
  },
  {
    title: "收费信息",
    dataIndex: "unitFee",
    render(item, rows){
      return (
        <div>
          <Tag>{item+"元/"+rows.unitMin+"分钟"}</Tag>
          <Tag>{"付款金额"+rows.payFee+"元"}</Tag>
          <Tag>{"退款金额"+rows.returnFee+"元"}</Tag>
        </div>
      )
    }
  },
  {
    title: "订单配置",
    dataIndex: "returnFeeStatus",
    render(item, rows){
      return (
        <div>
          <Tag>{item=="0"?"提前结束不退还金额":"提前结束退还多余金额"}</Tag>
          <Tag>{rows.selfHelpCloseStatus==0?"不允许手动结束":"允许手动结束"}</Tag>
        </div>
      )
    }
  },
  {
    title: "基础信息",
    dataIndex: "powerTimeStr",
    render(item, rows){
      return (
        <div>
          <Tag>{item}</Tag>
          <Tag>{"电量"+rows.sumPower?rows.sumPower:"暂无"}</Tag>
          <Tag>{rows.startTime+"-"+(rows.endTime?rows.endTime:"暂无")}</Tag>
        </div>
      ) 
    }
  },
  {
    title: "订单金额",
    render(item){
      return (item.payFee-item.returnFee)+"元"
    }
  },
]

export const importPlateColumns = [
  {
    title: "行数",
    dataIndex: "line"
  },
  {
    title: "车牌",
    dataIndex: "licensePlate"
  },
  {
    title: "联系人",
    dataIndex: "linkName" 
  },
  {
    title: "联系人电话",
    dataIndex: "linkPhone"
  },
  {
    title: "异常信息",
    dataIndex: "errorRemark"
  },
]

export const onecardColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "IC卡",
    dataIndex: "icNumber"
  },
  {
    title: "ID卡",
    dataIndex: "idNumber"
  },
  {
    title: "业主",
    dataIndex: "ownerName"
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return item=="0"?<Tag color="green">正常</Tag>:<Tag color="red">停用</Tag>
    }
  },
  {
    title: "类型",
    dataIndex: "cardType",
    render(item){
      return item=="0"?"普通卡":"工作卡"
    }
  },
  {
    title: "余额",
    dataIndex: "balance"
  },
  {
    title: "积分",
    dataIndex: "score"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const carColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "车牌",
    dataIndex: "licensePlate"
  },
  {
    title: "业主",
    dataIndex: "ownerName"
  },
  {
    title: "联系人",
    dataIndex: "linkName"
  },
  {
    title: "联系人电话",
    dataIndex: "linkPhone"
  },
  {
    title: "关联停车场",
    dataIndex: "carCarparksList",
    render(item){
      return item && item.length?item.map(elem=>(
      <Tag key={elem.id}>{elem.carparkName}({elem.pastStatus})</Tag>
      )):""
    }
  },
]

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
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(item){
      switch( parseInt(item) ){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>非住宅</Tag>
        case 2:
          return <Tag>停车位</Tag>
      }
    }
  },
  
  {
    title: "关联信息",
    dataIndex: "showOrderLinkName",
  },
  {
    title: "业主信息",
    dataIndex: "owners",
    render(item){
      return item?`${item.name}(${item.phone})`:"无"
    }
  },
  {
    title: "缴费信息",
    dataIndex: "feeEndTime",
    render(item, rows){
      return item?`${rows.feeStartTime?rows.feeStartTime.substring(0,10):""}到${item.substring(0,10)}`:"无"
    }
  },
  {
    title: "金额",
    dataIndex: "orderTrueFee",
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
    width: 150,
  },
  {
    title: "打印信息",
    dataIndex: "printCount",
    width: 200,
    render(item, rows){
      return (
        item!=0?
        <div>
          {rows.printUserName?<Tag>{rows.printUserName}</Tag>:null}
          <Tag>打印次数:{item}</Tag>
          {rows.printTime?<Tag>时间:{rows.printTime}</Tag>:null}
        </div>:<Tag>暂无打印</Tag>
      )
    }
  },
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
    title: "类型",
    dataIndex: "houseTypeStr",
    // render(item){
    //   switch(parseInt(item)){
    //     case 0:
    //       return "电梯和楼梯房"
    //     case 1:
    //       return "电梯房"
    //     case 2:
    //       return "楼梯房"
    //   }
    // }
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
      return `${item}至${rows.floorEnd}层`
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
    dataIndex: "partnerName",
  },
  {
    title: "手机号",
    dataIndex: "partnerPhone"
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(e,rows){
      switch(parseInt(e)){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>非住宅</Tag>
        case 3:
          return <Tag>合作商</Tag>
      }
    }
  },
  {
    title: "关联信息",
    dataIndex: "partnerCode"
  },
  {
    title: "订单标题",
    dataIndex: "orderTitle"
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
    width: 160,
  },
  {
    title: "打印信息",
    dataIndex: "printCount",
    width: 200,
    render(item, rows){
      return (
        item!=0?
        <div>
          {rows.printUserName?<Tag>{rows.printUserName}</Tag>:null}
          <Tag>打印次数:{item}</Tag>
          {rows.printTime?<Tag>打印时间:{rows.printTime}</Tag>:null}
        </div>:<Tag>暂无打印</Tag>
      )
    }
  },
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
    dataIndex: "partnerName",
  },
  {
    title: "手机号",
    dataIndex: "partnerPhone"
  },
  {
    title: "类型",
    dataIndex: "orderType",
    render(e,rows){
      switch(parseInt(e)){
        case 0:
          return <Tag>住宅</Tag>
        case 1:
          return <Tag>非住宅</Tag>
        case 3:
          return <Tag>合作商</Tag>
      }
    }
  },
  {
    title: "关联信息",
    dataIndex: "partnerCode"
  },
  {
    title: "订单标题",
    dataIndex: "orderTitle"
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
    width: 160
  },
  {
    title: "支出金额",
    dataIndex: "orderTrueFee"
  }
]