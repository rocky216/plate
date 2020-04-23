import 'package:flutter/material.dart';
import '../../../components/MyHeader.dart';
import '../../../components/MyList.dart';

class ControlPassPage extends StatefulWidget {
  ControlPassPage({Key key}) : super(key: key);

  @override
  _ControlPassPageState createState() => _ControlPassPageState();
}

class _ControlPassPageState extends State<ControlPassPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("门禁通行记录"),
      ),
      body: MyList(
        url: "/api/app/owner/user/info/card/passInfo",
        itemBuilder: (dataList, index){
          return ListTile(
            leading: Icon(Icons.class_),
            title: Text(dataList[index]["passDoorName"]),
            subtitle: Text(dataList[index]["buildTime"]!=null?dataList[index]["buildTime"]:"暂无"),
          );
        },
      ),
    );
  }
}