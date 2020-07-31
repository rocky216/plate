import 'package:flutter/material.dart';
import 'package:gcyzzlwj/components/MyHeader.dart';
import 'package:gcyzzlwj/components/MyScrollView.dart';

class InspectDetail extends StatefulWidget {
  final arguments;
  InspectDetail({Key key, this.arguments}) : super(key: key);

  @override
  _InspectDetailState createState() => _InspectDetailState();
}

class _InspectDetailState extends State<InspectDetail> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("空置房巡查详情"),
      ),
      body: MyScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              width: double.infinity,
              child: Text(widget.arguments["checkTime"].substring(0,10)+'巡查'+widget.arguments["assetsName"], 
                textAlign: TextAlign.center, style: TextStyle(fontSize: 18),),
            ),
            Container(
              padding: EdgeInsets.all(20.0),
              child: Text(widget.arguments["checkInfo"]),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(10.0, 0, 10.0, 0),
              child: Column(
                children: (widget.arguments["attrList"] as List).map((f){
                  return f["dowloadHttpUrl"].isNotEmpty?
                                Image.network(  f["dowloadHttpUrl"],width: double.infinity, fit: BoxFit.fill):Text("暂无图");
                }).toList(),
              ),
            )
          ],
        ),
      ),
    );
  }
}