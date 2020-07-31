import 'package:flutter/material.dart';
import 'package:gcyzzlwj/components/MyCard.dart';
import 'package:gcyzzlwj/components/MyEmpty.dart';

class HomeInspect extends StatefulWidget {
  final List dataList;
  HomeInspect({Key key, this.dataList}) : super(key: key);

  @override
  _HomeInspectState createState() => _HomeInspectState();
}

class _HomeInspectState extends State<HomeInspect> {
  @override
  Widget build(BuildContext context) {
    
    return Container(
      margin: EdgeInsets.only(top: 5.0),
       child: MyCard(
         title: Text("空置房巡查"),
         child: widget.dataList.isNotEmpty ? Column(
            crossAxisAlignment: CrossAxisAlignment.start, 
            
            children:  widget.dataList.map((f){
              
              return GestureDetector(
                onTap: (){
                  Navigator.of(context).pushNamed("/inspect/detail", arguments: f);
                },
                child: Container(
                  padding: EdgeInsets.only(bottom: 8.0),
                  decoration: BoxDecoration(border: Border(bottom: BorderSide(width: 1.0, color: Color(0xFFdddddd)))),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    children: <Widget>[
                      Container(
                        decoration: BoxDecoration(color: Color(0xFFeeeeee)),
                        alignment: Alignment.center,
                        width: 80.0, height: 80.0, 
                        child: f["imgUrl"].isNotEmpty?
                            Image.network(  f["imgUrl"],
                                width: 80.0, height: 80.0, fit: BoxFit.fill):Text("暂无图"),
                      ),
                      
                    // Image.network("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg",
                    // width: 80.0, height: 80.0, fit: BoxFit.fill),
                    Container(
                      margin: EdgeInsets.only(left: 10.0),
                      width: MediaQuery.of(context).size.width-120,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: <Widget>[
                        Container(
                          margin: EdgeInsets.only(bottom: 5.0),
                          child: Text(f["assetsName"], maxLines: 1, overflow: TextOverflow.ellipsis, 
                                style: TextStyle(color: Color(0xFF666666))),
                        ),
                        Container(
                          margin: EdgeInsets.only(bottom: 5.0),
                          child: Text(f["checkInfo"], maxLines: 1, overflow: TextOverflow.ellipsis, 
                                style: TextStyle(color: Color(0xFF666666))),
                        ),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Row(
                              children: <Widget>[
                                Text(f["checkUserName"]),
                              ],
                            ),
                            Text(f["checkTime"]!=null?f["checkTime"].substring(0,10):"", style: TextStyle(color: Color(0xFF999999)),),
                          ],
                        )
                      ],),
                    )
                  ],),
                ),
                );
            }).toList()
          ):MyEmpty(),
       ),
    );
  }
}