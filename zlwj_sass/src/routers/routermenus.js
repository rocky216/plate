import Home from "@/views/home"
import PropertyFee from "@/views/workcenter/propertyfee"
import TreeMenu from "@/views/system/treemenu"
import BaseDepartment from "@/views/base/department"
import Station from "@/views/base/station"
import ProjectItem from "@/views/project/item"
import RoleList from "@/views/base/role"
import EditRole from "@/views/base/role/edit"
import ProData from "@/views/project/prodata"
import Unit from "@/views/project/prodata/unit"
import StaffList from "@/views/base/staff"
import EditStaff from "@/views/base/staff/edit"
import Owner from "@/views/project/owner"
import AddOwner from "@/views/project/owner/add"
import EditOwner from "@/views/project/owner/edit"
import Shop from "@/views/project/shop"
import UserPerson from "@/views/user/person"
import FinanceAccount from "@/views/finance/account"
import AccountLog from "@/views/finance/account/log"
import Discussion from "@/views/other/discussion"
import DiscussionThemeOpt from "@/views/other/discussion/voteopt"
import AddDiscussion from "@/views/other/discussion/add"
import EditDiscussion from "@/views/other/discussion/edit"
import BaseLibrary from "@/views/base/library"
import SystemLibrary from "@/views/system/library"
import Propertytem from "@/views/finance/propertytem"
import AddPropertytem from "@/views/finance/propertytem/add"



export default  [
  {
    name: "首页",
    link: "/",
    key: "1",
    exact: true,
    Component: Home,
    children: [
      {
        name: "用户资料",
        link: "/user/person",
        Component: UserPerson
      }
    ]
  },
  {
    name: "工作中心",
    key: "2",
    children: [
      {
        name: "物业费订单",
        key: "2-01",
        link: "/workcenter/propertyfee",
        Component: PropertyFee
      }
    ]
  },
  {
    name: "流程中心",
    key: "3",
    children: [
      {
        name: "我的流程",
        key: "3-01",
        link: "/test",
        Component: Home
      }
    ]
  },
  {
    name: "报修管理",
    key: "4",
    children: [
      {
        name: "报修记录",
        link: "/test",
        Component: Home
      }
    ]
  },
  {
    name: "议事堂",
    key: "5",
    children: [
      {
        name: "投票主题列表",
        key: "5-01",
        link: "/other/discussion",
        exact: true,
        Component: Discussion,
        children: [
          {
            name: "新增议事主题",
            key: "5-01-01",
            link: "/other/discussion/add",
            Component: AddDiscussion
          },
          {
            name: "编辑议事主题",
            key: "5-01-02",
            link: "/other/discussion/:id/edit",
            Component: EditDiscussion
          },
          {
            name: "议事主题投票选项",
            key: "5-01-03",
            link: "/other/discussion/:id/voteopt",
            Component: DiscussionThemeOpt
          },
        ]
      }
    ]
  },
  {
    name: "政务公开",
    key: "6",
    children: [
      {
        name: "公开列表",
        link: "/test",
        Component: Home
      }
    ]
  },
  {
    name: "财务管理",
    key: "10",
    children: [
      {
        name: "资金账户",
        key: "10-01",
        link: "/finance/account",
        exact: true,
        Component: FinanceAccount,
        children: [
          {
            name: "资金日志",
            key: "10-01-01",
            link: "/finance/account/:id/log",
            Component: AccountLog
          }
        ]
      },
      {
        name: "物业费收费模板",
        key: "10-02",
        link: "/finance/propertytem",
        exact: true,
        Component: Propertytem,
        children: [
          {
            name: "新增物业费收费模板",
            link: "/finance/propertytem/add",
            Component: AddPropertytem
          }
        ]
      }
    ]
  },
  {
    name: "项目数据管理",
    key: "7",
    children: [
      {
        name: "项目管理",
        key: "7-01",
        link: "/project/item",
        Component: ProjectItem,
      },
      {
        name: "项目信息管理",
        key: "7-02",
        link: "/project/prodata",
        exact: true,
        Component: ProData,
        children: [
          {
            name: "单元",
            key: "7-02-01",
            link: "/project/prodata/:heId/util/:id",
            Component: Unit,
          }
        ]
      },
      {
        name: "业主管理",
        key: "7-03",
        link: "/project/owner",
        exact: true,
        Component: Owner,
        children: [
          {
            name: "新增业主",
            key: "7-03-01",
            link: "/project/owner/add",
            Component: AddOwner,
          },
          {
            name: "编辑业主",
            key: "7-03-02",
            link: "/project/owner/:id/edit",
            Component: EditOwner,
          },
        ]
      },
      {
        name: "商铺信息管理",
        key: "7-04",
        link: "/project/shop",
        Component: Shop,
      },
    ]
  },
  {
    name: "基础数据管理",
    key: "8",
    children: [
      {
        name: "部门信息列表",
        key: "8-01",
        link: "/base/department",
        Component: BaseDepartment
      },
      {
        name: "岗位管理",
        key: "8-02",
        link: "/base/station",
        Component: Station
      },
      {
        name: "角色管理",
        key: "8-03",
        link: "/base/role",
        exact: true,
        Component: RoleList,
        children: [
          {
            name: "编辑/权限角色",
            key: "8-03-01",
            link: "/base/role/:id/edit",
            Component: EditRole
          }
        ]
      },
      {
        name: "员工管理",
        key: "8-04",
        link: "/base/staff",
        Component: StaffList,
        exact: true,
        children: [
          {
            name: "员工编辑",
            key: "8-04-01",
            link: "/base/staff/:id/edit",
            Component: EditStaff
          }
        ]
      },
      {
        name: "基础数据字典",
        key: "8-05",
        link: "/base/library",
        Component: BaseLibrary
      },
    ]
  },
  {
    name: "管理员设置",
    key: "9",
    children: [
      {
        name: "权限菜单",
        key: "9-01",
        link: "/system/treemenu",
        Component: TreeMenu
      },
      {
        name: "系统数据字典",
        key: "9-02",
        link: "/system/library",
        Component: SystemLibrary
      },
    ]
  },
]