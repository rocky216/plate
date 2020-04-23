import 'package:flutter/material.dart';
import 'package:fluwx/fluwx.dart';

class MyWxPay extends StatefulWidget {
  MyWxPay({Key key}) : super(key: key);

  @override
  _MyWxPayState createState() => _MyWxPayState();
}

class _MyWxPayState extends State<MyWxPay> {

  @override
  void initState() { 
    super.initState();
    
  }

  _initFluwx() async {
    // registerWxApi(appId: "wxd930ea5d5a228f5f",universalLink: "https://your.univerallink.com/link/");

    await registerWxApi(
        appId: "wxd930ea5d5a258f4f",
        doOnAndroid: true,
        doOnIOS: true,
        universalLink: "https://your.univerallink.com/link/");
    var result = await isWeChatInstalled;
    print("is installed $result");
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: RaisedButton(
        child: Text("微信支付"),
        onPressed: (){
          _initFluwx();
        },
      ),
    );
  }
}