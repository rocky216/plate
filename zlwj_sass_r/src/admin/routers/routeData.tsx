import React from "react"
import loadable from "@loadable/component";
import _ from "lodash"


const lazy = (props: {loader: any})=>{
  const {loader} = props
  return loadable( function(){
    return loader
  } , {
    cacheKey: function(){
      console.log(arguments, "asas")
      return "key"
    },
    fallback: <div>正在加载。。。</div>
  })
}



const routes = [
  {
    id: "1",
    name: "工作台",
    path: "/",
    exact: true,
    component: lazy({loader: import("@admin/views/home")})
  },
  {
    id: "2",
    name: "用户管理",
    path: "/users",
    exact: true,
    component: lazy({loader: import("@admin/views/users")})
  },
  {
    id: "3",
    name: "公司管理",
    path: "/company",
    exact: true,
    component: lazy({loader: import("@admin/views/company")})
  },
  {
    id: "4",
    name: "资源管理",
    path: "/resource",
    exact: true,
    component: lazy({loader: import("@admin/views/resource")})
  },
  {
    id: "4",
    name: "定时任务",
    path: "/timetask",
    exact: true,
    children: [
      {
        name: "任务配置",
        path: "/timetask/conf",
        component: lazy({loader: import("@admin/views/timetask/conf")}),
      },
    ]
  },
]

let routeData:any[] = [];



const handleRoute = (arr: any[], obj:any=null)=>{
  _.each(arr, async (item, index)=>{
    if(item.component){
      if( obj && obj.id!=undefined ){
        await  routeData.push({...item, id: obj.id+'-'+(index+1)})
      }else{
        await  routeData.push(item)
      }
    }
    if(item.children && item.children.length>0){
      handleRoute(item.children, item)
    }
  })
}

handleRoute(routes);
export default routeData;

