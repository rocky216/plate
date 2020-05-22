import 'package:flutter/material.dart';
import '../http.dart';
import '../../components/MyHeader.dart';
import '../../components/MyScrollView.dart';
import './UserHeader.dart';
import 'PartTwo.dart';
import 'PartThree.dart';
import '../utils.dart';
import './Login.dart';
import '../../redux/exports.dart';


class UserPage extends StatefulWidget {
  UserPage({Key key}) : super(key: key);

  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  String avatarUrl="";
  var balance;
  var allScore;
  Map userinfo;

  @override
  void initState() { 
    super.initState();
    // this.initial();
    
  }

  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/user/info/", context: context, params: {});
    if(data != null){
      setState(() {
        this.avatarUrl = data[0]["avatarUrl"];
        this.balance = data[0]["appOwnerUserAccount"]["balance"];
        this.allScore = data[0]["appOwnerUserScore"]["allScore"];
        this.userinfo = data[0];
      });
    }
  }

  loginout(){
    confirm(context,msg: "是否退出？", ok: () async {
        var data = await removeUserInfo();
        var userInfo = await getUserInfo();

        if(userInfo == "null" || userInfo==null){
          Navigator.pushAndRemoveUntil(
            context,
            new MaterialPageRoute(builder: (context) => new LoginPage()),
            (route) => route == null,
          );
          StoreProvider.of<IndexState>(context).dispatch(clearAllState(context));
        }
    });
  }


  @override
  Widget build(BuildContext context) {
    return StoreConnector<IndexState, Map>(
      onInit: (store){
        if(store.state.app.user==null){
          store.dispatch( getUserInfoFetch(context) );
        }
      },
      converter: (store)=>store.state.app.user,
      builder: (context, user){
        return Scaffold(
          appBar: MyHeader(title: Text("个人中心"), 
          actions: FlatButton(
            child: Text("退出", style: TextStyle(color: Color(0xFF666666))),
            onPressed: () {
              this.loginout();
            },
          )),
          body: MyScrollView(
            child: Column(
              children: <Widget>[
                UserHeader(avatarUrl: user!=null?user["avatarUrl"]:"", userinfo: user!=null?user:null),
                PartTwo(balance: this.balance, allScore: this.allScore,),
                PartThree()
              ],
            ),
          ),
        );
      },
    );
  }
}