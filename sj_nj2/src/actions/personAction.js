import {START_LOADING_PERSON, END_LOADING_PERSON} from "@/types"
import {log_color} from "@/utils/config"
import {fetch, setCookie, removeCookie} from "@/utils"

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