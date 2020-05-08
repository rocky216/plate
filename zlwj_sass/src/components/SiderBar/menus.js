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
        title: "住宅物业费订单",
        link: '/workcenter/propertyfee',
        key: 201
      },
      {
        title: "商铺物业费订单",
        link: '/workcenter/shopfee',
        key: 202
      },
      {
        title: "其他缴费订单",
        link: '/workcenter/otherfee',
        key: 203
      },
      {
        title: "其他支出订单",
        link: '/workcenter/expend',
        key: 204
      },
      {
        title: "车辆管理",
        link: '/workcenter/car',
        key: 205
      },
      {
        title: "一卡通管理",
        link: '/workcenter/solution',
        key: 206
      },
      {
        title: "日志管理",
        link: '/workcenter/record',
        key: 207
      },
      {
        title: "报修管理",
        link: '/workcenter/repair',
        key: 208
      },
    ]
  },
  // {
  //   title: "流程中心",
  //   key: 3,
  //   icon: "icon iconfont icon-liuchengzhongxin",
  //   children: [
  //     {
  //       title: "我的流程",
  //       link: "/",
  //       key: 301
  //     }
  //   ]
  // },
  {
    title: "管理中心",
    key: 4,
    icon: "icon iconfont icon-ranqibaoxiuguanli",
    children: [
      {
        title: "全部物业费订单",
        link: "/manage/allorder",
        key: 402
      },
      {
        title: "全部其他缴费订单",
        link: "/manage/otherorder",
        key: 403
      }, 
      {
        title: "全部支出订单",
        link: "/manage/allexpend",
        key: 404
      }, 
      {
        title: "合作商",
        link: "/manage/operative",
        key: 401
      },
    ]
  },
  {
    title: "议事堂",
    key: 5,
    icon: "icon iconfont icon-yishiting",
    children: [
      {
        title: "投票主题列表",
        link: "/other/discussion",
        key: 501
      }
    ]
  },
  {
    title: "公司动态",
    key: 6,
    icon: "icon iconfont icon-gongsidongtai",
    children: [
      {
        title: "公告",
        link: "/other/notice",
        key: 601
      },
      {
        title: "政务公开",
        link: "/other/govern",
        key: 602
      }
    ]
  },
  {
    title: "社信通",
    key: 11,
    icon: "icon iconfont icon-tuisong-",
    children: [
      {
        title: "短信发送",
        link: "/other/message",
        key: 1101
      },
    ]
  },
  {
    title: "财务管理",
    key: 10,
    icon: "icon iconfont icon-caiwu",
    children: [
      {
        title: "资金账户",
        link: "/finance/account",
        key: 1001
      },
      {
        title: "物业费收费模板",
        link: "/finance/propertytem",
        key: 1002
      },
    ]
  },
  {
    title: "项目数据管理",
    key: 7,
    icon: "icon iconfont icon-kukaxiangmushujuchuli",
    children: [
      {
        title: "项目管理",
        link: "/project/item",
        key: 701
      },
      {
        title: "项目信息管理",
        link: "/project/prodata",
        key: 702
      },
      {
        title: "业主管理",
        link: "/project/owner",
        key: 703
      },
      {
        title: "非住宅房屋",
        link: "/project/nothouse",
        key: 704
      },
      {
        title: "停车场管理",
        link: "/project/park",
        key: 705
      },
    ]
  },
  {
    title: "基础数据管理",
    key: 8,
    icon: "icon iconfont icon-icon_jichushujuguanl",
    children: [
      {
        title: "部门数据列表",
        link: "/base/department",
        key: 801
      },
      {
        title: "岗位管理",
        link: "/base/station",
        key: 802
      },
      {
        title: "角色管理",
        link: "/base/role",
        key: 803
      },
      {
        title: "员工管理",
        link: "/base/staff",
        key: 804
      },
      {
        title: "数据字典",
        link: "/base/library",
        key: 805
      },
    ]
  },
  {
    title: "管理员设置",
    key: 9,
    icon: "icon iconfont icon-guanliyuan",
    children: [
      {
        title: "权限结构",
        link: "/system/treemenu",
        key: 901
      },
      {
        title: "数据字典",
        link: "/system/library",
        key: 902
      },
      {
        title: "公司列表",
        link: "/system/company",
        key: 903
      },
      {
        title: "短信平台",
        link: "/system/message",
        key: 904
      },
      {
        title: "商户号管理",
        link: "/system/merchant",
        key: 905
      },
      {
        title: "设备管理",
        link: "/system/device/pile",
        key: 906
      },
      {
        title: "日志管理",
        link: "/system/record",
        key: 907
      },
      {
        title: "资源管理",
        link: "/system/resources",
        key: 908
      },
      {
        title: "apk管理",
        link: "/system/apk",
        key: 909
      },
    ]
  }
]