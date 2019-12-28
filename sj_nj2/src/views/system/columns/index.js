import React from "react"
import {Checkbox, Radio, InputNumber} from "antd"

export const addAuthColumns = function(_this){
  return [
    {
      title: "角色权限",
      dataIndex: "showName",
      key: "showName",
      width: 240,
      render(item, rows){
        return <Checkbox checked={rows.select?true:false} onChange={_this.handlenChange.bind(_this, rows)} >{item}</Checkbox >
      }
    },
    {
      title: "功能权限",
      dataIndex: "levelthree",
      key: "levelthree",
      render(item, rows, obj){
        return !item?"":(
          <div>
            {item.map(elem=>(
              <Checkbox  key={elem.id} checked={elem.select?true:false}  onChange={_this.handlenChangeChild.bind(_this, elem)} >{elem.showName}</Checkbox >
            ))}
          </div>
        )
      }
    },
    {
      title: "数据权限",
      width: 200,
      render(item){
        return item.partPower=="1"?(
          <Radio.Group value={item.dataPower} onChange={_this.handlenDataPower.bind(_this, item)}>
            <Radio value="1">本车间/部门</Radio>
            <Radio value="2">全部</Radio>
          </Radio.Group>
        ):null
      }
    },
  ]
}

export const roleColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "角色名称",
    dataIndex: "roleName"
  },
  {
    title: "角色权限",
    dataIndex: "children"
  },
  {
    title: "角色使用人数",
    dataIndex: "roleEmployeeCount"
  },
  {
    title: "更新人",
    dataIndex: "buildUserName"
  },
  {
    title: "更新时间",
    dataIndex: "buildTime"
  },
]

export const dictionColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "类别名称",
    dataIndex: "dictTypeName"
  },
  {
    title: "类别代码",
    dataIndex: "dictTypeKey"
  },
  {
    title: "属性数量",
    dataIndex: "dictDataCount"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const typekeyColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "字典名称",
    dataIndex: "dictName"
  },
  {
    title: "字典类型",
    dataIndex: "dictTypeName"
  },
  {
    title: "数据编码",
    dataIndex: "dictKey"
  },
  {
    title: "分组",
    dataIndex: "dictGroup"
  },
  {
    title: "更新人",
    dataIndex: "updateUserName"
  },
  {
    title: "更新时间",
    dataIndex: "updateTime"
  },
]

export const gradeColumns = function(_this){
  return [
    {
      title: "序号",
      dataIndex: "key"
    },
    {
      title: "岗级",
      dataIndex: "dictName"
    },
    {
      title: "编制人数",
      dataIndex: "postCount",
      render(item, rows){
        return <InputNumber min={0} defaultValue={item} onChange={_this.handlenCount.bind(_this, rows)} style={{width: 120}} />
      }
    },
    {
      title: "下级节点汇总",
      dataIndex: "nextPostCountSum"
    },
  ]
}
