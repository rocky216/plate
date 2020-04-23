import 'package:flutter/material.dart';
import '../../components/MyHeader.dart';
import '../../components/MyList.dart';

class PilePage extends StatefulWidget {
  PilePage({Key key}) : super(key: key);

  @override
  _PilePageState createState() => _PilePageState();
}

class _PilePageState extends State<PilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("充电桩"),
      ),
      body: MyList(
        url: "/api/app/owner/user/power/list",
        itemBuilder: (dataList, index){
          return ListTile(
            leading: dataList[index]["online"]=="1"?
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.check_circle, size: 20.0, color: Colors.green,),
                  Text("在线", style: TextStyle(color: Colors.green),)
                ],
              )
              :Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.cancel, size: 20.0, color: Colors.red,),
                  Text("下线", style: TextStyle(color: Colors.red))
                ],
              ),
            title: Text(dataList[index]["deviceName"]),
            // subtitle: Text(dataList[index]["deviceAttrName"]),
          );
        },
      ),
    );
  }
}