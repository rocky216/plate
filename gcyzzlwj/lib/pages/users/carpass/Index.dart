import 'package:flutter/material.dart';
import '../../../components/MyHeader.dart';
import '../../../components/MyList.dart';


class CarPassPage extends StatefulWidget {
  CarPassPage({Key key}) : super(key: key);

  @override
  _CarPassPageState createState() => _CarPassPageState();
}

class _CarPassPageState extends State<CarPassPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("车辆通行记录"),
      ),
      body: MyList(
        url: "/api/app/owner/user/plateRecord",
        itemBuilder: (dataList, index){
          return ListTile(
            leading: Container(
              width: 10.0,
              child: Icon(Icons.directions_car),
            ),
            title: Text(dataList[index]["license"]),
            subtitle: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Text("进："),
                    Text(dataList[index]["iTime"]!=null?dataList[index]["iTime"]:"暂无", style: TextStyle(fontSize: 12.0) )
                  ],
                ),
                Row(
                  children: <Widget>[
                    Text("出："),
                    Text(dataList[index]["oTime"]!=null?dataList[index]["oTime"]:"暂无", style: TextStyle(fontSize: 12.0))
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

