export default [
  {
    title: "首页",
    link: "/",
    key: 1,
    icon: "icon iconfont icon-shouye1"
  },
  {
    title: "公司管理",
    key: 2,
    icon: "icon iconfont icon-gongzuozhongxin",
    children: [
      {
        title: "公司设备",
        link: "/company",
        key: 201
      }
    ]
  },
  {
    title: "配置管理",
    key: 3,
    icon: "icon iconfont icon-gongzuozhongxin",
    children: [
      // {
      //   title: "交换机",
      //   link: '/config/switch',
      //   key: 301
      // },
      // {
      //   title: "队列",
      //   link: '/config/align',
      //   key: 302
      // },
      {
        title: "接口管理",
        link: '/config/api',
        key: 303
      },
      {
        title: "回调参数",
        link: '/config/arguments',
        key: 304
      },
    ]
  },
  {
    title: "字典管理",
    key: 4,
    icon: "icon iconfont icon-gongzuozhongxin",
    children: [
      {
        title: "设备字典管理",
        link: '/dict/device',
        key: 401
      }
    ]
  },
  {
    title: "设备管理",
    key: 5,
    icon: "icon iconfont icon-gongzuozhongxin",
    children: [
      {
        title: "设备列表",
        link: '/device/all',
        key: 501
      }
    ]
  },
]