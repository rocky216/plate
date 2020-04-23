import 'package:flutter/material.dart';
import '../../../components/MyHeader.dart';
import '../../http.dart';

class PassCardPage extends StatefulWidget {
  PassCardPage({Key key}) : super(key: key);

  @override
  _PassCardPageState createState() => _PassCardPageState();
}

class _PassCardPageState extends State<PassCardPage> {
  List cardlist = [];
  @override
  void initState() { 
    super.initState();
    this.initial();
  }

  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/user/card", context: context, params: {});
    print(data);
    if(data != null){
      setState(() {
        this.cardlist = data;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("通行卡"),
      ),
      body: Container(
        padding: EdgeInsets.all(10.0),
        child: ListView.separated(
          itemBuilder: (context, index){
            return Container(
              padding: EdgeInsets.all(15.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.all( Radius.circular(5.0) ),
                gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  tileMode: TileMode.mirror,
                  end: Alignment.centerRight,
                  stops:  [0.1, 0.5, 0.8],
                  colors: [
                    Theme.of(context).primaryColor,
                    Colors.blueAccent,
                    Colors.purpleAccent,
                  ]
                )
              ),
              child: Column(
                children: <Widget>[
                  Container(
                    margin: EdgeInsets.only(bottom: 20.0),
                    child: Row(
                      children: <Widget>[
                        Text("卡名称:", style: TextStyle(color: Colors.white),),
                        this.cardlist[index]["cardName"]==""?Text("暂无",style: TextStyle(color: Colors.white),)
                          :Text(this.cardlist[index]["cardName"],style: TextStyle(color: Colors.white),)
                      ],
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Container(
                        child: Row(
                          children: <Widget>[
                            Text("IC:", style: TextStyle(color: Colors.white)),
                            this.cardlist[index]["icNumber"]==""?Text("暂无", style: TextStyle(color: Colors.white),)
                              :Text(this.cardlist[index]["icNumber"],style: TextStyle(color: Colors.white),)
                          ],
                        ),
                      ),
                      Container(
                        child: Row(
                          children: <Widget>[
                            Text("ID:", style: TextStyle(color: Colors.white),),
                            this.cardlist[index]["idNumber"]==""?Text("暂无",style: TextStyle(color: Colors.white),)
                              :Text(this.cardlist[index]["idNumber"], style: TextStyle(color: Colors.white),)
                          ],
                        ),
                      ),
                    ],
                  )
                ],
              ),
            );
          }, 
          separatorBuilder: (context, index){
            return Container(
              height: 5.0, color: Color(0xFFeeeeee),
            );
          },
          itemCount: this.cardlist.length),
      ),
    );
  }
}