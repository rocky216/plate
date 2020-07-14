
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluwx/fluwx.dart';
import 'package:package_info/package_info.dart';
import '../users/Login.dart';
import '../Index.dart';
import '../utils.dart';
import '../http.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import '../../components/MyDownLoad.dart';
import 'package:url_launcher/url_launcher.dart';


class LaunchPage extends StatefulWidget {
  LaunchPage({Key key}) : super(key: key);

  @override
  _LaunchPageState createState() => _LaunchPageState();
}

class _LaunchPageState extends State<LaunchPage> {
  var time = 0;
  var taskId;

  @override
  void initState() { 
    super.initState();
    SystemChrome.setEnabledSystemUIOverlays([]);
    SystemChrome.setEnabledSystemUIOverlays([SystemUiOverlay.bottom]);
    
    this.initial();
    // this._initFluwx();
  }

  _initFluwx() async {
    await registerWxApi(
      /* 支付APPID */
        appId: "wx7e527bffc978694d",
        doOnAndroid: true,
        doOnIOS: true,
        universalLink: "https://your.univerallink.com/link/");
    var result = await isWeChatInstalled;
    print("微信注册成功-- $result");
  }


  initial()  async {
    final PackageInfo packageInfo = await PackageInfo.fromPlatform();
    
    var data = await NetHttp.getRequest("/api/app/owner/common/app/version", context: context, params: {});
    
    if(data != null){
       
      if(packageInfo.version==data["versionNo"]){
        if(data["flag"] == false){
          Navigator.pushAndRemoveUntil(
            context,
            new MaterialPageRoute(builder: (context) => new LoginPage()),
            (route) => route == null,
          );
        }else{
          Navigator.pushAndRemoveUntil(
            context,
            new MaterialPageRoute(builder: (context) => new IndexPage()),
            (route) => route == null,
          );
        }
      }else{
       
        confirm(context, msg: "发现新版本是否下载？", 
          ok: ()async{
            if (await canLaunch(data["appResourceUrl"])) {
              await launch(data["appResourceUrl"]);
            } else {
              throw 'Could not launch $data["appResourceUrl"]';
            }
          },
          cancel: () async {
            await SystemNavigator.pop();
            // await SystemChannels.platform.invokeMethod('SystemNavigator.pop');
          }
        );
      }
    }
  }



  @override
  void deactivate() {
    // TODO: implement deactivate
    SystemChrome.setEnabledSystemUIOverlays([SystemUiOverlay.top, SystemUiOverlay.bottom]);
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          top: false,
          child: Container(
            width: double.infinity,
            height: MediaQuery.of(context).size.height,
            child: Image.asset("assets/images/launch_image.png", fit: BoxFit.fill,),
          ),
        ),
      );
  }


  updateApp(){
    return showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) {
        return Container(
          width: 300,
          height: 100,
          margin: EdgeInsets.fromLTRB(40.0, 150, 40.0, 300),
          decoration: BoxDecoration(color: Colors.white),
          child: Scaffold(
            body: Container(
              padding: EdgeInsets.only(top: 30.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text("发现新版本是否更新？", style: TextStyle(fontSize: 20.0),),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      FlatButton(child: Text("取消", style: TextStyle(color: Theme.of(context).primaryColor)), 
                        onPressed: () async {
                          Navigator.of(context).pop(false);
                          await SystemNavigator.pop();
                          // await SystemChannels.platform.invokeMethod('SystemNavigator.pop');
                      }),
                      MyDownLoad(
                        link: "http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
                        child: Container(
                          width: 60,
                          child: Text("确定", style: TextStyle(color: Theme.of(context).primaryColor),) 
                        ),
                        callback: (){
                          Navigator.of(context).pop(false);
                        },
                      )
                      
                    ],
                  )
                ],
              ),
            ),
          ),
        );
      }
    );
  }
}