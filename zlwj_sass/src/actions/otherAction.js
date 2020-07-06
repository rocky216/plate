import {START_LOADING_OTHER, END_LOADING_OTHER} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"



export function goUpdateOwner(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/updateOwner",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function checkUpdateOwner(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/checkUpdateOwner",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}


export function removeOwnersLink(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/removeOwnersLink",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function addOwnerAndLink(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/addOwnerAndLink",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function updateAssetsRemark(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/updateAssetsRemark",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}


export function propertyfeeUpdateAssets(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/updateParking",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function propertyfeeUpdateOther(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets//updateOther",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function propertyfeeUpdateHouse(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/updateHouse",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function loadAssetsInfo(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/workCenterAssets/loadAssetsInfo",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        assetinfo: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function revokeBaseOrderException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOrderException/revokeOrderException",
        method: "post",
        data: {
          ...params,
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

export function submitOrderException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOrderException/subOrderException",
        method: "post",
        data: {
          ...params,
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


export function getExpendOrderDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/getOrder",
        method: "get",
        data: {
          ...params,
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

export function addBaseOtherExpendOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/addOrder",
        method: "post",
        data: {
          ...params,
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

export function getBaseOtherExpendOrderDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/initOrder",
        method: "get",
        data: {
          ...params,
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

export function getBaseOtherExpendOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherExpendOrder/getOtherExpendOrderList",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        otherExpendOrder: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function countPrintOrderNum(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/printOrder",
        method: "post",
        data: {
          ...params,
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

export function getBaseOtherCostsOrderDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/getOrder",
        method: "get",
        data: {
          ...params,
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

export function addBaseOtherCostsOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/addOrder",
        method: "post",
        data: {
          ...params,
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

export function getBaseOtherCostsOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/initOrder",
        method: "get",
        data: {
          ...params,
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

export function getOtherCostsOrderLists(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOtherCostsOrder/getOtherCostsOrderList",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        otherfeeorder: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getCoOperativeRedis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadCoOperativeRedis",
        method: "get",
        data: {
          ...params,
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

export function goPrintOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/printOrder",
        method: "post",
        data: {
          ...params,
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

export function getBasePropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/getOrder",
        method: "get",
        data: {
          ...params,
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

export function addBasePropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/addOrder",
        method: "post",
        data: {
          ...params,
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

export function initLoadOrderMoney(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/loadOrderMoney",
        method: "get",
        data: {
          ...params,
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

export function initBasePropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/addInit",
        method: "get",
        data: {
          ...params,
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

export function selectHeAssetListByKey(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/selectHeAssetListByKey",
        method: "get",
        data: {
          ...params,
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

export function getCarparkAssetRedis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadCarparkAssetRedis",
        method: "get",
        data: {
          ...params,
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

export function getPropertyOrderPage(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/basePropertyOrder/propertyOrderPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        propertyfeepage: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getOtherAssetRedis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadOtherAssetRedis",
        method: "get",
        data: {
          ...params,
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

export function getHouseAssetRedis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadHouseAssetRedis",
        method: "get",
        data: {
          ...params,
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

export function getAssetMenu(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadAssetMenu",
        method: "get",
        data: {
          ...params,
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

export function getHouseByUnitId(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadHouseByUnitId",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
      return data;
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getBuildAndUnitByHeId(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/loadBuildAndUnitByHeId",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
      })
      return data;
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function processingRepair(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/processingRepair",
        method: "post",
        data: {
          ...params,
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

export function addRepair(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/addAttaList",
        method: "post",
        data: {
          ...params,
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

export function getRepairList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/repairInfo/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        repair: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getPowerOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/powerOrder/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        recordpower: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getPlateRecord(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/plateRecord/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        recordcar: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function oneCardSystemRecharge(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/oneCardSystem/recharge",
        method: "post",
        data: {
          ...params,
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

export function carInfoExcelImport(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/excelImport",
        method: "post",
        data: {
          ...params,
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

export function oneCardLog(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/oneCardSystem/cardLogPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        solutionlog: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function editOneCardSystem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/oneCardSystem/update",
        method: "post",
        data: {
          ...params,
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

export function addOneCardSystem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/oneCardSystem/add",
        method: "post",
        data: {
          ...params,
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


export function getOneCardSystem(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/oneCardSystem/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        onecard: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function deleteCarAttaList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/delete",
        method: "post",
        data: {
          ...params,
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

export function getCarAttaList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/get",
        method: "get",
        data: {
          ...params,
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

export function editCarAttaList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/updateAttaList",
        method: "post",
        data: {
          ...params,
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

export function addCarAttaList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/addAttaList",
        method: "post",
        data: {
          ...params,
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

export function getPlates(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carpark/getCarparkList",
        method: "get",
        data: {
          ...params,
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

export function getCarList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/carInfo/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        car: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getOtherExpendDescDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/getOtherExpendDesc",
        method: "post",
        data: {
          ...params,
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

export function addOtherExpend(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/add",
        method: "post",
        data: {
          ...params,
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

export function getOtherExpendList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherExpendOrder/getOtherExpendList",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        otherExpend: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function otherFeeRecallException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/recallException",
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

export function otherFeesignException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/signException",
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

export function getOtherCostsOrderDesc(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/getOtherCostsOrderDesc",
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

export function getShopsPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/get",
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

export function recallPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/propertyOrder/revokeOrderException",
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


export function addOtherOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/add",
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

export function getOperativeAll(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/operative/list",
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

export function getAccount(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/account/listToHe",
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

export function getOtherfee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/otherCostsOrder/getOtherCostsOrderList",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        otherfee: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function subOrderException(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/baseOrderException/subOrderException",
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

export function getHousePropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/get",
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

export function addShopsPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/add",
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

export function loadShopOrderMoney(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/loadOrderMoney",
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

export function getShopAddInit(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/addInit",
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

export function getShopOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/shopsPropertyOrder/listPage",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        shoporder: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function sendCustom(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/sms/feige/sendCustom",
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

export function getSignAndTemplate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/sms/feige/getSignAndTemplate",
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

export function getShopList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/heShops/listToHe",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        shopList: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function addPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/add",
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

export function countPropertyOrder(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/loadOrderMoney",
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

export function addInitPropertyfee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/addInit",
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

export function deleteGovern(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/government/delete",
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

export function getGovernDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/government/get",
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

export function editGovern(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/government/updateAtta",
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

export function addGovern(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/government/addAtta",
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

export function getGovern(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/government/listPageWithBLOBs",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        govern: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getNoticeDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/notice/get",
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

export function deleteNotice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/notice/delete",
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

export function editNotice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/notice/update",
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

export function addNotice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/notice/add",
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

export function getNotice(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/notice/listPageWithBLOBs",
        method: "get",
        data: {
          ...params
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_OTHER,
        notice: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_OTHER,
      })
    }

  }
}

export function getPropertyfee(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_OTHER,
    })
    try{
      const options = {
        url: "/api/pc/housePropertyOrder/listPage",
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