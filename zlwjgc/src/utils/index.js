import {baseUrl} from "@/config"
import {Toast } from "native-base"
import AsyncStorage from '@react-native-community/async-storage';
import {RRCLoading} from "react-native-overlayer"

RRCLoading.setLoadingOptions({
  text: '正在加载..',
  loadingBackgroundColor: 'rgba(0,0,0,0.0)',
  //loadingImage: LoadingImage,
  loadingViewStyle: {backgroundColor: 'rgba(0,0,0,0.6)'},
  loadingTextStyle: {}
})

export function getStorage(key){
  return AsyncStorage.getItem(key)
}

export async function setStorage(key, value){
  try{
    await AsyncStorage.setItem(key, value)
  }catch(err){
    console.log(err, "setStorage")
  }
}

export function request(params){
  RRCLoading.show()
  return new Promise(async (resolve, reject)=>{
    let formData = new FormData()
    if(params.body){
      let bodys = params.body
      for(let key in bodys){
        formData.append(key, bodys[key])
      }
    }
    fetch(`${baseUrl}${params.url}`, {
      method: 'POST',
      body: formData
    }).then(async (response)=>{
      try{
        let data = await response.json()
        if(data.status == 1){
          resolve(data.data)
          RRCLoading.hide()
        }else if(data.status == 0){
          ToastTip("danger", data.msg)
          reject()
          RRCLoading.hide()
        }else if(data.status == -1){
          RRCLoading.hide()
          _navigation?_navigation.navigate("Login"):null
          reject()
        }else{
          RRCLoading.hide()
          reject()
          ToastTip("danger", "网络错误！")
        }
      }catch(err){
        console.log(err, "response catch")
        _navigation?_navigation.navigate("Login"):null
        reject()
        RRCLoading.hide()
      }
      
    })
    .catch((err)=>{
      console.log(err, "catch")
      reject()
      RRCLoading.hide()
    })
  })
}

export function ToastTip(type, msg){
  Toast.show({
    type: type?type:"success",
    text: msg?msg:"操作成功！",
    duration: 3000,
    position: "top",
    buttonText: "确定",
  })
}