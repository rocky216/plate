import 'package:flutter/material.dart';
import '../../../components/MyList.dart';
import '../../../components/MyHeader.dart';

class UserCleanPage extends StatefulWidget {
  UserCleanPage({Key key}) : super(key: key);

  @override
  _UserCleanPageState createState() => _UserCleanPageState();
}

class _UserCleanPageState extends State<UserCleanPage> {

  handlenStatus(str){
    Color color = Colors.red;
    String text = "";
    if(str.toString()=="0"){
      color=Colors.red;
      text="待处理";
    }else if(str.toString()=="1"){
      color=Colors.orange;
      text="待处中";
    }else {
      color=Theme.of(context).primaryColor;
      text="已处理";
    }
    return Container(
      padding: EdgeInsets.fromLTRB(3.0, 0, 3.0, 0),
      margin: EdgeInsets.only(right: 10.0),
      decoration: BoxDecoration(color: color, borderRadius: BorderRadius.all( Radius.circular(3.0) )),
      child: Text(text, style: TextStyle(color: Colors.white),),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("保洁维修记录"),
      ),
      body: MyList(
        url: "/api/app/he/repair/",
        itemBuilder: (dataList, index){
          return Container(
            padding: EdgeInsets.only(bottom: 8.0),
            child: Row(
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
              Image.network(dataList[index]["sysAttachmentList"][0]["dowloadHttpUrl"],
              width: 80.0, height: 80.0, fit: BoxFit.fill),
              Container(
                margin: EdgeInsets.only(left: 10.0),
                width: MediaQuery.of(context).size.width-120,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                  Container(
                    margin: EdgeInsets.only(bottom: 5.0),
                    child: Text(dataList[index]["repairName"], maxLines: 1, overflow: TextOverflow.ellipsis, 
                    style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w700),)
                  ),
                  Container(
                    margin: EdgeInsets.only(bottom: 5.0),
                    child: Text(dataList[index]["repairInfo"], maxLines: 1, overflow: TextOverflow.ellipsis, 
                          style: TextStyle(color: Color(0xFF666666))),
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          this.handlenStatus(dataList[index]["processingState"]),
                          Text(dataList[index]["processingUserName"]),
                        ],
                      ),
                      Text(dataList[index]["buildTime"]!=null?dataList[index]["buildTime"].substring(0,11):"", style: TextStyle(color: Color(0xFF999999)),),
                    ],
                  )
                ],),
              )
            ],),
          );
        },
      ),
    );
  }
}