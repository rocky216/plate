import { START_LOADING_SELL, END_LOADING_SELL } from "@/types"
import {fetch } from "@/utils"
import _ from "lodash"


export function getAuthPermMenu(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/permission/permMenuInit",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function authPermMenu(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/permission/permMenu",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function editRole(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/permission/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function addRole(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/permission/",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function getRoles(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/permission/index",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
        roles:data
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function deleteSellUsers(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/user/delete",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function editSellUsers(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/user/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function addSellUsers(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/user/",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function getSellUsers(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/user/index/page",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
        users: data
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function deleteSellCompany(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/companyItem/delete",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function editSellCompany(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/companyItem/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function addSellCompany(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/companyItem/",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function getCompanys(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/companyItem/treeTable",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)

      const handleData = (arr:any[])=>{
        _.each(arr, (item: any)=>{
          if(item.children.length==0){
            item.children=null
          }else{
            handleData(item.children)
          }
        })
      }
      handleData(data);
      
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
        companys: data
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function deleteMenus(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/menu/delete",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function editMenus(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/menu/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function addMenus(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/menu/",
        method: "post",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}

export function getMenus(params:any, next: (arg0: any) => void){
  return async function(dispatch:any, getState:any){
    dispatch({
      type: START_LOADING_SELL,
    })
    try{
      const options = {
        url: "/api/sell/sys/menu/treeTable",
        method: "get",
        data: {
          ...params
        }
      }

      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_SELL,
        menus: data
      })
    }catch(err){
      console.log(err, `color: red`)
      dispatch({
        type: END_LOADING_SELL,
      })
    }

  }
}