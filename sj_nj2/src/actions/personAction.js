import {START_LOADING_PERSON, END_LOADING_PERSON} from "@/types"
import {log_color} from "@/utils/config"
import {fetch, setCookie, removeCookie} from "@/utils"

export function editEmployee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/"+params.id,
        method: "put",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaffDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/"+params.id,
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getTeach(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      console.log(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getTreeDept(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/dept/treeDept/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        treeDept: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function addEmployee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/",
        method: "post",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectRole",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectDeptList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDept",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getSelectDeptNotSmall(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/loadSelectDeptNotSmall",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PERSON,
        deptNotsmall: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}

export function getStaff(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      console.log(data)
      dispatch({
        type: END_LOADING_PERSON,
        staff: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}


export function getEmployeeDict(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PERSON
    })

    try{
      const options = {
        url: "/api/pc/employee/loadEmployeeDict/",
        method: "get",
        data: {
          ...params
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      console.log(data)
      dispatch({
        type: END_LOADING_PERSON,
        employeedict: data
      })
    }catch(err){
      dispatch({
        type: END_LOADING_PERSON
      })
      console.log(err, `color: ${log_color}`)
    }
  }
}