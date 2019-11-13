import cookies from "react-cookies"


export function setCookie(key, val){
  
  if(typeof val != 'string' || typeof val != 'number' || typeof val != 'null'){
    val = JSON.stringify(val)
  }
  let expires = new Date()
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
  cookies.save(key,val, {
    path: "/",
    maxAge: 60*60*2,
    expires
  })
}

export function getCookie(key){
  let data = cookies.load(key)
  return data
}

export function removeCookie(key){
  cookies.remove(key, { path: '/' })
}
