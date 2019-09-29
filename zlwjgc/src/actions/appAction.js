export const APP_LOADING_DATA = "APP_LOADING_DATA"
export const APP_LOADING_START = "APP_LOADING_START"
import {request, setStorage, getStorage} from "@/utils"


export function getHouserInfo(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          id: getState().app.userInfo.id
        }
      }
      let data = await request(options)
      if(next)next(data)
      dispatch({
        type: APP_LOADING_DATA,
        houseList: data,
        currentHouse: data[data.length-1]
      })
    }catch(err){
      console.log(err, "getHouserInfo")
    }
  }
}

export  function handlenLogin(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url,
        body: params.body
      }
      let data = await request(options)
      let houses = await request({
        url: "/user/myHouse/list?token=" + data.user.token,
        body: {
          memberId: data.user.id
        }
      })
      if(next)next(data.user, data.version?data.version:null) 
      dispatch({
        type: APP_LOADING_DATA,
        userInfo: data.user,
        token: data.user.token,
        version: data.version?data.version:null,
        houseList: houses,
        currentHouse: houses[houses.length-1]
      })
      setStorage("token", data?data.user.token:'')
    }catch(err){
      console.log(err)
    }
  }
}



export function changeCurrenthouse(params, next){
  return async function(dispatch){
    dispatch({
      type: APP_LOADING_DATA,
      currentHouse: params
    })
    if(next)next()
  }
}

export function getVisitorCode(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          userId: getState().app.currentHouse.id,
          heId: getState().app.currentHouse.heId,
          buildingId: getState().app.currentHouse.buildingId,
          unitId: getState().app.currentHouse.unitId,
          houseId: getState().app.currentHouse.id,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getVisitorCode")
    }
  }
}


export function getVoteThemeList(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          heId: getState().app.currentHouse.heId,
          buildingId: getState().app.currentHouse.buildingId,
          unitId: getState().app.currentHouse.unitId,
          houseId: getState().app.currentHouse.id,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      // dispatch({
      //   type: APP_LOADING_DATA
      // })
      next(data)
    }catch(err){
      console.log(err, "getVoteThemeList")
    }
  }
}

export function getVoteThemeDetail(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          heId: getState().app.currentHouse.heId,
          buildingId: getState().app.currentHouse.buildingId,
          unitId: getState().app.currentHouse.unitId,
          houseId: getState().app.currentHouse.id,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getVoteThemeList")
    }
  }
}

export function getVoteThemeVote(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          memberId: getState().app.userInfo.id,
          heId: getState().app.currentHouse.heId,
          buildingId: getState().app.currentHouse.buildingId,
          unitId: getState().app.currentHouse.unitId,
          houseId: getState().app.currentHouse.id,
          companyId: getState().app.currentHouse.companyId,
          householdsId: getState().app.currentHouse.householdsId
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getVoteThemeVote")
    }
  }
}


export function getGovernmentList(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      dispatch({
        type: APP_LOADING_DATA
      })
      next(data)
    }catch(err){
      console.log(err, "governmentList")
    }
  }
}

export function getGovernmentDetail(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          pid: params.body.id
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getGovernmentDetail")
    }
  }
}

export function getHomeInfo(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: APP_LOADING_START
    })
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          memberId: getState().app.userInfo.id,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId
        }
      }
      let data = await request(options)
      console.log(data, 888)
      dispatch({
        type:APP_LOADING_DATA,
        bannerList: data.appIndexAd,
        appIndexMenu: data.appIndexMenu,
        plateRecords: data.plateRecords,
        noticeList: data.notice
      })
    }catch(err){
      console.log(err, "getGovernmentDetail")
    }
  }
}


export function uploadFace(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          householdsId: getState().app.currentHouse.householdsId,
          companyId: getState().app.currentHouse.companyId,
          heId: getState().app.currentHouse.heId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "uploadFace")
    }
  }
}


export function getFaceList(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          householdsId: getState().app.currentHouse.householdsId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "uploadFace")
    }
  }
}

