import 'package:flutter/material.dart';
import '../../components/MyHeader.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../http.dart';

class OwnerPage extends StatefulWidget {
  OwnerPage({Key key}) : super(key: key);

  @override
  _OwnerPageState createState() => _OwnerPageState();
}

class _OwnerPageState extends State<OwnerPage> {
  String ownercode="高超物联";
  @override
  void initState() { 
    super.initState();
    this.initial();
  }
  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/qr/owner", context: context, params: {'type':"1"});
    if(data != null){
      setState(() {
        this.ownercode = data;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("业主二维码"),
        actions: Container(
          child: FlatButton(child: Text("访客二维码", style: TextStyle(color: Theme.of(context).primaryColor),),
            onPressed: (){
              Navigator.of(context).pushNamed("/vistor");
            },
          ),
        ),
      ),
      body: Center(
        child: Container(
          child: Column(
            children: <Widget>[
              SizedBox(height: 30.0,),
              Text("业主开门二维码"),
              QrImage(
                data: this.ownercode,
                version: QrVersions.auto,
                size: 230.0,
              ),
              Text("有效时长4小时", style: TextStyle(color: Color(0xFFf13d18)),)
            ],
          ),
        ),
      ),
    );
  }
}

