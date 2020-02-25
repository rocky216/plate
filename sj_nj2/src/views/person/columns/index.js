import React from "react"
import {Radio, InputNumber, Button} from "antd"
import {leaveType} from "../absence/data"


export const personstatisColumns = [
  {
    title: "所属机构",
    dataIndex: "deptName"
  },
  {
    title: "员工编号",
    dataIndex: "employyeNo"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "计划上班时长",
    dataIndex: "jhH"
  },
  {
    title: "计划加班时长",
    dataIndex: "planJbH"
  },
  {
    title: "非计划加班时长",
    dataIndex: "notPlanJbH"
  },
  {
    title: "请假时长",
    dataIndex: "leaveH"
  },
  {
    title: "请假率",
    dataIndex: "leaveRate"
  },
  {
    title: "迟到次数",
    dataIndex: "lateCount"
  },
  {
    title: "迟到率",
    dataIndex: "lateRate"
  },
  {
    title: "旷工次数",
    dataIndex: "absenteeism"
  },
  {
    title: "旷工率",
    dataIndex: "absenteeismRate"
  },
  {
    title: "岗位类别",
    dataIndex: "personTypeName"
  },
  {
    title: "成本中心",
    dataIndex: "intoCenterName"
  },
]

export const overtrendanalyColumns = [
  {
    title: "日期",
    dataIndex: "jbTime"
  },
  {
    title: "出勤人次",
    dataIndex: "cqrcCount"
  },
  {
    title: "计划上班时长(H)",
    dataIndex: "planH"
  },
  {
    title: "计划加班时长(H)",
    dataIndex: "planJbH"
  },
  {
    title: "实际上班时长(H)",
    dataIndex: "trueH"
  },
  {
    title: "非计划加班时长(H)",
    dataIndex: "notPlanJbH"
  },
  {
    title: "总加班时长",
    dataIndex: "sumJbH"
  },
]

export const attendAnanlyColumns = [
  {
    title: "日期",
    dataIndex: "cqTime"
  },
  {
    title: "出勤人次",
    dataIndex: "cqrcCount"
  },
  {
    title: "请假人次",
    dataIndex: "qjCount",
  },
  {
    title: "请假率",
    render(item){
      return item.cqCount && parseInt(item.cqCount)?(item.qjCount/item.cqCount*100).toFixed(2):0
    }
  },
  {
    title: "旷工人次",
    dataIndex: "kgCount",
  },
  {
    title: "旷工率",
    render(item){
      return item.cqCount && parseInt(item.cqCount)?(item.kgCount/item.cqCount*100).toFixed(2):0
    }
  },
  {
    title: "迟到人次",
    dataIndex: "cdCount",
  },
  {
    title: "迟到率",
    render(item){
      return item.cqCount && parseInt(item.cqCount)?(item.cdCount/item.cqCount*100).toFixed(2):0
    }
  },
]

export const analyColumns = [
  {
    title: "排产日期",
    dataIndex: "planTime"
  },
  {
    title: "排产工作时长",
    dataIndex: "planH",
    render(item){
      return item?parseFloat(item).toFixed(2):0
    }
  },
  {
    title: "计划性加班时长",
    dataIndex: "planJbH",
    render(item){
      return item?parseFloat(item).toFixed(2):0
    }
  },
]

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

export const absenceColumns = function(_this){
  return [
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
      render(item, rows){
        return <Button size="small" type="link" onClick={_this.handlenLookFlow.bind(_this, rows)}>查看</Button>
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
}

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
      if(item && item!="0"){
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
          <Radio.Group value={item.attenType?item.attenType:""} onChange={_this.shiftChange.bind(_this, index)}>
            <Radio value="0">白班</Radio>
            <Radio value="1">夜班</Radio>
          </Radio.Group>
        )
      }
    },
    {
      title: "计划性出勤",
      render(item, rows, index){
        let value = item.attenType=="0"?item.bbTrueHour:item.attenType=="1"?item.wbTrueHour:""
        let max = item.attenType=="0"?item.bbHour:item.attenType=="1"?item.wbHour:0

        return <InputNumber  min={0} max={max-_this.countHour(rows.leaveList)} value={value} 
        onChange={_this.planChange.bind(_this,index)} />
      }
    },
    {
      title: "非计划性出勤",
      render(item, rows, index){
        return <InputNumber min={0} disabled={rows.overtimeStatus=="批准"||rows.overtimeStatus=="不批准"?true: false}
         value={item.overtimeHour} onChange={_this.nPlanChange.bind(_this,index)} />
      }
    },
    {
      title: "申请状态",
      dataIndex: "overtimeStatus"
    },
    {
      title: "审批人",
      dataIndex: "overtimeCheckName"
    },
    {
      title: "请假类型",
      dataIndex: "leaveList",
      render(item){
        return (
          <div>
            {item && item.length?item.map((item, index)=>(
              <div key={index}>{item.leaveType}</div>
            )):null}
          </div>
        )
      }
    },
    {
      title: "请假小时数",
      render(item, rows){
        console.log(item, "asds")
        return (
          <div>
            {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
              <div key={index}>{item.leaveHour}</div>
            )):null}
          </div>
        )
      }
    },
    {
      title: "申请状态",
      render(item, rows){
        return (
          <div>
            {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
              <div key={index}>{item.leaveStatus}</div>
            )):null}
          </div>
        )
      }
    },
    {
      title: "审批人",
      render(item, rows){
        return (
          <div>
            {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
              <div key={index}>{item.leaveCheckName}</div>
            )):null}
          </div>
        )
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


