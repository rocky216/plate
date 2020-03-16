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
    title: "字典管理",
    key: 3,
    icon: "icon iconfont icon-gongzuozhongxin",
    children: [
      {
        title: "设备字典管理",
        link: '/dict/device',
        key: 301
      }
    ]
  },
]