import 'dart:async';
import 'package:flutter/material.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../pages/users/Login.dart';
import 'package:fluttertoast/fluttertoast.dart';

class NetUtils {
  
  static final baseUrl = "http://192.168.0.104:80";


  static tips(msg){
    
    Fluttertoast.showToast(
      msg: convert.Utf8Decoder().convert(msg),
      toastLength: Toast.LENGTH_LONG,
    );
  }

  static goLogin(context){
    Navigator.pushAndRemoveUntil(
      context,
      new MaterialPageRoute(builder: (context) => new LoginPage()),
      (route) => route == null,
    );
  }

  static Map<String, String> getCommonHeader(){

    Map<String, String> header = Map();

    header['token'] = "我是token";
    return header;
  }

  static Future<String> get(String url, context, {Map<String, String> params, token}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    StringBuffer sb = StringBuffer("?");
    String userInfo = prefs.getString("userInfo");
    Map Users = userInfo!="null" && userInfo!=null && userInfo.isNotEmpty? convert.jsonDecode(userInfo):{};
    
    if(token==null && Users.isNotEmpty){
      sb.write("token=${Users['token']}&");
      if(Users["he"]!=null){
        sb.write("heId=$Users['he']['id']&ownerId=$Users['he']['heOwners']['id']&");
      }
    }

    
    if( params != null && params.isNotEmpty ){
       params.forEach((key, value){
         sb.write("$key=$value"+'&');
       });
       String paramsStr = sb.toString();
       paramsStr.substring(0, paramsStr.length-1);
    }
    try{
      http.Response res = await http.get(baseUrl+url);
      if(res.statusCode==200){
        
        Map data = convert.jsonDecode(res.body);
        
        if(data["code"]==1){
          return data["data"];
        }else if(data["code"]=="2"){
          goLogin(context);
          throw FormatException();
        }
      }else{
        throw FormatException();
      }
    }catch(err){
      throw FormatException();
    }
  }


///post请求
  static post(url, context, {Map<String, String> params, token}) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String userInfo = prefs.getString("userInfo");
    
    Map Users = userInfo!="null" && userInfo!=null && userInfo.isNotEmpty? convert.jsonDecode(userInfo):{};
    
    
    Map newParams = new Map();

    if(token==null && Users.isNotEmpty){
      newParams["token"] = Users["token"];
      
      if(Users["he"]!=null ){
        newParams["heId"] = Users['he']['id'];
        newParams["ownerId"] = Users['he']['heOwners']['id'];
      }
    }

    try{
      http.Response res = await http.post(baseUrl+url, body: params);
      print(res.body);
      if(res.statusCode==200){
        Map data = convert.jsonDecode(res.body);
        
        if(data["code"]==1){
          return data["data"];
        }else if(data["code"]==2){
          goLogin(context);
          tips("请阿森松岛所多");
          return null;
        }else{
          print("object11111111111");
          return data["data"];
        }
      }else{
        return null;
        //throw FormatException();
      }
    }catch(err){
      print(err);
      throw FormatException();
    }
  }


}