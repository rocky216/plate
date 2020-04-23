import 'package:flutter/material.dart';
import '../../components/MyCard.dart';

class PartThree extends StatelessWidget {
  const PartThree({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.fromLTRB(10.0, 0, 10.0, 0),
      child: MyCard(
        title: Text("个人记录", style: TextStyle(fontWeight: FontWeight.w700),),
        child: Container(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              Container(
                child: FlatButton(
                  child: Column(
                    children: <Widget>[
                      Icon(IconData(0xe692, fontFamily: 'AntdIcons'), color: Color(0xFF777777), size: 30.0,),
                      Text("车辆通行", style: TextStyle(color: Color(0xFF666666)))
                    ],
                  ),
                  onPressed: (){
                    Navigator.of(context).pushNamed("/user/carpass");
                  },
                ),
              ),
              Container(
                child: FlatButton(
                  child: Column(
                    children: <Widget>[
                      Icon(IconData(0xe64d, fontFamily: 'AntdIcons'), color: Color(0xFF777777), size: 30.0,),
                      Text("门禁通行", style: TextStyle(color: Color(0xFF666666)))
                    ],
                  ),
                  onPressed: (){
                    Navigator.of(context).pushNamed("/user/controlpass");
                  },
                ),
              ),
              Container(
                child: FlatButton(
                  child: Column(
                    children: <Widget>[
                      Icon(IconData(0xe70e, fontFamily: 'AntdIcons'), color: Color(0xFF777777), size: 30.0,),
                      Text("保洁记录", style: TextStyle(color: Color(0xFF666666)))
                    ],
                  ),
                  onPressed: (){
                    Navigator.of(context).pushNamed("/user/clean");
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}