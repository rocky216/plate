import 'package:flutter/material.dart';
import '../../../components/MyHeader.dart';
import '../../http.dart';

class OwnerHousePage extends StatefulWidget {
  OwnerHousePage({Key key}) : super(key: key);

  @override
  _OwnerHousePageState createState() => _OwnerHousePageState();
}

class _OwnerHousePageState extends State<OwnerHousePage> {
  List houses = [];

  @override
  void initState() { 
    super.initState();
    this.initial();
  }

  initial() async {
    var data = await NetHttp.getRequest("/api/app/owner/user/house/list", context: context, params: {});
    
    if(data != null){
      setState(() {
        this.houses = data;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("我的房屋"),
      ),
      body: Container(
        child: ListView.separated(
          itemBuilder: (context, index){
            return GestureDetector(
              child: ListTile(
                leading: Icon(IconData(0xe618, fontFamily: 'AntdIcons'), color: Color(0xFF777777), size: 30.0,),
                title: Text(houses[index]["houseName"]),
              ),
              onTap: (){
                Navigator.of(context).pushNamed("/user/family" , arguments: houses[index]);
              },);
          }, 
          separatorBuilder: (context, index){
            return Container(height: 1.0, color: Color(0xFFeeeeee));
          }, 
          itemCount: this.houses.length),
      ),
    );
  }
}