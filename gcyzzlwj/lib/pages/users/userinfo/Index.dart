import 'package:flutter/material.dart';
import 'package:gcyzzlwj/pages/utils.dart';
import '../../../components/MyHeader.dart';
import '../../../components/MyScrollView.dart';
import '../../http.dart';
import '../../../components/MyUpload.dart';

class UserInfoPage extends StatefulWidget {
  final arguments;
  UserInfoPage({Key key, this.arguments}) : super(key: key);

  @override
  _UserInfoPageState createState() => _UserInfoPageState();
}

class _UserInfoPageState extends State<UserInfoPage> {
  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  TextEditingController phone = new TextEditingController();
  TextEditingController idCard = new TextEditingController();
  TextEditingController email = new TextEditingController();
  
  String avatarUrl="";
  String sex="1";
  Map detail={};

  @override
  void initState() { 
    super.initState();
    this.initial();
    print(widget.arguments);
  }

  initial(){
    setState(() {
      // this.sex = widget.arguments["sex"];
      this.idCard.text = widget.arguments["idCard"]!=null?widget.arguments["idCard"]:"";
      this.phone.text = widget.arguments["phone"]!=null?widget.arguments["phone"]:"";
      this.email.text = widget.arguments["email"]!=null?widget.arguments["email"]:"";
      this.avatarUrl = widget.arguments["avatarUrl"];
    });
  }

  handlenSubmit() async {
    
    var data = await NetHttp.post("/api/app/owner/user/info/updateUserInfo", context: context, params: {
      "avatarUrl": this.avatarUrl,
      "email": this.email.text,
      "idCard": this.idCard.text,
      "phone": this.phone.text,
      "sex": this.sex,
    });
    if(data != null){
      showToast("修改成功！");
      Navigator.of(context).pop();
    }
  }
  



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("用户资料"),
      ),
      body: MyScrollView(
        child: Container(
          margin: EdgeInsets.all(15.0),
          width: double.infinity,
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                Container(
                  child: MyUplaod(
                    child: ClipOval(
                      child: avatarUrl==""? Container(
                        width: 80.0, 
                        height: 80.0,
                        decoration: BoxDecoration(color: Colors.grey),
                        child: Icon(Icons.person, color: Colors.white, size: 30.0,),
                      ):Image.network(avatarUrl,width: 80.0, height: 80.0, fit: BoxFit.fill),
                    ),
                    callback: (url){
                      setState(() {
                        this.avatarUrl = url;
                      });
                    },
                  )
                ),
                TextFormField(
                  controller: phone,
                  decoration: InputDecoration(
                    labelText: "手机号"
                  ),
                  validator: (v){
                    return v.trim().length!=11?"手机号码不正确":null;
                  },
                ),
                TextFormField(
                  controller: idCard,
                  decoration: InputDecoration(
                    labelText: "身份证"
                  ),
                ),
                TextFormField(
                  controller: email,
                  decoration: InputDecoration(
                    labelText: "邮箱"
                  ),
                ),
                Row(
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.only(left: 20.0),
                      child: Row(
                        children: <Widget>[
                          Container(
                            width: 30.0,
                            child: Radio(
                              value: "1",
                              groupValue: this.sex,
                              onChanged: (v){
                                setState(() {
                                  this.sex=v;
                                });
                              }
                            ),
                          ),
                          Text("男")
                        ],
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 20.0),
                      child: Row(
                        children: <Widget>[
                          Container(
                            width: 30.0,
                            child: Radio(
                              value: "2",
                              groupValue: this.sex,
                              onChanged: (v){
                                setState(() {
                                  this.sex=v;
                                });
                              }
                            ),
                          ),
                          Text("女")
                        ],
                      ),
                    ),
                  ],
                ),
                Container(
                  margin: EdgeInsets.only(top: 30.0),
                  width: double.infinity,
                  child: RaisedButton(
                    color: Theme.of(context).primaryColor,
                    child: Text("保存", style: TextStyle(color: Colors.white),),
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