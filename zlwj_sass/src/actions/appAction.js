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