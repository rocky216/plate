import 'package:flutter/material.dart';
import '../../components/MyCard.dart';

class HomeRepair extends StatelessWidget {
  final List dataList;
  const HomeRepair({Key key, this.dataList}) : super(key: key);

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
      color=Colors.blue;
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
    return Container(
      margin: EdgeInsets.only(top: 5.0),
      child: MyCard(
        title: Text("维修记录"), extra: Text("更多"),
        child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,  
        children: this.dataList.map((f){
          return Container(
            padding: EdgeInsets.only(bottom: 8.0),
            decoration: BoxDecoration(border: Border(bottom: BorderSide(width: 1.0, color: Color(0xFFdddddd)))),
            child: Row(
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
              Image.network("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg",
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
                    child: Text(f["repairName"], maxLines: 1, overflow: TextOverflow.ellipsis, 
                    style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w700),)
                  ),
                  Container(
                    margin: EdgeInsets.only(bottom: 5.0),
                    child: Text(f["repairInfo"], maxLines: 1, overflow: TextOverflow.ellipsis, 
                          style: TextStyle(color: Color(0xFF666666))),
                  ),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          this.handlenStatus(f["processingState"]),
                          Text(f["processingUserName"]),
                        ],
                      ),
                      Text(f["buildTime"]!=null?f["buildTime"].substring(0,11):"", style: TextStyle(color: Color(0xFF999999)),),
                    ],
                  )
                ],),
              )
            ],),
          );
        }).toList())
      ),
    );
  }
}