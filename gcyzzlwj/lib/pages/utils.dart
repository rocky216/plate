import 'package:flutter/material.dart';
import 'package:fluwx/fluwx.dart';
import 'package:gcyzzlwj/pages/http.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:convert' as convert;



auth( next ) async {
  var userInfo = await getUserInfo();
  if (userInfo != null && userInfo is Map && userInfo["he"] !=null ) {
      next();
  }else{
    showToast("请前往物业分配房间");
  }
}

Future<bool> confirm(context,{msg:"是否删除", ok, cancel}){
  return showDialog(
    context: context, 
    barrierDismissible: false,
    builder: (context){
      return AlertDialog(
        title: Text(msg),
        actions: <Widget>[
          FlatButton(
            child: Text("取消"),
            onPressed: (){
              Navigator.of(context).pop(false);
              if(cancel!=null){
                cancel();
              }
            },
          ),
          FlatButton(
            child: Text("确定"),
            onPressed: (){
              Navigator.of(context).pop(true);
              if(ok!=null){
                ok();
              }
            },
          )
        ],
      );
    }

  );
}

//获取索引
int getIndexOf(List arr, attr, str){
  int index = -1;
  arr.asMap().forEach((k,v){
    if(v[attr]==str){
      index = k;
    }
  });
  return index;
}

void showToast(msg){
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.CENTER,
    timeInSecForIosWeb: 1,
    backgroundColor: Color(0x90000000),
    textColor: Colors.white,
    fontSize: 16.0
  );
}


void setAgreement() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.setString("agreem", "1");
}
getAgreemnet() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  var agreem = prefs.getString("agreem");
  
  return agreem;
}

void setUserInfo(value) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  if(value is Map || value!="null"){
    var users = convert.jsonEncode(value);
    prefs.setString("usetInfo", users);
  }else{
    showToast("存储格式不正确！");
  }
}

getUserInfo() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  var users = await prefs.getString("usetInfo");
  
  if(users!=null && users != "null"){
    return convert.jsonDecode(users);
  }else {
    return null;
  }
  
}

removeUserInfo() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.clear();
}