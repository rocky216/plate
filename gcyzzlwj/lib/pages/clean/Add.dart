import 'package:flutter/material.dart';
import 'package:gcyzzlwj/pages/utils.dart';
import '../../components/MyHeader.dart';
import '../../components/MyScrollView.dart';
import '../../components/MyUpload.dart';
import '../http.dart';

class AddCleanPage extends StatefulWidget {
  AddCleanPage({Key key}) : super(key: key);

  @override
  _AddCleanPageState createState() => _AddCleanPageState();
}

class _AddCleanPageState extends State<AddCleanPage> {

  List typeList = [];
  List imgs = [];
  String name;
  String info;
  String type;

  @override
  void initState() { 
    super.initState();
    widgetImgs();
    this.initial();
  }

  initial() async {
    var data = await NetHttp.getRequest("/api/app/he/repair/repairType", context: context, params: {});
    if (data != null) {
      setState(() {
        typeList = data;
      });
    }
  }

  widgetImgs(){
    List<Object> mylist = this.imgs.map((f){
          return Container(
            margin: EdgeInsets.only(right: 5.0),
            width: 90,
            height: 90,
            child: Image.network(f,
            fit: BoxFit.fill,),
          );
        }).toList();
  
    Object a = Container(
      child: MyUplaod(
        child: Container(
          width: 90,
          height: 90,
          alignment: Alignment.center,
          decoration: BoxDecoration(color: Color(0xFFdddddd)),
          child: Text("上传图片"),
        ),
        callback: (url){
          print(url);
          setState(() {
            this.imgs.add(url);
          });
        },
      ),
    );
    mylist.add(a);
    return mylist;
  }

  handlenSubmit() async {
    var data = await NetHttp.post("/api/app/he/repair/addHeRepair", context: context, params: {
      "name": name,
      "type": type,
      "info": info,
      "urls": imgs.join(",")
    });
    if(data != null){
      showToast("保存成功！");
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("新增报修"),
        actions: FlatButton(child: Text("保存", style: TextStyle(color: Theme.of(context).primaryColor),), 
        onPressed: (){
          this.handlenSubmit();
        },),
      ),
      body: MyScrollView(
        child: Container(
          padding: EdgeInsets.all(20.0),
          child: Column(
            children: <Widget>[
              Form(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    TextFormField(
                      decoration: InputDecoration(
                        border: OutlineInputBorder(borderSide: BorderSide(color: Color(0xFFeeeeee))),
                        labelText: "标题",
                      ),
                      onChanged: (v){
                        setState(() {
                          name=v;
                        });
                      },
                    ),
                    SizedBox(height: 10.0,),
                    Container(
                      width: double.infinity,
                      decoration: BoxDecoration(
                        border: Border.all(color: Color(0xFFaaaaaa), width: 1),
                        borderRadius: BorderRadius.circular(3.0),
                      ),
                      child:  DropdownButtonHideUnderline(
                        child: DropdownButton(
                          items:  typeList.map((f){
                            return DropdownMenuItem(
                              child: Text(f["dictLabel"]),
                              value: f["id"].toString(),
                            );
                          }).toList(),
                          value: type,
                          onChanged: (v){
                            setState(() {
                              type=v;
                            });
                          }
                        ),
                      ),
                    ),
                    SizedBox(height: 10.0,),
                    TextFormField(
                      decoration: InputDecoration(
                        border: OutlineInputBorder(borderSide: BorderSide(color: Color(0xFFeeeeee))),
                        labelText: "描述",
                      ),
                      minLines: 1,
                      maxLines: 5,
                      onChanged: (v){
                        info=v;
                      },
                    ),
                    SizedBox(height: 10.0,),
                    Wrap(
                      children:widgetImgs(),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}