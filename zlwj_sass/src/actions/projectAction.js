import {START_LOADING_PROJECT, END_LOADING_PROJECT} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"


export function removeOwnersLink(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
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
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addOwnersLink(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/addOwnersLink",
        method: "post",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function loadSelectAssetRedis(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/loadSelectAssetRedis",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteOwners(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/deleteOwners",
        method: "post",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getOwners(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/getOwners",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        ownerdetail: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editOwners(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/updateOwners",
        method: "post",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addOwners(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/addOwners",
        method: "post",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function ownersListPage(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/baseHeOwners/ownersListPage",
        method: "get",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        newowners: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteNothouse(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/delete",
        method: "post",
        data: {
          ...params,
        }
      }
      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editNothouse(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/updateAndOwner",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addNothouse(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/addAndOwner",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getHeShops(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        nothouse: data
      })
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function otherAssetList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/otherAssetList",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })
      return data
    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteHeLinkMan(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heLinkMan/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editHeLinkMan(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heLinkMan/updateAtta",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addHeLinkMan(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heLinkMan/addAtta",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getHeLinkMan(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heLinkMan/list",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        heLink:data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function updateAndAddPlateConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/plate/config/updateAndAddPlateConfig",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function parkPlateConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/plate/config/plateConfig",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function excelImportParkingSpace(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/parkingSpace/excelImport",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editParkingSpace(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/parkingSpace/update",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addParkingSpace(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/parkingSpace/add",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getParkingSpace(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/parkingSpace/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        parkFloorArea: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}


export function deleteParkLot(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carparkFloorArea/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getParkLot(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carparkFloorArea/getCarparkFloorAreaList",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        parklot: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editParkLot(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carparkFloorArea/update",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addParkLot(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carparkFloorArea/add",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addPlateFeeConfig(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/plate/config/addPlateFeeConfig",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function plateFeeConfigList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/plate/config/plateFeeConfigList",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteParkData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carpark/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getParkData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carpark/get",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editParkData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carpark/updateAttaList",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addParkData(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carpark/addAttaList",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}


export function getParkList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/carpark/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        park: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editAndUpdate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShopsInfo/addAndUpdate",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteShop(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editShop(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/update",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addShop(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/add",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getShopList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heShops/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        shop: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteOwner(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heOwners/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getHeHousing(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousing/list",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getOwnerDetail(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heOwners/getOwnersAllInfo",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addOwner(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heOwners/addAndUpdateOwners",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function insertExcelUsers(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heOwners/loadExcel",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getOwnerList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heOwners/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        owner: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editRoom(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousing/update",
        method: "post",
        data: {
          ...params,
        }
      }
      const options1 = {
        url: "/api/pc/heHouseInfo/update",
        method: "post",
        data: {
          ...params,
          id: params.heHouseInfoId
        }
      }

      let data = await fetch(options)
      let data1 = await fetch(options1)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editFloor(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heFloor/update",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function linkageAll(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousing/linkage",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteRoom(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousing/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteFloor(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heFloor/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteUnit(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heUnit/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getBaseNameAndCode(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/loadBaseNameAndCode",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addUtil(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heUnit/add",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getUtilList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heUnit/list",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        utilList: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteBuild(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heBuilding/delete",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editBuild(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heBuilding/update",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addBuild(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heBuilding/add",
        method: "post",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getBuildList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heBuilding/listPage",
        method: "get",
        data: {
          ...params,
        }
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT,
        build: data,
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function deleteHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/delete",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function editHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/updateAtta",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function addHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
    })
    try{
      const options = {
        url: "/api/pc/heHousingEstate/addAtta",
        method: "post",
        data: {...params}
      }

      let data = await fetch(options)
      if(next)next(data)
      dispatch({
        type: END_LOADING_PROJECT
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}

export function getHeHousingEstate(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: START_LOADING_PROJECT
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
        type: END_LOADING_PROJECT,
        projectitem: data
      })

    }catch(err){
      console.log(err, `color: ${log_color}`)
      dispatch({
        type: END_LOADING_PROJECT
      })
    }

  }
}