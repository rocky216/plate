import 'package:flutter/material.dart';

class AddService extends StatelessWidget {
  List serviceList = [
    {"title": "访客", "img": "assets/images/visitor.png", "url": "/owner"},
    {"title": "门禁", "img": "assets/images/control.png", "url": "/control"},
    {"title": "充电桩", "img": "assets/images/pile.png", "url": "/pile"},
    {"title": "车牌", "img": "assets/images/plate.png", "url": "/plate"},
  ];

  AddService({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(0, 5.0, 0, 5.0),
      margin: EdgeInsets.only(top: 5.0),
      decoration: BoxDecoration(color: Colors.white),
      child: Wrap(
        children: serviceList.asMap().keys.map((f)=>
          Container(
            padding: EdgeInsets.fromLTRB(f%2==1?5.0:20.0, 5.0, f%2==1?20.0:5.0, 5.0),
            width: MediaQuery.of(context).size.width/2,
            child: GestureDetector(
                child: Image(image: AssetImage(serviceList[f]["img"]), fit: BoxFit.fitHeight),
                onTap: (){
                  Navigator.of(context).pushNamed(serviceList[f]["url"]);
                }),
          ),
        ).toList()
      ),
    );
  }
}