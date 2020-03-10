import {START_LOADING_APP, END_LOADING_APP} from "@/types"

export function setCollapsedTrue(){
  return async function(dispatch, getState){
    dispatch({
      type: "END_LOADING_APP",
      collapsed: true
    })
  }
}

export function setCollapsedFalse(){
  return async function(dispatch, getState){
    dispatch({
      type: "END_LOADING_APP",
      collapsed: false
    })
  }
}

export function getKeepTabs(params){
  return async function(dispatch, getState){
    const {name, path} = params
    if(name && path){
      let _index = _.findIndex(getState().app.keeptabs, o=>o.name==name)
      if(_index>-1)return
      getState().app.keeptabs.push({
        name,
        path
      })
      dispatch({
        type: "END_LOADING_APP",
        keeptabs: getState().app.keeptabs
      })
    }

    
  }
}

export function removeKeepTabs(index){
  return async function(dispatch, getState){
    if(getState().app.keeptabs.length<=1) return;
    if(index>-1){
      let newArr = _.cloneDeep(getState().app.keeptabs)
      newArr.splice(index, 1)
      dispatch({
        type: "END_LOADING_APP",
        keeptabs: newArr
      })
    }
  }
}
