import 'package:flutter/material.dart';
import '../utils.dart';


class HomeProperty extends StatelessWidget {
  
  List<Map> palaces = [
    {"title": "议事堂", "icon": 0xe631, "bgcolor": 0xFF628dc7, "url":"/dishall"},
    {"title": "政务公开", "icon": 0xe621, "bgcolor": 0xFFf4c200, "url":"/govern"},
    {"title": "保洁维修", "icon": 0xe70e, "bgcolor": 0xFF3fb785, "url":"/clean"},
    {"title": "呼叫物业", "icon": 0xe785, "bgcolor": 0xFFec6497, "url":"/contact"},
  ];

  HomeProperty({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10.0),
      decoration: BoxDecoration(color: Colors.white),
      child: Row(
        children:  this.palaces.map((f)=>(
          Expanded(
            child: FlatButton(
              child: Column(
                children: <Widget>[
                  Container(
                    width: 50.0,
                    height: 50.0,
                    decoration: BoxDecoration(
                      color: Color(f["bgcolor"]),
                      borderRadius: BorderRadius.all(Radius.circular(8.0))
                    ),
                    child: Icon(IconData(f["icon"], fontFamily: 'AntdIcons'), color: Colors.white,),
                  ),
                  
                  Text(f["title"], style: TextStyle(fontSize: 12),)
                ],
              ),
              onPressed: () async {
                auth((){
                  Navigator.of(context).pushNamed(f["url"]);
                });
              },
            )
          )
        )).toList(),
      ),
    );
  }
}