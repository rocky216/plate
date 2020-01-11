import React from "react"
import {Radio, InputNumber} from "antd"
import {leaveType} from "../absence/data"

export const staffColumns = [
  
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "工号",
    dataIndex: "jobNumber"
  },
  {
    title: "账号",
    dataIndex: "account"
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(item){  //0女 1男
      return item=="0"?"女":"男"
    }
  },
  {
    title: "岗级",
    dataIndex: "level"
  },
  {
    title: "组织机构",
    dataIndex: "allDeptNameStr"
  },
  {
    title: "联系电话",
    dataIndex: "phone"
  },
  {
    title: "所属部门",
    dataIndex: "bDeptName"
  },
  {
    title: "成本中心",
    dataIndex: "intoCenterName"
  },
  {
    title: "入职日期",
    dataIndex: "entryTime",
    render(item){
      return item?item.substring(0,11):""
    }
  },
  {
    title: "状态",
    dataIndex: "activity",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "待报到"
        case 1:
          return "试用期"
        case 2:
          return "在职"
        case 3:
          return "主动离职"
        case 4:
          return "被动离职"
      }
    }
  },
  {
    title: "人员类别",
    dataIndex: "personTypeName"
  },
]


export const quitStaffColumns = [
  
  {
    title: "离职人",
    dataIndex: "name"
  },
  {
    title: "工号",
    dataIndex: "jobNumber"
  },
  {
    title: "账号",
    dataIndex: "account"
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(item){  //0女 1男
      return item=="0"?"女":"男"
    }
  },
  {
    title: "岗级",
    dataIndex: "levelName"
  },
  {
    title: "组织机构",
    dataIndex: "organName"
  },
  {
    title: "联系电话",
    dataIndex: "phone"
  },
  {
    title: "成本中心",
    dataIndex: "intoCenterName"
  },
  {
    title: "人员类别",
    dataIndex: "personTypeName"
  },
  {
    title: "入职日期",
    dataIndex: "entryTime",
    render(item){
      return item?item.substring(0,11):""
    }
  },
  {
    title: "状态",
    dataIndex: "flowStatus",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "申请中"
        case 1:
          return "审批中"
        case 2:
          return "已批准"
        case 3:
          return "不批准"
      }
    }
  },
  {
    title: "申请人",
    dataIndex: "applyName"
  },
  {
    title: "申请日期",
    dataIndex: "applyTime",
    render(item){
      return item?item.substring(0,11):""
    }
  },
  {
    title: "离职原因",
    dataIndex: "quitReason"
  },
  {
    title: "离职日期",
    dataIndex: "quitTime",
    render(item){
      return item?item.substring(0,11):""
    }
  },
]

export const teachColumns = [
  {
    title: "姓名",
    dataIndex: "name"
  }
]

export const staffRecordColumns = [
  {
    title: "审批人",
    dataIndex: "approveName"
  },
  {
    title: "审批节点",
    dataIndex: "nodeTitle"
  },
  {
    title: "审批结果",
    dataIndex: "approveResult",
    render(item){
      return item=="1"?"批准":"不批准"
    }
  },
  {
    title: "意见",
    dataIndex: "approveOpinion"
  },
  {
    title: "审批时间",
    dataIndex: "updateTime"
  },
]

export const scheduColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "车间/部门",
    dataIndex: "subDeptName"
  },
  {
    title: "排产日期",
    dataIndex: "planTime"
  },
  {
    title: "班次",
    dataIndex: "productionType",
    render(item){
      return item=="0"?"白班":"夜班"
    }
  },
  {
    title: "计划排产时间",
    dataIndex: "productionEndTime",
    render(item, rows){
      return `${rows.productionStartTime}-${item}`
    }
  },
  {
    title: "中饭时间",
    dataIndex: "cutOneEndTime",
    render(item, rows){
      return `${rows.cutOneStartTime}-${item}`
    }
  },
  {
    title: "晚饭时间",
    dataIndex: "cutTwoEndTime",
    render(item, rows){
      return `${rows.cutTwoStartTime}-${item}`
    }
  },
  {
    title: "其他扣除时间",
    dataIndex: "cutThreeEndTime",
    render(item, rows){
      return `${rows.cutThreeStartTime}-${item}`
    }
  },
]

