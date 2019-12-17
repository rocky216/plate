export default [
  {
    title: "首页",
    link: "/",
    key: 1,
    icon: "icon iconfont icon-shouye1"
  },
  {
    title: "工作中心",
    key: 2,
    icon: "icon iconfont icon-gongzuozhongxin",
    children: [
      {
        title: "物业费订单",
        link: "/",
        link: '/workcenter/propertyfee',
        key: 201
      }
    ]
  },
  {
    title: "流程中心",
    key: 3,
    icon: "icon iconfont icon-liuchengzhongxin",
    children: [
      {
        title: "我的流程",
        link: "/",
        key: 301
      }
    ]
  },
  {
    title: "报修管理",
    key: 4,
    icon: "icon iconfont icon-ranqibaoxiuguanli",
    children: [
      {
        title: "报修记录",
        link: "/",
        key: 401
      }
    ]
  },
  {
    title: "议事堂",
    key: 5,
    icon: "icon iconfont icon-yishiting",
    children: [
      {
        title: "投票列表",
        link: "/",
        key: 501
      }
    ]
  },
  {
    title: "政务公开",
    key: 6,
    icon: "icon iconfont icon-zhengwugongkai2",
    children: [
      {
        title: "公开列表",
        link: "/",
        key: 601
      }
    ]
  }
]