export const attendColumns = [
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
    dataIndex: "productionType",
    render(item){
      return item=="0"?"白班":"晚班"
    }
  },
  {
    title: "计划性出勤",
    dataIndex: "trueHour",
    render(item){
      return item>=0?item:0
    }

  },
  {
    title: "非计划性出勤",
    dataIndex: "overtimeHour"
  },
  {
    title: "申请状态",
    dataIndex: "overtimeStatus"
  },
  {
    title: "审批人",
    dataIndex: "overtimeCheckName"
  },
  {
    title: "请假类型",
    render(item, rows){
      return (
        <div>
          {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
            <div key={index}>{item.leaveType}</div>
          )):null}
        </div>
      )
    }
  },
  {
    title: "请假小时数",
    render(item, rows){
      return (
        <div>
          {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
            <div key={index}>{item.leaveHour}</div>
          )):null}
        </div>
      )
    }
  },
  {
    title: "申请状态",
    render(item, rows){
      return (
        <div>
          {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
            <div key={index}>{item.leaveStatus}</div>
          )):null}
        </div>
      )
    }
  },
  {
    title: "审批人",
    render(item, rows){
      return (
        <div>
          {rows.leaveList && rows.leaveList.length?rows.leaveList.map((item, index)=>(
            <div key={index}>{item.leaveCheckName}</div>
          )):null}
        </div>
      )
    }
  },
]

export const overworkColumns = function(_this){
  return [
    {
      title: "申请单号",
      dataIndex: "sysEmployeeWork",
      render(item){
        return item.workNo
      }
    },
    {
      title: "加班人",
      dataIndex: "employeeName"
    },
    {
      title: "组织结构",
      dataIndex: "mDeptName"
    },
    {
      title: "加班日期",
      dataIndex: "workTime",
      render(item){
        return item?item.substring(0,10):""
      }
    },
    {
      title: "加班时长(H)",
      dataIndex: "workTimeLength",
      render(item){
        return item?(item/60).toFixed(2):""
      }
    },
    {
      title: "创建人",
      dataIndex: "buildUserName",
    },
    {
      title: "创建时间",
      dataIndex: "buildTime",
      render(item){
        return item?item.substring(0,10):""
      }
    },
    {
      title: "审批流程",
      render(item) {
        return (
           <Button size="small" type="link" onClick={_this.handlenOverFlow.bind(_this, item.sysEmployeeWork)} >查看</Button>
        );
      }
    },
    {
      title: "状态",
      render(item) {
        switch(parseInt(item.sysEmployeeWork.flowStatus)){
          case 0:
            return "审批中"
          case 1:
            return "审批中"
          case 2:
            return "审批通过"
          case 3:
            return "审批拒绝"
        }
      }
    },
    {
      title: "审批人",
      dataIndex: "approvalName"
    },
    {
      title: "审批日期",
      dataIndex: "approvalTime"
    },
  ]
}


export const overworkApprovalColmuns = [
  {
    title: "加班人",
    dataIndex: "employeeName",
  },
  {
    title: "组织结构",
    dataIndex: "mDeptName",
  },
  {
    title: "加班日期",
    dataIndex: "workTime",
  },
  {
    title: "加班时长",
    dataIndex: "workTimeLength",
    render(item){
      return item?(item/60).toFixed(2):""
    }
  },
]

export const overworlHistoryColmuns = [
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
      return item=="2"?"通过":"拒绝"
    }
  },
  {
    title: "审批意见",
    dataIndex: "approveOpinion"
  },
  {
    title: "审批时间",
    dataIndex: "approveTime"
  },
]

export const monthAttend = [
  {
    title: "序号",
    dataIndex: "key",
    width: 50,
    fixed: 'left',
  },
  {
    title: "组织机构",
    dataIndex: "deptName",
    width: 260,
    fixed: 'left',
  },
  {
    title: "工号",
    dataIndex: "jobNumber",
    width: 100,
    fixed: 'left',
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: 100,
    fixed: 'left',
  },
  // {
  //   title: "01",
  //   children: [
  //     {
  //       title: "011",
  //       dataIndex: "a01",
  //       key: "attenTimeD1",
  //       render(item){
  //         console.log(item, "arguments")
  //         return item.attenTimeD
  //       }
  //     },
  //     {
  //       title: "011",
  //       dataIndex: "a01",
  //       key: "attenTimeD2",
  //       render(item){
  //         console.log(item, "arguments")
  //         return item.attenTimeD
  //       }
  //     },
  //     {
  //       title: "011",
  //       dataIndex: "a01",
  //       key: "attenTimeD3",
  //       render(item){
  //         console.log(item, "arguments")
  //         return item.attenTimeD
  //       }
  //     },
  //   ]
  // },
]