export function getDeviceList(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          heId: getState().app.currentHouse.heId,
          buildingId: getState().app.currentHouse.buildingId,
          unitId: getState().app.currentHouse.unitId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getDeviceList")
    }
  }
}

export function getCardList(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          heId: getState().app.currentHouse.heId,
          buildingId: getState().app.currentHouse.buildingId,
          unitId: getState().app.currentHouse.unitId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getDeviceList")
    }
  }
}


export function handlenCardSwitch(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getDeviceList")
    }
  }
}

export function handlenDeleteCard(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getDeviceList")
    }
  }
}

export function getLicenseList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: APP_LOADING_START
    })
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          mobile: getState().app.userInfo.phone,
          memberId: getState().app.userInfo.id,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      dispatch({
        type: APP_LOADING_DATA,
        licenseList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err, "getLicenseList")
    }
  }
}

export function getVistorLicenseList(params, next){
  return async function(dispatch, getState){
    dispatch({
      type: APP_LOADING_START
    })
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          memberId: getState().app.userInfo.id,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      dispatch({
        type: APP_LOADING_DATA,
        visitorLicense: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err, "getVistorLicenseList")
    }
  }
}

export function AddVistor(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          memberId: getState().app.userInfo.id,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "AddVistor")
    }
  }
}

export function addOwnerLicense(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          memberId: getState().app.userInfo.id,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "addOwnerLicense")
    }
  }
}



export function faceAppAdd(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          companyId: getState().app.currentHouse.companyId,
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "faceAppAdd")
    }
  }
}

export function faceAppDel(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "faceAppAdd")
    }
  }
}

export function getCode(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body
        }
      }
      let data = await request(options)
      
    }catch(err){
      console.log(err, "getCode")
    }
  }
}

export function userRegister(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getCode")
    }
  }
}

export function releaseGurante(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
          buildingId: getState().app.currentHouse.buildingId,
          houseId: getState().app.currentHouse.id,
          householdsId: getState().app.currentHouse.householdsId,
          unitId: getState().app.currentHouse.unitId,
          memberId: getState().app.userInfo.id
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "releaseGurante")
    }
  }
}

export function getGuranteList(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          heId: getState().app.currentHouse.heId
        }
      }
      let data = await request(options)
      dispatch({
        type: APP_LOADING_DATA,
        guaranteList: data
      })
      if(next)next(data)
    }catch(err){
      console.log(err, "getGuranteList")
    }
  }
}

export function getGuranteType(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          companyId: getState().app.currentHouse.companyId
        }
      }
      let data = await request(options)
      if(next)next(data)
    }catch(err){
      console.log(err, "getGuranteType")
    }
  }
}

export function getGuranteDelete(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "getGuranteDelete")
    }
  }
}


export function releaseComplaint(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          heId: getState().app.currentHouse.heId,
          companyId: getState().app.currentHouse.companyId,
          buildingId: getState().app.currentHouse.buildingId,
          houseId: getState().app.currentHouse.id,
          householdsId: getState().app.currentHouse.householdsId,
          unitId: getState().app.currentHouse.unitId,
          memberId: getState().app.userInfo.id
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "releaseComplaint")
    }
  }
}

export function updateUserInfo(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          uid: getState().app.userInfo.id
        }
      }
      let data = await request(options)
      next(data)
      dispatch({
        type: APP_LOADING_DATA,
        userInfo: _.assign({}, getState().app.userInfo, {name: data.name, headerImg: data.headerImg, email: data.email})
      })
    }catch(err){
      console.log(err, "updateUserInfo")
    }
  }
}

export function changePwd(params, next){
  return async function(dispatch, getState){
    try{
      const options = {
        url: params.url+'?token='+getState().app.token,
        body: {
          ...params.body,
          uid: getState().app.userInfo.id
        }
      }
      let data = await request(options)
      next(data)
    }catch(err){
      console.log(err, "changePwd")
    }
  }
}




