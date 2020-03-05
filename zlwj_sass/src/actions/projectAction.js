import {START_LOADING_PROJECT, END_LOADING_PROJECT} from "@/types"
import {fetch } from "@/utils"
import {log_color} from "@/utils/config"

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