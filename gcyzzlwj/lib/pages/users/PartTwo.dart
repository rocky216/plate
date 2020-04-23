import 'package:flutter/material.dart';

class PartTwo extends StatelessWidget {
  final balance;
  final allScore;
  const PartTwo({Key key, this.balance, this.allScore}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.fromLTRB(10.0, 20.0, 10.0, 20.0),
      padding: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 5.0),
      decoration: BoxDecoration(
        color: Colors.white, 
        boxShadow: [
          BoxShadow(
            color: Color(0xFFdddddd),
            // offset: Offset(0.0, 10.0), //
            blurRadius: 2.0, //阴影模糊程度
            spreadRadius: 2.0 //阴影扩散程度
          )
        ]
      ),
      child: Column(
        children: <Widget>[
          Container(
            child: Row(
              children: <Widget>[
                Expanded(
                  child: Container(
                    height: 52.0,
                    child: FlatButton(
                      child: Column(
                        children: <Widget>[
                          Icon(IconData(0xe622, fontFamily: 'AntdIcons'), color: Color(0xFF666666)),
                          Text("通行卡", style: TextStyle(color: Color(0xFF666666), fontSize: 12.0)),
                        ],
                      ),
                      onPressed: (){
                        Navigator.of(context).pushNamed("/user/passcard");
                      },
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: 52.0,
                    child: FlatButton(
                      child: Column(
                        children: <Widget>[
                          Icon(IconData(0xe618, fontFamily: 'AntdIcons'), color: Color(0xFF666666)),
                          Text("我的房屋", style: TextStyle(color: Color(0xFF666666), fontSize: 12.0)),
                        ],
                      ),
                      onPressed: (){
                        Navigator.of(context).pushNamed("/user/ownerhouse");
                      },
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: 52.0,
                    child: FlatButton(
                      child: Column(
                        children: <Widget>[
                          Icon(IconData(0xe63c, fontFamily: 'AntdIcons'), color: Color(0xFF666666)),
                          Text("设置密码", style: TextStyle(color: Color(0xFF666666), fontSize: 12.0)),
                        ],
                      ),
                      onPressed: (){
                        Navigator.of(context).pushNamed("/user/updatepassword");
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(height: 1.0, color: Color(0xFFeeeeee)),
          Container(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.fromLTRB(0, 10.0, 0, 10.0),
                  child: Row(
                    children: <Widget>[
                      Text("金豆："),
                      Text(this.balance==null?"0.00":this.balance.toString())
                    ],
                  ),
                ),
                Container(
                  child: Row(
                    children: <Widget>[
                      Text("积分"),
                      Text(this.allScore==null?"0.00":this.allScore.toString())
                    ],
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}