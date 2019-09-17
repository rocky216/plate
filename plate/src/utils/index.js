import axios from "axios"


export function fetch(params){
  return new Promise((resovle, reject)=>{
    axios({
      url: params.url,
      method: params.method,
    })
  })
}