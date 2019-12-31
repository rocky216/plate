export const staffColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
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
    dataIndex: "key"
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
    dataIndex: "key"
  },
  {
    title: "联系电话",
    dataIndex: "key"
  },
  {
    title: "所属部门",
    dataIndex: "key"
  },
  {
    title: "成本中心",
    dataIndex: "key"
  },
  {
    title: "入职日期",
    dataIndex: "key"
  },
  {
    title: "状态",
    dataIndex: "key"
  },
  {
    title: "人员类别",
    dataIndex: "key"
  },
]