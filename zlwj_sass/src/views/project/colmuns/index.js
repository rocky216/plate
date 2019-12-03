import React from "react"
import {Tag} from "antd"

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
    title: "楼栋",
    dataIndex: "buildingName",
    render(item){
    return <span>{item}栋</span>
    }
  },
  {
    title: "楼栋编码",
    dataIndex: "showCode"
  },
  {
    title: "所属项目",
    dataIndex: "heNameStr"
  },
  {
    title: "是否电梯房",
    dataIndex: "elevatorBuilding",
    render(item){
      return <span>{item=="0"?"楼梯房":"电梯房"}</span>
    }
  },
  {
    title: "电梯数量(个)",
    dataIndex: "elevatorCount",
    render(item, row){
      return <span>{row.elevatorBuilding=="0"?"无":item}</span>
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
    title: "房间号",
    dataIndex: "houseShowCode",
    width: 430, 
    render(item){
      return (
        <div>
          {getRooms(item).map((elem, i)=><Tag key={i} color="red">{elem.room+':'+elem.name}</Tag>)}
        </div>
      )
    }
  },
  {
    title: "店铺号",
    dataIndex: "shopShowCode",
    width: 430, 
    render(item){
      return (
        <div>
          {getRooms(item).map((elem, i)=><Tag key={i} color="red">{elem.room+':'+elem.name}</Tag>)}
        </div>
      )
    }
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(item){
      return item=="1"?"男":item=="2"?"女":"不知"
    }
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