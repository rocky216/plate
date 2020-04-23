

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:loading/loading.dart';
import 'package:loading/indicator/ball_pulse_indicator.dart';


// class MyScrollView extends StatefulWidget {
//   final Widget child;
//   MyScrollView({Key key, this.child}) : super(key: key);

//   @override
//   _MyScrollViewState createState() => _MyScrollViewState();
// }

// class _MyScrollViewState extends State<MyScrollView> {


//   @override
//   Widget build(BuildContext context) {
//     return Theme.of(context).platform == TargetPlatform.iOS
//       ? CupertinoScrollbar(
//         child: SingleChildScrollView(
//           child: Column(children: <Widget>[
//             widget.child
//           ],),
//         )
//       ): Stack(
//         children: <Widget>[
//           Scrollbar(
//             child: SingleChildScrollView(
//               child: Column(
//                 children: <Widget>[
//                   widget.child,
                  
//                 ],
//               )
//             )
//           ),
//           Align(
//             alignment: Alignment.center,
//             child: Container(
//               decoration: BoxDecoration(color: Color(0x00000000)),
//               child: Column(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: <Widget>[
//                 Loading(indicator: BallPulseIndicator(), size: 60.0,color: Theme.of(context).primaryColor),
//                 Text("正在加载...")
//               ],),
//             ),
//           ),
          
//         ],
//       );
//   }
// }



class MyScrollView extends StatelessWidget {
  final Widget child;
  bool spinning=false;
  MyScrollView({Key key, this.child, this.spinning}) : super(key: key);
  


  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Scrollbar(
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                this.child,
                
              ],
            )
          )
        ),
        this.spinning==true?
        Align(
          child: Container(
            decoration: BoxDecoration(color: Color(0x00000000)),
            width: double.infinity,
            alignment: Alignment.center,
            child: Container(
              decoration: BoxDecoration(color: Color(0x90000000), borderRadius: BorderRadius.all( Radius.circular(8.0) )),
              padding: EdgeInsets.fromLTRB(10.0, 0, 10.0, 0),
              height: 90.0,
              child: Column(
                children: <Widget>[
                  Loading(indicator: BallPulseIndicator(), size: 50.0,color: Colors.white),
                  Text("正在加载...", style: TextStyle(color: Colors.white))
                ],
              ),
            ),
          ),
        ):Text("")
      ],
    );
  }
}