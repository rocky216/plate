import 'package:flutter/material.dart';
import 'package:gcyzzlwj/components/MyHeader.dart';
import 'package:gcyzzlwj/pages/http.dart';
import 'package:gcyzzlwj/pages/utils.dart';
import 'package:gcyzzlwj/redux/exports.dart';
import 'package:gcyzzlwj/redux/user/user_middleware.dart';

class AddFamily extends StatefulWidget {
  final arguments;
  AddFamily({Key key, this.arguments}) : super(key: key);

  @override
  _AddFamilyState createState() => _AddFamilyState();
}

class _AddFamilyState extends State<AddFamily> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  
  String name;
  String phone;
  String ownerType="1";
  String sex;


  handleSubmit() async {
    
    try{
      if(_formKey.currentState.validate()){
        var data = await NetHttp.post("/api/app/owner/user/addBrother", context: context, params: {
          "name": this.name,
          "phone": this.phone,
          "ownerType": this.ownerType.toString(),
          "assetsType": "house",
          "assetsId": widget.arguments["houseId"].toString(),
        });
        if(data != null ){
          showToast("保存成功!");
          StoreProvider.of<IndexState>(context).dispatch( getFamilys(context,
            next: (){
              Navigator.of(context).pop();
            },
            params: {"assetsId":  widget.arguments["houseId"], "assetsType": "house" }) );
        }
      }
      
    }catch(e){
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    print(widget.arguments["houseId"]);
    return Scaffold(
      appBar: MyHeader(
        title: Text("添加家庭成员"),
        actions: FlatButton(child: Text("保存", style: TextStyle(color: Theme.of(context).primaryColor),), onPressed: (){
          handleSubmit();
        },),
      ),
      body: Container(
        padding: EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(labelText: "姓名"),
                validator: (val){
                  print(val);
                  if(val == null || val.isEmpty){
                    return "姓名不能为空！";
                  }
                  return null;
                },
                onChanged: (val){
                  setState(() {
                    this.name = val;
                  });
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: "电话"),
                validator: (val){
                  RegExp reg = new RegExp(r'^\d{11}$');
                  if (!reg.hasMatch(val)) {
                    return '请输入11位手机号码！';
                  }
                  return null;
                },
                onChanged: (val){
                  setState(() {
                    this.phone = val;
                  });
                },
              ),
              SizedBox(height: 10,),
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(width: 1, color: Color(0xFFaaaaaa)))
                  
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton(
                    items: [
                      DropdownMenuItem(child: Text("家庭成员"), value: "1",),
                      DropdownMenuItem(child: Text("租客"), value: "2",)
                    ], 
                    onChanged: (value) {
                      setState(() {
                        this.ownerType = value;
                      });
                    },
                    value: ownerType,
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}