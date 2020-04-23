import 'package:flutter/material.dart';
import '../../components/MyScrollView.dart';
import '../../utils/http.dart';


class RegisterPage extends StatefulWidget {
  RegisterPage({Key key}) : super(key: key);

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  GlobalKey _formKey= new GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("用户注册"),
      ),
      body: MyScrollView(
        child: Container(
          margin: EdgeInsets.only(top: 20.0),
          padding: EdgeInsets.all(10.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                SizedBox(height: 20.0),
                Text("欢迎,注册智联万家！", style: TextStyle(color: Color(0xFF666666), fontSize: 22)),
                SizedBox(height: 20.0),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "用户名",
                    hintText: "请输入用户名！",
                    icon: Icon(Icons.person),
                  ),
                  validator: (v){
                    return v.trim().length>0?null:"用户名不能为空！";
                  },
                ),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: "密码",
                    hintText: "请输入密码！",
                    icon: Icon(Icons.lock)
                  ),
                  validator: (v){
                    return v.trim().length>5?null:"密码能不能小于5位数字";
                  },
                ),
                Row(
                  children: <Widget>[
                    Expanded(
                      flex: 2,
                      child: TextFormField(
                        decoration: InputDecoration(
                          labelText: "验证码",
                          hintText: "请输入验证码！",
                          icon: Icon(Icons.apps)
                        ),
                        validator: (v){
                          return v.trim().length>0?null:"请输入验证码！";
                        },
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: RaisedButton(
                        color: Theme.of(context).primaryColor,
                        textColor: Colors.white,
                        padding: EdgeInsets.all(1),
                        child: Text("获取验证码"),
                        onPressed: (){
                          
                        },
                      ),
                    )
                  ],
                ),
                SizedBox(height: 15.0),
                Container(
                  padding: EdgeInsets.only(left: 40.0),
                  width: double.infinity,
                  child: RaisedButton(
                    color: Theme.of(context).primaryColor,
                    textColor: Colors.white,
                    child: Text("注册"),
                    onPressed: () async {
                      if( (_formKey.currentState as FormState).validate() ){
                          
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