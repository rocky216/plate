export default [
  {
    title: "首页",
    key:1,
    icon: "icon iconfont icon-shouye",
    link: "/"
  },
  {
    title: "车位租赁",
    key: 2,
    icon: ".icon iconfont icon-tingchewei",
    children: [
      {
        title: "租赁列表",
        key: 201,
        link: "/park/lease",
      },
      {
        title: "车牌列表",
        key: 202,
        link: "/park/plate"
      },
      {
        title: "订单列表",
        key: 203,
        link: "/"
      },
      {
        title: "租赁权限",
        key: 204,
        link: "/"
      },
      {
        title: "通行记录",
        key: 205,
        link: "/"
      },
      {
        title: "租赁规则",
        key: 206,
        link: "/park/rule"
      },
      {
        title: "车牌识别配置",
        key: 207,
        link: "/park/plateconfig"
      },
    ]
  },
  {
    title: "项目管理",
    key: 3,
    icon: "icon iconfont icon-xiangmu",
    children: [
      {
        title: "项目列表",
        key: 301,
        link: "/project/list",
      },
      {
        title: "账户管理",
        key: 302,
        link: "/project/account",
      },
      {
        title: "角色管理",
        key: 303,
        link: "/project/role",
      },
      {
        title: "权限管理",
        key: 304,
        link: "/project/auth/0",
      },
    ]
  }
]