import 'package:flutter/material.dart';

class WisdomPage extends StatefulWidget {
  WisdomPage({Key key}) : super(key: key);

  @override
  _WisdomPageState createState() => _WisdomPageState();
}

class _WisdomPageState extends State<WisdomPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
       child: Scaffold(
         appBar: AppBar(
           title: Text("智慧生活"),
         ),
         body: Text("智慧生活"),
       ),
    );
  }
}