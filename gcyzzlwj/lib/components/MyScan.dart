import 'dart:async';
import 'package:flutter/material.dart';
import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/services.dart';




class MyScan extends StatefulWidget {
  final Widget child;
  final callback;
  MyScan({Key key, this.child, this.callback}): super(key: key);
  
  @override
  _MyScanState createState() => _MyScanState();
}

class _MyScanState extends State<MyScan> {
  String barcode = "";

  @override
  void initState() { 
    super.initState();
  }
  

  @override
  Widget build(BuildContext context) {
    
    return Container(

       child: GestureDetector(
         child: widget.child,
         onTap: scan,
       ),
    );
  }


  Future scan() async {
    
    try {
      String barcode = await BarcodeScanner.scan();
      setState(() => this.barcode = barcode);
      Navigator.of(context).pushNamed("/pay");

    } on PlatformException catch (e) {
      if (e.code == BarcodeScanner.CameraAccessDenied) {  //没有相机权限
        setState(() {
          this.barcode = 'The user did not grant the camera permission!';
        });
      } else { //未知错误
        setState(() => this.barcode = 'Unknown error: $e');
      }
    } on FormatException{  //扫描发生异常
      setState(() => this.barcode = 'null (User returned using the "back"-button before scanning anything. Result)');
    } catch (e) { //位置错误
      setState(() => this.barcode = 'Unknown error: $e');
    }
  }

}