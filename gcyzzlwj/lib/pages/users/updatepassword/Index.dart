import 'dart:async';

import 'package:flutter/material.dart';
import '../../../components/MyHeader.dart';
import '../../../components/MyScrollView.dart';
import '../../utils.dart';
import '../../http.dart';

class UpdatePasswordPage extends StatefulWidget {
  UpdatePasswordPage({Key key}) : super(key: key);

  @override
  _UpdatePasswordPageState createState() => _UpdatePasswordPageState();
}

class _UpdatePasswordPageState extends State<UpdatePasswordPage> {
  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  TextEditingController usename = new TextEditingController();
  String _username;
  String _password;
  String _repassword;
  String _code;
  int time=60;
  int totalTime = 60;
  var timer=null;

  @override
  void initState() { 
    super.initState();
    this.initial();
  }

  initial() async {
    var userInfo = await getUserInfo();
    if(userInfo != null && userInfo is Map){
      print(userInfo["phone"]);
      setState(() {
        this.usename.text = userInfo["phone"];
        this._username = userInfo["phone"];
      });
    }
  }

  handlenSubmit() async {
    var data = await NetHttp.post("/api/app/owner/user/updatePwd", context: context, params: {
      "account": this._username,
      "password": this._password,
      "code": this._code
    });
    if(data != null){
      showToast("密码修改成成功！");
      Navigator.of(context).pop();
    }
  }
  countDowm(){
    const period = const Duration(seconds: 1);
    this.timer?.cancel();
    setState(() {
      this.time--;
    });
    print(this.time);
    this.timer = Timer.periodic(period, (t) {
      setState(() {
        this.time--;
      });
      print(this.time);
      if (this.time ==0 ) {
        setState(() {
          this.time=this.totalTime;
        });
        this.timer?.cancel();
        t?.cancel();
        this.timer = null;
      }
    });
    print(this.timer);
  }
  @override
  void deactivate() {
    // TODO: implement deactivate
    super.deactivate();
    this.timer?.cancel();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("设置密码"),
      ),
      body: MyScrollView(
        child: Container(
          margin: EdgeInsets.all(20.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                TextFormField(
                  enabled: false,
                  controller: usename,
                  decoration: InputDecoration(
                    labelText: "账号",
                    icon: Icon(Icons.person)
                  ),
                ),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "密码",
                    icon: Icon(Icons.lock)
                  ),
                  obscureText: true,
                  validator: (v){
                    return v.trim().length<6?"密码不能小于6位数字":null;
                  },
                  onChanged: (v){
                    setState(() {
                      this._password = v;
                    });
                  },
                ),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "确认密码",
                    icon: Icon(Icons.lock)
                  ),
                  validator: (v){
                    return v.trim() != this._password?"两次密码不一致":null;
                  },
                  obscureText: true,
                  onChanged: (v){
                    setState(() {
                      this._repassword = v;
                    });
                  },
                ),
                Row(
                  children: <Widget>[
                    Expanded(
                      flex: 2,
                      child: TextFormField(
                        decoration: InputDecoration(
                          labelText: "验证码",
                          hintText: "请输入验证码!",
                          icon: Icon(Icons.apps)
                        ),
                        validator: (v){
                          return v.trim().length>0?null:"请输入验证码！";
                        },
                        onChanged: (v){
                          setState(() {
                            this._code = v;
                          });
                        },
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: GestureDetector(
                        child: this.time==this.totalTime?
                            Text("获取验证码", textAlign: TextAlign.center, style: TextStyle(color: Theme.of(context).primaryColor))
                              :Text(this.time.toString()+"s后重新获取", textAlign: TextAlign.center, style: TextStyle(color: Color(0xFF999999)),),
                        onTap: () async{
                          if(this.time < this.totalTime) return;
                          if(this._username == null || this._username.isEmpty || this._username.length<11) {
                            showToast("手机号格式不正确！");
                            return;
                          }
                          this.countDowm();
                          await NetHttp.post("/api/app/owner/sendCode", context: context, params: {
                            'phone':this._username,
                            'type': 'password'
                          });
                        },
                      ),
                    )
                  ],
                ),
                Container(
                  margin: EdgeInsets.only(top: 30.0),
                  width: double.infinity,
                  child: RaisedButton(
                    color: Theme.of(context).primaryColor,
                    child: Text("提交", style: TextStyle(color: Colors.white),),
                    onPressed: (){
                      if(_formKey.currentState.validate()){
                        this.handlenSubmit();
                      }
                    },
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}