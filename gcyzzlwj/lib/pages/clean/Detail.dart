import 'package:flutter/material.dart';
import '../../components/MyHeader.dart';
import '../http.dart';
import '../../components/MyScrollView.dart';

class CleanDetailPage extends StatefulWidget {
  final arguments;
  CleanDetailPage({Key key, this.arguments}) : super(key: key);

  @override
  _CleanDetailPageState createState() => _CleanDetailPageState();
}

class _CleanDetailPageState extends State<CleanDetailPage> {
  Map detail={};
  List imgs = [];
  @override
  void initState() { 
    super.initState();
    this.initial();
  }

  initial() async {
    var data = await NetHttp.getRequest("/api/app/he/repair/heRepairInfo", context: context, params: {
      "id": widget.arguments["id"]
    });
    if(data != null){
      setState(() {
        this.detail = data;
        this.imgs = data["sysAttachmentList"];
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("报修详情"),
      ),
      body: MyScrollView(
        child: Container(
          child: Column(
            children: <Widget>[
              Text(detail.isNotEmpty?detail["repairName"]:"", style: TextStyle(fontWeight: FontWeight.w600, fontSize: 20.0),),
              Container(
                margin: EdgeInsets.all(10.0),
                child: Text(detail.isNotEmpty?detail["buildTime"]:"", style: TextStyle(color: Color(0xFF666666)),),
              ),
              Container(
                child: Text(detail.isNotEmpty?detail["repairInfo"]:""),
              ),
              Container(
                padding: EdgeInsets.all(10.0),
                child: Column(
                  children: imgs.map((f){
                    print(f);
                    return Padding(padding: EdgeInsets.fromLTRB(0, 10.0, 0, 0),
                      child: Image.network(f["dowloadHttpUrl"], fit: BoxFit.fill,),
                    );
                  }).toList(),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}