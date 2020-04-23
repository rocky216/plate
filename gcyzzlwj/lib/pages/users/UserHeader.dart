import 'package:flutter/material.dart';
import '../utils.dart';

class UserHeader extends StatefulWidget {
  final avatarUrl;
  final userinfo;
  UserHeader({Key key, this.avatarUrl, this.userinfo}) : super(key: key);

  @override
  _UserHeaderState createState() => _UserHeaderState();
}

class _UserHeaderState extends State<UserHeader> {
  String username="";
  String phone = "";
  

  @override
  void initState() { 
    super.initState();
    this.getUsers();
  } 
  getUsers() async {
    var userInfo = await getUserInfo();
    if(userInfo["he"]!=null && userInfo["he"] is Map){
      setState(() {
        this.username = userInfo["he"]["heOwners"]["name"];
        this.phone = userInfo["he"]["heOwners"]["phone"];
      });
    }
    
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(10.0, 0, 10.0, 0),
      child: Row(
        children: <Widget>[
          GestureDetector(
            child: ClipOval(
              child: widget.avatarUrl==""? Container(
                width: 50.0, 
                height: 50.0,
                decoration: BoxDecoration(color: Colors.grey),
                child: Icon(Icons.person, color: Colors.white, size: 30.0,),
              ):Image.network(widget.avatarUrl,width: 50.0, height: 50.0, fit: BoxFit.fill),
            ),
            onTap: (){
              Navigator.of(context).pushNamed("/user/userinfo", arguments: widget.userinfo);
            },
          ),
          Container(
            margin: EdgeInsets.only(left: 10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  child: Text(this.username, style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18.0)),
                ),
                Text(this.phone)
              ],
            ),
          )
        ],
      ),
    );
  }
}