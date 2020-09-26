import {START_LOADING_DAILY, END_LOADING_DAILY} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function addDailyRepair(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/addRepair",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function getRepairType(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/repairType",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        repairType: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function getUserListClockDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/heClockRecord/seleteClockById",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function getUserListClock(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/heClockRecord/selectUserListClock",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        clocks: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function detailDeilyRepairFinished(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/finished",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}


export function detailDeilyRepairDistribution(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/distribution",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function detailDeilyRepairBranch(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/branch",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function detailDeilyRepair(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/detailsRepair",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function getDeilyRepair(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        dailyRepair: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function compelCompleted(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolRecord/compelCompleted",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function detailPpPatrolRecord(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolRecordPoint/list",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}


export function getPpPatrolRecord(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolRecord/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        patrolRecord: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function editPpPatrolLine(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolLine/updateLine",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function detailPpPatrolLine(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolLine/selectLineById",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function addPpPatrolLine(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppLinePoint/insertLinePonint",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function getPpPatrolLine(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolLine/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        patrolLine: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function deletePpPatrolPoint(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolPoint/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function editPpPatrolPoint(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolPoint/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function addPpPatrolPoint(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolPoint/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}

export function getPpPatrolPoint(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_DAILY
    })
    try{
      const options = {
        url: "/api/pc/ppPatrolPoint/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_DAILY,
        patrolPoint: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_DAILY
      })
    }

  }
}