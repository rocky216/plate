import 'dart:async';
import 'dart:convert' as convert;
import 'package:flutter/material.dart';
import '../../utils/http.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../index.dart';
import '../../components/MyScrollView.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';


class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  GlobalKey _formKey= new GlobalKey<FormState>();
  String _username;
  String _password;
  bool spinning;

  @override
  void initState() { 
    super.initState();
    
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        title: Text("用户登录"),
      ),
      body: MyScrollView(
        spinning: this.spinning,
        child: Container(
          padding: EdgeInsets.all(10.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                SizedBox(height: 30,),
                Text("欢迎登录智联万家！", 
                style: TextStyle(fontSize: 22, color: Color(0xFF666666)),),
                SizedBox(height: 30,),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "用户名",
                    hintText: "请输入用户名！",
                    icon: Icon(Icons.person)
                  ),
                  validator: (v){
                    return v.trim().length>0?null:"用户名不能为空！";
                  },
                  onChanged: (v){
                    setState(() {
                      this._username = v;
                    });
                  },
                ),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "密码",
                    hintText: "请输入密码！",
                    icon: Icon(Icons.lock)
                  ),
                  obscureText: true,
                  validator: (v){
                    return v.trim().length>5?null:"密码能不能小于5位数字";
                  },
                  onChanged: (v){
                    setState(() {
                      this._password = v;
                    });
                  },
                ),
                SizedBox(height: 10.0),
                Container(
                  margin: EdgeInsets.fromLTRB(0, 10.0, 0, 10.0),
                  padding: EdgeInsets.only(left: 40.0),
                  child: Row(
                    children: <Widget>[
                      Text("登录即代表您已同意我们的", style: TextStyle(color: Color(0xFF999999), fontSize: 12.0),),
                      Container(
                        width: 130.0,
                        child: GestureDetector(child: Text("《用户协议声明》", 
                            style: TextStyle(color: Theme.of(context).primaryColor, fontSize: 12.0)),
                          onTap: (){
                            Navigator.pushNamed(context, "/statement");
                          },
                        ),
                      )
                    ],
                  )
                ),
                SizedBox(height: 10.0),
                Container(
                  padding: EdgeInsets.only(left: 40),
                  width: double.infinity,
                  height: 40.0,
                  child: RaisedButton(
                    child: Text("登录"),
                    color: Theme.of(context).primaryColor,
                    textColor: Colors.white,
                    onPressed: () async{
                      SharedPreferences prefs = await SharedPreferences.getInstance();
                      if((_formKey.currentState as FormState).validate()){
                        // setState(() {
                        //   this.spinning = true;
                        // });
                        var data = await NetUtils.post("/api/app/owner/user/login/password", context,token: true,
                          params: {"account": "17512039105","password":"123456"});
                          prefs.setString("userInfo", convert.jsonEncode(data));
                          

                          if(data!=null){
                            Timer timer = new Timer(Duration(seconds: 1), (){
                              Navigator.pushAndRemoveUntil(context, 
                              new MaterialPageRoute(builder: (context) => new IndexPage()),
                                  (route) => route == null);
                              setState(() {
                                this.spinning = false;
                              });
                            });
                          }else{
                            print("object");
                            // setState(() {
                            //   this.spinning = false;
                            // });
                          }
                      }
                    },
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(top: 15.0),
                  child: GestureDetector(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text("没有账号吗？前往注册", style: TextStyle(color: Theme.of(context).primaryColor, fontSize: 13.0)),
                        Icon(Icons.arrow_forward, color: Theme.of(context).primaryColor, size: 13.0)
                      ],
                    ),
                    onTap: (){
                      Navigator.pushNamed(context, "/register");
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      )
    );
  }
}