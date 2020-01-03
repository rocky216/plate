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