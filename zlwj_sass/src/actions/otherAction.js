import {START_LOADING_OTHER, END_LOADING_OTHER} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function getPropertyfee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/propertyOrder/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        propertyfee: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function SendJPush(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/jPush",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function addVoteRole(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/role/addVoteRole",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getHouseInfo(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/getHouseInfo",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        allhouse: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function deleteVoteOpt(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/options/delete",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function editVoteOpt(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/options/updateAtta",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function addVoteOpt(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/options/addAtta",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getThemeOption(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/options/list",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        voteopt: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function deleteTheme(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/delete",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getThemeDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/get",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function editTheme(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/update",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function addTheme(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/add",
        method: "post",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getThemeList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/vote/theme/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        theme: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}