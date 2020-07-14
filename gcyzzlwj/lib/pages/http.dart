import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/index.dart';
import './utils.dart';
import './users/Login.dart';


class NetHttp {

  //获取token heId owerId
  static getNewParams (params) async {
    var userInfo = await getUserInfo();
    if(userInfo!="null" && userInfo != null && userInfo is Map){
      params["token"] = userInfo['token'];
      if(userInfo['he']!=null && userInfo['he'] is Map){
        params["heId"] = userInfo['he']['id'].toString();
        params["ownerId"] = userInfo['he']['heOwners']['id'].toString();
      }
      
    }
    return params;
  }

  static getNewUrl(url, params){
    String str = baseUrl+url+"?";
    params.forEach((k,v){
      str+="$k=$v&";
    });
    return str.substring(0, str.length-1);

    
  }

  //处理返回主体
  static handlenResponse(response, context){
    EasyLoading.dismiss();
    if(response.statusCode == 200){
      var data = jsonDecode( Utf8Decoder().convert(response.bodyBytes) );
      
      switch(data["code"]){
        case 1:
          return data["data"]==null?{}:data["data"];
        case 0:
          showToast(data["msg"]);
          return null;
        case -1:
          showToast(data["msg"]);
          return null;
        case 2:
          showToast("请重新登录");
          Navigator.pushAndRemoveUntil(
            context,
            new MaterialPageRoute(builder: (context) => new LoginPage()),
            (route) => route == null,
          );
          return null;
      }
    }else{
      showToast("请求超时");
      
      return null;
    }
  }

  static getRequest (String url, {context, params})  async{
    
    var newParams = await getNewParams(params);
    EasyLoading.show(status:"正在加载...");
    print(getNewUrl(url, newParams));
    try{
      var response = await http.get( getNewUrl(url, newParams) );
      
      return handlenResponse(response, context);
    }catch(err){
      EasyLoading.dismiss();
      showToast("异常操作");
      return null;
    }
  }

  static post (String url, {context, params}) async{
    var newParams = await getNewParams(params);
    EasyLoading.show(status:"正在加载");
    // print(baseUrl+url);
    print(newParams);
    try{
      var response = await http.post(baseUrl+url, body: newParams);
      
      return handlenResponse(response, context);
    }catch(err){
      EasyLoading.dismiss();
      showToast("异常操作");
      return null;
    }

  }
  static postIot (String url, {context, params}) async{
    var newParams = await getNewParams(params);
    EasyLoading.show(status:"正在加载");
    print(baseUrlIot+url);
    print(newParams);
    try{
      var response = await http.post(baseUrlIot+url, body: newParams);
      
      return handlenResponse(response, context);
    }catch(err){
      EasyLoading.dismiss();
      showToast("异常操作");
      return null;
    }

  }

}