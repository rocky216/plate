export default [
  {
    title: "工作台",
    link: "/",
    key: 1,
    icon: "icon iconfont icon-gongzuotai"
  },
  {
    title: "人员管理",
    key: 2,
    icon: "icon iconfont icon-yuangong",
    children: [
      {
        title: "员工管理",
        link: "/person/staff",
        key: 201
      },
      {
        title: "人员离职管理",
        link: "/person/staffquit",
        key: 202
      },
      {
        title: "人员调岗管理",
        link: "/person/posts",
        key: 203
      },
      {
        title: "排产管理",
        link: "/person/schedu",
        key: 204
      },
      {
        title: "缺勤管理",
        link: "/person/absence",
        key: 205
      },
      {
        title: "考勤管理",
        link: "/person/attend",
        key: 206
      },
      {
        title: "加班申请管理",
        link: "/person/overwork",
        key: 207
      },
      {
        title: "人力资源分析",
        link: "/",
        key: 208
      },
      {
        title: "考勤分析",
        link: "/",
        key: 209
      },
    ]
  },
  {
    title: "系统管理",
    key: 3,
    icon: "icon iconfont icon-dianpu",
    children: [
      {
        title: "组织机构",
        link: "/system/organ",
        key: 301
      },
      {
        title: "权限管理",
        link: "/system/auth",
        key: 302
      },
      {
        title: "数据字典",
        link: "/system/diction",
        key: 303
      },
      {
        title: "流程设置",
        link: "/system/process",
        key: 304
      },
      // {
      //   title: "功能&菜单",
      //   link: "/",
      //   key: 305
      // },
    ]
  }
]