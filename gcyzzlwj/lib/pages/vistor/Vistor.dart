import 'package:flutter/material.dart';
import '../../components/MyHeader.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../http.dart';

class VistorPage extends StatefulWidget {
  VistorPage({Key key}) : super(key: key);

  @override
  _VistorPageState createState() => _VistorPageState();
}

class _VistorPageState extends State<VistorPage> {
  String ownercode="高超物联";
  @override
  void initState() { 
    super.initState();
    this.initial();
  }
  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/qr/owner", context: context, params: {'type':"2"});
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
        title: Text("访客二维码"),
      ),
      body: Center(
        child: Container(
          child: Column(
            children: <Widget>[
              SizedBox(height: 30.0,),
              Text("访客开门二维码"),
              QrImage(
                data: this.ownercode,
                version: QrVersions.auto,
                size: 230.0,
              ),
              Text("有效时长12小时", style: TextStyle(color: Color(0xFFf13d18)),)
            ],
          ),
        ),
      ),
    );
  }
}

