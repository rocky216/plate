import 'package:flutter/material.dart';
import '../../components/MyHeader.dart';
import '../../components/MyScrollView.dart';

class AddCleanPage extends StatefulWidget {
  AddCleanPage({Key key}) : super(key: key);

  @override
  _AddCleanPageState createState() => _AddCleanPageState();
}

class _AddCleanPageState extends State<AddCleanPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("新增报修"),
      ),
      body: MyScrollView(
        child: Text("data"),
      ),
    );
  }
}