export default [
  {
    name: "工作台", 
    key: "1",
    path: "/"
  },
  {
    name: "用户管理",
    key: "2",
    path: "/users"
  },
  {
    name: "公司项目管理",
    key: "3",
    path: "/company"
  },
  {
    name: "系统资源管理",
    key: "4",
    path: "/company"
  },
  {
    name: "定时任务",
    key: "5",
    path: "/company",
    children: [
      {
        name: "任务配置",
        key: "5-01",
        path: "/company"
      },
      {
        name: "执行日志",
        key: "5-02",
        path: "/company"
      },
    ]
  },
  {
    name: "短信管理",
    key: "6",
    path: "/company",
    children: [
      {
        name: "短信包订单",
        key: "6-01",
        path: "/company"
      },
      {
        name: "短信包配置",
        key: "6-02",
        path: "/company"
      },
      {
        name: "短信包签名",
        key: "6-03",
        path: "/company"
      },
      {
        name: "短信末班",
        key: "6-04",
        path: "/company"
      },
    ]
  },
]