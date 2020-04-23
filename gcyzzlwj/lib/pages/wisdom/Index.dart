import 'package:flutter/material.dart';
import '../../components/MyHeader.dart';

class WisdomPage extends StatefulWidget {
  WisdomPage({Key key}) : super(key: key);

  @override
  _WisdomPageState createState() => _WisdomPageState();
}

class _WisdomPageState extends State<WisdomPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(title: Text("智慧小区"),),
    );
  }
}