import 'package:flutter/material.dart';

class MyHeader extends StatefulWidget implements PreferredSizeWidget {
  final Widget title;
  final Widget leading;
  final Widget actions;

  MyHeader({this.title, this.leading, this.actions}) ; //: assert(title != null)
  
  @override
  Size get preferredSize {
    return new Size.fromHeight(56.0);
  }
  @override
  State createState() {
    return new MyHeaderState();
  }
}
class MyHeaderState extends State<MyHeader> {

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    
  }

  @override
  Widget build(BuildContext context) {
    return new SafeArea(
      top: true,
      child: Container(
        height: 45.0,
        // decoration: BoxDecoration(color: Theme.of(context).primaryColor),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Container(
              child: Row(
                children: <Widget>[
                  Navigator.canPop(context)?
                    Container(
                      width: 50.0,
                      child: FlatButton(
                        child: Icon(Icons.close, color: Color(0xFF666666),),
                        onPressed: (){
                          Navigator.of(context).pop();
                        },
                    ),
                  ):Padding(child: Text(""),padding: EdgeInsets.only(left: 10.0),),
                  widget.leading!=null?widget.leading:Text(""),
                  widget.title!=null?widget.title:Text(""),
                ],
              ),
            ),
            widget.actions!=null?widget.actions:Text(""),
          ],
        ),
      ),
    );
  }
}