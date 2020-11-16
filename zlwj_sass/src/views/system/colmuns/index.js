import React from "react"
import {Tag, Icon} from "antd"


export const appApkColumns = [
  {
    title: "类型",
    dataIndex: "status",
    render: item=>item=="0"?<Tag color="blue">业主</Tag>:<Tag color="red">物业</Tag>
  },
  {
    title: "名称",
    dataIndex: "appName"
  },
  {
    title: "版本号",
    dataIndex: "versionNo"
  },
  {
    title: "下载地址",
    dataIndex: "appResourceUrl"
  },
  
]

export const resourcesEditColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "资源名称",
    dataIndex: "name"
  },
  {
    title: "广告描述/图片路径",
    dataIndex: "desc",
    render(item){
      return <img src={item} style={{width:80, height:80}} />
    }
  },
  {
    title: "排序",
    dataIndex: "sort"
  },
  {
    title: "资源类型",
    dataIndex: "showType",
    render(item){
      return item==0?"图片资源":"文字资源"
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return item=="0"?<Tag color="green">正常</Tag>:<Tag color="red">停用</Tag>
    }
  },
  {
    title: "资源类型id",
    dataIndex: "typeId"
  },
]

export const resourcesColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "资源类型名称",
    dataIndex: "typeName"
  },
  {
    title: "资源类型编码",
    dataIndex: "typeCode"
  },
  {
    title: "资源类型",
    dataIndex: "showType",
    render(item){
      return item==0?"图片资源":"文字资源"
    }
  },
  {
    title: "资源类型描述",
    dataIndex: "desc"
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return item=="0"?<Tag color="green">正常</Tag>:<Tag color="red">停用</Tag>
    }
  },
  {
    title: "所属资源数量",
    dataIndex: "resourceCount"
  },
]

export const controlDeviceColumns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render(item){
      return item=="1"?<Icon type="check-circle" style={{color:"green", fontSize: 20}} />
      :<Icon type="close-circle" style={{color:"red", fontSize: 20}} />
    }
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "IOT序列号",
    dataIndex: "deviceSerial"
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
    title: "关联信息",
    dataIndex: "companyNameStr",
    render(item, rows){
      return item?item+"/"+rows.heNameStr:"无"
    }
  },
  {
    title: "设备品牌",
    dataIndex: "deviceBrandName"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const plateRecordColumns = [
  {
    title: "车牌号码",
    dataIndex: "license"
  },
  {
    title: "项目",
    dataIndex: "heNameStr",
    render(item, rows) {
      return (
        <div>
          {rows.companyName}-{item}
        </div>
      );
    }
  },
  {
    title: "停车场",
    dataIndex: "parkName"
  },
  {
    title: "联系人",
    dataIndex: "linkName"
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
    title: "停车时长",
    dataIndex: "sumTime"
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
    dataIndex: "orderStatusStr",
    // render(item){
    //   switch(parseInt(item)){
    //     case 0:
    //       return <div style={{color: "rgb(135, 208, 104)", textAlign:"center"}}>
    //               <Icon type="exclamation-circle"  />
    //               <p>待充电</p>
    //             </div>
    //     case 1:
    //       return <div style={{color: "rgb(45, 183, 245)", textAlign:"center"}}>
    //               <Icon type="clock-circle"  />
    //               <p>充电中</p>
    //             </div>
              
    //     case 2:
    //       return <div style={{color: "rgb(16, 142, 233)", textAlign:"center"}}>
    //               <Icon  type="check-circle" />
    //               <p>充电完成</p>
    //             </div>
    //     case 3:
    //       return <div style={{color: "rgb(255, 85, 0)", textAlign:"center"}}>
    //               <Icon  type="close-circle" />
    //               <p>待充失败</p>
    //             </div>
    //   }
    // }
  },
  {
    title: "结束状态",
    dataIndex: "remark",
    // render(item){
    //   switch(parseInt(item)){
    //     case 1:
    //       return "正常饱和结束"
    //     case 2:
    //       return "手动停止订单"
    //     case 3:
    //       return "负载丢失"
    //     case 4:
    //       return "时间到结束"
    //     case 5:
    //       return "过载结束"
    //     case 6:
    //       return "涓流充电时掉电"
    //     case 9:
    //       return "复位重启结束充电"
    //   }
    // }
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
    title: "序列号",
    dataIndex: "deviceSerial",
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
    dataIndex: "truePayFee",
    render(item){
      return item+"元"
    }
  },
]


export const plateDeviceColumns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render(item){
      return item=="1"?<Icon type="check-circle" style={{color:"green", fontSize: 20}} />
      :<Icon type="close-circle" style={{color:"red", fontSize: 20}} />
    }
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "IOT序列号",
    dataIndex: "deviceSerial"
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
    title: "关联信息",
    dataIndex: "companyNameStr",
    render(item, rows){
      return item?item+"/"+rows.heNameStr:"无"
    }
  },
  {
    title: "设备型号",
    dataIndex: "deviceBrandName"
  },
  
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const pileDeviceColumns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render(item){
      return item=="1"?<Icon type="check-circle" style={{color:"green", fontSize: 20}} />
      :<Icon type="close-circle" style={{color:"red", fontSize: 20}} />
    }
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "IOT序列号",
    dataIndex: "deviceSerial"
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
    title: "关联信息",
    dataIndex: "companyNameStr",
    render(item, rows){
      return item?item+"/"+rows.heNameStr:"无"
    }
  },
  {
    title: "设备类型",
    dataIndex: "deviceTypeName"
  },
  {
    title: "设备品牌",
    dataIndex: "deviceBrandName"
  },
  {
    title: "端口",
    dataIndex: "portList",
    render(item){
      return item && item.length? item.map(elem=>(
      <Tag key={elem.id}>{elem.port}端口{elem.type==0?"空闲":elem.type==1?"使用":"异常"}</Tag>
      )):""
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const pileColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "配置类别",
    dataIndex: "type",
    render(item){
      switch(parseInt(item)){
        case 1:
          return "小程序"
        case 2:
          return "充电卡"
        case 3:
          return "智联万家"
      }
    }
  }, 
  {
    title: "金额",
    dataIndex: "money"
  },
  {
    title: "分钟",
    dataIndex: "minute"
  },
 
  {
    title: "是否支持退款",
    dataIndex: "isRefund",
    render(item){
      return item=="1"?"支持":"不支持"
    }
  },
]

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
export const partnerCompanyColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "公司全称",
    dataIndex: "name"
  },
  {
    title: "公司简称",
    dataIndex: "nickname"
  },
  {
    title: "公司地址",
    render(item){
      return item.province+item.city+item.area;
    }
  },
  {
    title: "联系人",
    dataIndex: "headName"
  },
  {
    title: "联系电话",
    dataIndex: "headContactNumber"
  },
  {
    title: "logo",
    dataIndex: "logoUrl",
    render(item){
      return item?<img src={item} style={{width:100}} />:""
    }
  },
  // {
  //   title: "基础配置",
  //   dataIndex: "name"
  // },
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