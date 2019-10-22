import {LOADING_INTERNET_START, LOADING_INTERNET_END} from "@/types"

const initialState = {
  spinning: false
}

export default function (state = initialState, action){
  switch (action.type) {
    case LOADING_INTERNET_START:
      return Object.assign({},state, action, {spinning: true})
    case LOADING_INTERNET_END:
      return Object.assign({},state, action, {spinning: false})
    default:
        return state
  }
}