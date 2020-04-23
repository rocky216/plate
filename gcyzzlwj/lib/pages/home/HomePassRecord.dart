import 'package:flutter/material.dart';
import '../../components/MyCard.dart';

class HomePassRecord extends StatelessWidget {

  final List dataList;

  HomePassRecord({Key key, this.dataList}) : super(key: key);



  @override
  Widget build(BuildContext context) {
    
    return Container(
      margin: EdgeInsets.only(top: 5.0),
      alignment: Alignment.topLeft,
       child: MyCard(
        title: Text("通行记录"),
        extra: Text("更多"),
        child: Column(
          children: this.dataList.map((f)=>
            Container(
              padding: EdgeInsets.fromLTRB(0, 5.0, 0, 5.0),
              decoration: BoxDecoration(border: Border(bottom: BorderSide(width: 1.0, color: Color(0xFFdddddd)))),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(f["license"]),
                  SizedBox(height: 8.0,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text("进："+(f["iTime"]!=null?f["iTime"]:"暂无"), style: TextStyle(color: Color(0xFF999999)),),
                      Text("出："+(f["oTime"]!=null?f["oTime"]:"暂无"), style: TextStyle(color: Color(0xFF999999))),
                    ],
                  )
                ],
              ),
            )
          ).toList()
        ),
      ),
    );
  }
}