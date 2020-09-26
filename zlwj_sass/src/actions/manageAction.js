import {START_LOADING_MANAGE, END_LOADING_MANAGE} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

export function heAssetsUpdateLog(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/HeAssetsUpdateLog/LogPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        assetlog: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function allTrimPlanPage(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/FixPlan/allPlanPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        alltrim: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function checkOrderBaseOtherExpendOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/checkOrder",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getBaseOtherExpendOrderDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/getOrder",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getBasePropertyOrderDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/getOrder",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getBaseOtherCostsOrderDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/getOrder",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOtherCostsOrderAllList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/manage/getOtherCostsOrderList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        otherallorder: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function setCheckOrderException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/baseOrderException/checkOrderException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getPropertyOrderPage(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/manage/propertyOrderPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        orderAll: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function expendCheckSignException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/checkSignException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOtherExpendDesc(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/getOtherExpendDesc",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}


export function getOtherExpendListAuth(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/manage/getOtherExpendOrderList",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        allexpend: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function checkSignException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/checkSignException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOtherCostsOrderListAuth(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/getOtherCostsOrderListAuth",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        otherOrder: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function checkOrderException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/propertyOrder/checkOrderException",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getShopsPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/get",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getHousePropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/get",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getAllProject(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        allproject: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getAllPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/propertyOrder/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        allorder: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function deleteOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function editOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/update",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function addOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/add",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}

export function getOperative(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_MANAGE
    })
    try{
      const options = {
        url: "/api/pc/operative/listPage",
        method: "get",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_MANAGE,
        operative: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_MANAGE
      })
    }

  }
}