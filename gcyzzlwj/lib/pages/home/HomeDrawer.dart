import 'package:flutter/material.dart';
import '../http.dart';
import '../utils.dart';
import '../../redux/exports.dart';

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
  String avatarUrl="";
  
  @override
  void initState() { 
    super.initState();
    this.getUsers();
    // this.initial();
  }

  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/user/info/", context: context, params: {});
    if(data != null){
      setState(() {
        this.avatarUrl = data[0]["avatarUrl"];
      });
    }
  }

  getUsers() async {
    var userInfo = await getUserInfo();
    if(userInfo is Map && userInfo != null){
      
      setState(() {
        this.username = userInfo["he"]!=null?userInfo["he"]["heOwners"]["name"]:"";
        this.phone = userInfo["he"]!=null?userInfo["he"]["heOwners"]["phone"]:"";
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
    return StoreConnector<IndexState, Map>(
      onInit: (store){
        if(store.state.app.user == null){
          store.dispatch( getUserInfoFetch(context) );
        }
      },
      converter: (store)=>store.state.app.user,
      builder: (context, user){
        
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
                      child: user!=null && user["avatarUrl"]!="" ? 
                      Image.network(user["avatarUrl"],width: 60.0, height: 60.0, fit: BoxFit.fill)
                      :Container(
                        width: 60.0, 
                        height: 60.0,
                        decoration: BoxDecoration(color: Colors.grey),
                        child: Icon(Icons.person, color: Colors.white, size: 30.0,),
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
      },
    );
  }
}