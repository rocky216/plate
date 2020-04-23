import 'package:flutter/material.dart';
import '../utils.dart';
import '../../components/MyHeader.dart';
import '../../components/MyCard.dart';
import '../http.dart';

class ControlPage extends StatefulWidget {
  ControlPage({Key key}) : super(key: key);

  @override
  _ControlPageState createState() => _ControlPageState();
}

class _ControlPageState extends State<ControlPage> {
  List doorlist = [];
  @override
  void initState() { 
    super.initState();
    this.initial();
  }
  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/qr/deviceDoorList", context: context, params: {});

    if(data != null){
      setState(() {
        this.doorlist = data;
      });
    }
  }
  openDoor(item) async {
    Map params = {
      "iotId":item["iotId"],
      "openSecond":item["openSecond"].toString(),
      "reader":item["port"].toString(),
    };
    var data = await NetHttp.postIot("/controller/remote/open", context: context, params: params);
    
    if(data != null){
      showToast("开门成功");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("门禁"),
      ),
      body: Container(
        padding: EdgeInsets.all(10.0),
        child: ListView.separated(
          itemBuilder: (context, index){
            return Container(
              child: MyCard(
                title: Text(this.doorlist[index]["doorName"], style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16.0),),
                child: Container(
                  padding: EdgeInsets.all(10.0),
                  alignment: Alignment.center,
                  child: Container(
                    height: 90.0,
                    width: 90.0,
                    child: RaisedButton(
                      color: Theme.of(context).primaryColor,
                      child: Text("开门", style: TextStyle(color: Colors.white, fontSize: 16.0),),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(50.0))
                      ),
                      onPressed: (){
                        this.openDoor(this.doorlist[index]);
                      },
                    ),
                  ),
                ),
              ),
            );
          }, 
          separatorBuilder: (context, int index){
            return Container(height: 10.0);
          }, 
          itemCount: this.doorlist.length,
        )
      ),
    );
  }
}