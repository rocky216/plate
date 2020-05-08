import 'package:flutter/material.dart';


class MySelect extends StatefulWidget {
  final items;
  final label;
  final id;
  final callback;
  final value;
  MySelect({Key key, this.items, this.label, this.value, this.id, this.callback}) : super(key: key);

  @override
  _MySelectState createState() => _MySelectState();
}

class _MySelectState extends State<MySelect> {

  @override
  void initState() { 
    super.initState();
    print(this.createitems());
  }

  List<DropdownMenuItem> createitems(){
    if (widget.items == null) {
      print("object");
      return [];
    }

    var item =  widget.items.map((f){
       return DropdownMenuItem(
          child:new Text('5'),
          value: '5',
        );
    }).toList();
    
    return item;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 60,
        width: double.infinity,
        decoration: BoxDecoration(
            border:Border(bottom:BorderSide(width: 1,color: Color(0xffe5e5e5)) )
        ),
        child: new DropdownButtonHideUnderline(
            child: new DropdownButton(
              items:  [
                DropdownMenuItem(
                  child: Text("data"),
                  value: "1",
                )
              ],
              // value: widget.value,
              hint: new Text('请选择'),
              onChanged: (value){
               
                // if (widget.callback != null) {
                //   widget.callback(value);
                // }
              },
              
              elevation: 24,//设置阴影的高度
              style: new TextStyle(//设置文本框里面文字的样式
                color: Color(0xff666666),
                fontSize: 14,
              ),
              iconSize: 30.0,
            )
        )
    );
  }
}

