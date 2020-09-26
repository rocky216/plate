import 'package:flutter/material.dart';
import '../../components/MyCard.dart';
import '../utils.dart';

class PartFour extends StatelessWidget {
  const PartFour({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.fromLTRB(10.0, 0, 10.0, 0),
      child: MyCard(
        title: Text("隐私协议", style: TextStyle(fontWeight: FontWeight.w700),),
        child: Container(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Container(
                child: FlatButton(
                  child: Column(
                    children: <Widget>[
                      Icon(IconData(0xe67e, fontFamily: 'AntdIcons'), color: Color(0xFF777777), size: 30.0,),
                      Text("隐私协议", style: TextStyle(color: Color(0xFF666666)))
                    ],
                  ),
                  onPressed: (){
                    auth((){
                      Navigator.of(context).pushNamed("/statement");
                    });
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