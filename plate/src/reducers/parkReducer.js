import {LOADING_PARK_START, LOADING_PARK_END} from "@/types"

const initialState = {
  spinning: false
}

export default function (state = initialState, action){
  switch (action.type) {
    case LOADING_PARK_START:
      return Object.assign({},state, action, {spinning: true})
    case LOADING_PARK_END:
      return Object.assign({},state, action, {spinning: false})
    default:
        return state
  }
}