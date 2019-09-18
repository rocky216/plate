export const LOADING_DATA = 'LOADING_DATA'



export function handlenHomeText(parmas){
  return async function(dispatch, getState){
    dispatch({
      type: LOADING_DATA,
      homeText: "我来了！"
    })
    
  }
}