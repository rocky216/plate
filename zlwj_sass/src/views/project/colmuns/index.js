import React from "react"
import {Tag} from "antd"

export const relationColumns = [
  {
    title: "状态",
    dataIndex: "isPast",
    render:item=>item=="0"?"续存中":"过期"
  },
  {
    title: "项目",
    dataIndex: "heNameStr"
  },
  {
    title: "资产类型",
    dataIndex: "linkTypeName",
    
  },
  {
    title: "资产编号",
    dataIndex: "linkCode"
  },
  {
    title: "关联类型",
    dataIndex: "ownerType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "业主"
        case 1:
          return "家庭成员"
        case 2:
          return "租客"
      }
    }
  },
  {
    title: "关联时间",
    dataIndex: "startTime",
    render(item, rows){
      return `${item}-${rows.pastTime?rows.pastTime:"暂无"}`
    }
  },
]

export const nothouseColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "房屋编号",
    dataIndex: "shopsCode"
  },
  {
    title: "房屋名称",
    dataIndex: "shopsName"
  },
  {
    title: "关联信息",
    dataIndex: "ownersId",
    render(item, rows){
      return item?rows.ownerName+rows.ownerPhone:"暂无"
    }
  },
  {
    title: "楼层",
    dataIndex: "floorNum"
  },
  {
    title: "是否有电梯",
    dataIndex: "elevatorHouse",
    render(item){
      return item==1?"电梯房":"楼梯房"
    }
  },
  {
    title: "建筑面积",
    dataIndex: "houseArea"
  },
  {
    title: "交房时间",
    dataIndex: "deliversTime",
    render(item){
      return item?item.substring(0,10):""
    }
  },
  {
    title: "已缴区间",
    dataIndex: "heShopsInfo",
    render(item){
      return `${item.payFristTime?item.payFristTime.substring(0,10):""}到${item.payLastTime?item.payLastTime.substring(0,10):""}`
    }
  },
]

export const itemConcactColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "头像",
    dataIndex: "headUrl",
    render(item){
      return item?<img src={item} style={{width: 60, height: 60, borderRadius: "50%"}} />:""
    }
  },
  {
    title: "联系人",
    dataIndex: "name"
  },
  {
    title: "电话",
    dataIndex: "info"
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return item=="0"?<Tag color="green">启用</Tag>:<Tag color="red">禁用</Tag>
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const importPlateColumns = [
  {
    title: "行数",
    dataIndex: "line"
  },
  {
    title: "业主",
    dataIndex: "ownersName"
  },
  {
    title: "电话",
    dataIndex: "ownersPhone"
  },
  {
    title: "房间",
    dataIndex: "parkingSpaceCode"
  },
  {
    title: "异常信息",
    dataIndex: "errorRemark"
  },
]

export const parkPlateLotColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "车位名称",
    dataIndex: "parkingSpaceName"
  },
  {
    title: "车位编号",
    dataIndex: "parkingSpaceCode"
  },
  {
    title: "车位类型",
    dataIndex: "typeName"
  },
  {
    title: "交付时间",
    dataIndex: "deliversTime",
    render(item){
      return item?item.substring(0,10):""
    }
  },
  {
    title: "缴费开始时间",
    dataIndex: "payFristTime",
    render(item){
      return item?item.substring(0,10):""
    }
  },
  {
    title: "缴费结束时间",
    dataIndex: "payLastTime",
    render(item){
      return item?item.substring(0,10):""
    }
  },
  {
    title: "车位建筑面积",
    dataIndex: "buildingArea"
  },
  {
    title: "业主信息",
    dataIndex: "ownerName"
  },
  {
    title: "车位车牌",
    dataIndex: "carParkingList",
    render(item){
      console.log(item)
      return item && item.length?item.map(elem=>(
        <Tag key={elem.id}>{elem.licensePlate}</Tag>
      )):""
    }
  },
]

export const parkColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "停车场名称",
    dataIndex: "carparkName",
  },
  {
    title: "停车场编号",
    dataIndex: "carparkCode",
  },
  {
    title: "关联项目",
    dataIndex: "heNameStr",
  },
  {
    title: "停车场类型",
    dataIndex: "carparkType",
    render(item){
      switch(parseInt(item)){
        case 1:
          return "地下停车场"
        case 2:
          return "地面停车场"
        case 3:
          return "高层停车场"
        case 4:
          return "其他停车场"
      }
    }
  },
  {
    title: "停车场层数",
    dataIndex: "carparkLevel",
  },
  {
    title: "停车场面积",
    dataIndex: "buildingArea",
  },
  {
    title: "停车场建成时间",
    dataIndex: "createTime",
    render(item){
      return item?item.substring(0,11):item
    }
  },
  {
    title: "停车场交付时间",
    dataIndex: "deliversTime",
    render(item){
      return item?item.substring(0,11):item
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return item=="0"?<Tag color="blue">正常</Tag>:<Tag color="red">停用</Tag>
    }
  },
]

export const itemColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "项目名称",
    dataIndex: "name",
  },
  {
    title: "小区编码",
    dataIndex: "code",
    render(item){
      return <Tag color="volcano">{item}</Tag>
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    render(item){
      return <Tag color={item=="0"?"#108ee9":"#f50"}>{item=="0"?"启用":"禁用"}</Tag>
    }
  }
]

export const buildColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "楼宇名称",
    dataIndex: "buildingName",
  },
  {
    title: "系统编号/展示编号",
    dataIndex: "showCode",
    render(item, rows){
      return rows.code+'/'+item
    }
  },
  {
    title: "所属项目",
    dataIndex: "heNameStr"
  },
  {
    title: "是否电梯房",
    dataIndex: "elevatorBuilding",
    render(item){
      return <span>{item=="0"?"有电梯":"无电梯"}</span>
    }
  },
]

export const errInfoColmun = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "行数",
    dataIndex: "id"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "手机号",
    dataIndex: "phone"
  },
  {
    title: "错误反馈信息",
    dataIndex: "remark",
    width: 500
  },
]

function getRooms(obj){
  let newArr = []
  _.each(obj, (item, key)=>{
    newArr.push({
      name: item,
      room: key
    })
  })
  return newArr
}

export const ownerColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "手机号",
    dataIndex: "phone",
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(item){
      return item=="1"?"男":item=="2"?"女":"未知"
    }
  },
  {
    title: "关联信息",
    dataIndex: "detailsList",
    width: 430, 
    render(item){
      return (
        <div>
          {item.map((elem, i)=><Tag key={i} color="red">{`${elem.linkType}:${elem.heName}:${elem.linkCode}:${elem.type}`}</Tag>)}
        </div>
      )
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
 
]

export const shopColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "商铺名称",
    dataIndex: "shopsName"
  },
  {
    title: "商铺编号",
    dataIndex: "shopsCode"
  },
  {
    title: "项目",
    dataIndex: "heNameStr"
  },
  {
    title: "建筑面积（平方）",
    dataIndex: "houseArea",
    render(item){
      return <span>{item}<span className="mgl5">m<sup>2</sup></span></span>
    }
  },
  {
    title: "楼层数（层）",
    dataIndex: "floorNum"
  },
  {
    title: "是否有电梯",
    dataIndex: "elevatorHouse",
    render(item){
      return <span>{item=="0"?"无电梯":"有电梯"}</span>
    }
  },
]