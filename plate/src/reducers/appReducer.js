import {LOADING_DATA_START, LOADING_DATA_END} from "@/types"

const initialState = {
  spinning: false,
  pagination({current, pageSize, total}){
    return {
      current: current?current:1,
      pageSize: pageSize?pageSize:10,
      total: total?total:0
    }
  }
}

export default function (state = initialState, action){
  switch (action.type) {
    case LOADING_DATA_START:
      return Object.assign({},state, action, {spinning: true})
    case LOADING_DATA_END:
      return Object.assign({},state, action, {spinning: false})
    default:
        return state
  }
}