import {LOADING_PROJECT_START, LOADING_PROJECT_END} from "@/types"

const initialState = {
  spinning: false
}

export default function (state = initialState, action){
  switch (action.type) {
    case LOADING_PROJECT_START:
      return Object.assign({},state, action, {spinning: true})
    case LOADING_PROJECT_END:
      return Object.assign({},state, action, {spinning: false})
    default:
        return state
  }
}