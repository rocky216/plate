import 'package:flutter/material.dart';
import '../http.dart';
import '../utils.dart';

class HomeDrawer extends StatefulWidget {
  var callback;
  HomeDrawer({Key key, this.callback}) : super(key: key);

  @override
  _HomeDrawerState createState() => _HomeDrawerState();
}

class _HomeDrawerState extends State<HomeDrawer> {
  String username="";
  String phone="";
  List hes=[];
  
  @override
  void initState() { 
    super.initState();
    this.getUsers();
  }

  getUsers() async {
    var userInfo = await getUserInfo();
    if(userInfo is Map && userInfo != null){
      
      setState(() {
        this.username = userInfo["he"]["heOwners"]["name"];
        this.phone = userInfo["he"]["heOwners"]["phone"];
      });
    }
    var data = await NetHttp.getRequest("/api/app/owner/common/getHeList",context: context, params: {});
    if(data != null){
       setState(() {
        this.hes = data;
      });
    }
   
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: double.infinity,
            padding: EdgeInsets.fromLTRB(20.0, 80.0, 20.0, 30.0),
            decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                ClipOval(
                  child: Image.network(
                    "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg",
                    width: 60.0, 
                    height: 60.0,
                    fit: BoxFit.cover,
                  ),
                ),
                Padding(padding: EdgeInsets.fromLTRB(15.0, 5.0, 0, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(this.username, style: TextStyle(color: Colors.white, fontSize: 18.0),),
                      Text(this.phone, style: TextStyle(color: Colors.white, fontSize: 16.0),)
                    ]),
                )
              ],
            )
          ),
          Container(
            padding: EdgeInsets.fromLTRB(0, 20.0, 0, 0),
            child: Column(
              children: this.hes.map((f){
                return FlatButton(
                  child: Text(f['name']),
                  onPressed: () async {
                    var userInfo = await getUserInfo();
                    if(userInfo is Map && userInfo !=null){
                      userInfo["he"] = f;
                      await setUserInfo(userInfo);
                      Navigator.of(context).pop();
                      widget.callback();
                    }
                  },
                );
              }).toList())
          )
        ],
      ),
      
    );
  }
}