export const postsColumns = [
  {
    title: "被调岗人员",
    dataIndex: "name"
  },
  {
    title: "工号",
    dataIndex: "jobNumber"
  },
  {
    title: "性别",
    dataIndex: "sex"
  },
  {
    title: "岗级",
    dataIndex: "levelName"
  },
  {
    title: "目前所在组织机构",
    dataIndex: "oldOrganName"
  },
  {
    title: "联系电话",
    dataIndex: "phone"
  },
  {
    title: "成本中心",
    dataIndex: "intoCenterName"
  },
  {
    title: "人员类别",
    dataIndex: "personTypeName"
  },
  {
    title: "状态",
    dataIndex: "flowStatus",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "申请中"
        case 1:
          return "审批中"
        case 2:
          return "审批中"
        case 3:
          return "已批准"
        case 4:
          return "不批准"
      }
    }
  },
  {
    title: "申请人",
    dataIndex: "applyName"
  },
  {
    title: "申请日期",
    dataIndex: "applyTime",
    render(item){
      return item?item.substring(0,11):""
    }
  },
  {
    title: "调岗至组织机构",
    dataIndex: "objectiveAllDeptNameStr"
  },
  {
    title: "调岗说明",
    dataIndex: "transferPositionReason"
  },
  {
    title: "调岗日期",
    dataIndex: "transferPositionTime",
    render(item){
      return item?item.substring(0,11):""
    }
  },
]

export const absenceColumns = [
  {
    title: "缺勤单号",
    dataIndex: "absenceNo"
  },
  {
    title: "缺勤类型",
    dataIndex: "absenceType",
    render(item){
      switch(parseInt(item)){
        case 1:
          return "请假"
        case 2:
          return "旷工"
        case 3:
          return "迟到"
      }
    }
  },
  {
    title: "车间",
    dataIndex: "deptName"
  },
  {
    title: "标题",
    dataIndex: "absenceTitle"
  },
  {
    title: "创建人",
    dataIndex: "buildUserName"
  },
  {
    title: "创建时间",
    dataIndex: "buildTime"
  },
  {
    title: "审批流程",
    dataIndex: "flowId",
    render(item){
      return "查看"
    }
  },
  {
    title: "状态",
    render(item){
      if(item.status=="0"){
        if(item.flowStatus=="0" || item.flowStatus=="1"){
          return "审批中"
        }else if(item.flowStatus=="2"){
          return "审批完成"
        }else if(item.flowStatus=="3"){
          return "审批拒绝"
        }
      }else if(item.status=="1"){
        return "作废"
      }else if(item.status=="2"){
        return "草稿"
      }else{
        return ""
      }
    }
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const addabsenceColumns = [
  {
    title: "缺勤人",
    dataIndex:"name"
  },
  {
    title: "组织结构",
    dataIndex: "allDeptNameStr",
  },
  {
    title: "请假类型",
    dataIndex: "leaveType",
    render(item, rows){
      if(item!="0"){
        let obj = _.filter(leaveType,o=>o.value==item)[0]
        return obj.title
      }else{
        return "无"
      }
    }
  },
  {
    title: "缺勤日期",
    dataIndex: "absenceTime"
  },
  {
    title: "开始时间",
    dataIndex: "absenceStartTime"
  },
  {
    title: "结束时间",
    dataIndex: "absenceEndTime"
  },
  {
    title: "缺勤时长(小时)",
    dataIndex: "absenceTimeLength",
    render(item){
      return (item/60).toFixed(2)
    }
  },
  {
    title: "缺勤事由",
    dataIndex: "absenceCause"
  },
]

export const addAttendColumns = function(_this){
  return [
    {
      title: "序号",
      dataIndex: "key"
    },
    {
      title: "组织机构",
      dataIndex: "allDeptNameStr"
    },
    {
      title: "岗级",
      dataIndex: "level"
    },
    {
      title: "员工编号",
      dataIndex: "jobNumber"
    },
    {
      title: "姓名",
      dataIndex: "employeeName"
    },
    {
      title: "班次",
      render(item, rows, index){
        return (
          <Radio.Group value={item.shift?item.shift:""} onChange={_this.shiftChange.bind(_this, index)}>
            <Radio value="0">白班</Radio>
            <Radio value="1">夜班</Radio>
          </Radio.Group>
        )
      }
    },
    {
      title: "计划性出勤",
      render(item, rows, index){
        let value = item.shift=="0"?item.bbTrueHour:item.shift=="1"?item.wbTrueHour:""
        let max = item.shift=="0"?item.bbHour:item.shift=="1"?item.wbHour:"0"

        return <InputNumber min={0} max={max} value={value} onChange={_this.planChange.bind(_this,index)} />
      }
    },
    {
      title: "非计划性出勤",
      render(item, rows, index){
        return <InputNumber min={0} onChange={_this.nPlanChange.bind(_this,index)} />
      }
    },
    {
      title: "申请状态",
      render(item){
        return ""
      }
    },
    {
      title: "审批人",
      render(item){
        return ""
      }
    },
    {
      title: "请假类型",
      render(item){
        return ""
      }
    },
    {
      title: "请假小时数",
      render(item){
        return ""
      }
    },
    {
      title: "申请状态",
      render(item){
        return ""
      }
    },
    {
      title: "审批人",
      render(item){
        return ""
      }
    },
    {
      title: "操作",
      render(item){
        return ""
      }
    },
  ]
}