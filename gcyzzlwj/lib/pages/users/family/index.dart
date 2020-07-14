import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:gcyzzlwj/pages/http.dart';
import 'package:gcyzzlwj/redux/state.dart';
import 'package:gcyzzlwj/redux/user/user_middleware.dart';
import 'package:gcyzzlwj/redux/user/user_state.dart';
import 'package:redux/redux.dart';
import '../../../components/MyHeader.dart';
import '../../utils.dart';

class UserFamilly extends StatefulWidget {
  final arguments;
  UserFamilly({Key key, this.arguments}) : super(key: key);

  @override
  _UserFamillyState createState() => _UserFamillyState();
}

class _UserFamillyState extends State<UserFamilly> {
  

  deleteFamily([family]){
    
    confirm(context,msg: "是否删除？", ok: () async {
        try{
          var data = await NetHttp.post("/api/app/owner/user/delBrother",context: context, params: {
            "assetsId": widget.arguments["houseId"].toString(),
            "assetsType": "house",
            "linkId": family["id"].toString(),
          });
          if(data != null){
            showToast("删除成功！");
            StoreProvider.of<IndexState>(context)
            .dispatch( getFamilys(context, 
              params: {"assetsId":  widget.arguments["houseId"], "assetsType": "house" }));
          }
        }catch(e){
          print(e);
        }
    });
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: MyHeader(
        title: Text("家庭成员"),
        actions: FlatButton(
          child: Text("添加成员", style: TextStyle(color: Theme.of(context).primaryColor ),),
          onPressed: (){
            Navigator.of(context).pushNamed("/user/family/add", arguments: widget.arguments);
          },
        ),
      ),
      body: StoreConnector<IndexState, UserState>(
        onInit: (Store store){
          store.dispatch( getFamilys(context, params: {"assetsId":  widget.arguments["houseId"], "assetsType": "house" }));
        },
        converter: (Store store) => store.state.user,
        builder: (context, state){
          return ListView.separated(
            itemBuilder: (context, int index){
              return Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.only(left: 20),
                      child: Row(
                        children: <Widget>[
                          Icon(IconData(0xe620, fontFamily: 'AntdIcons'), color: Color(0xFF999999), size: 20.0,),
                          Container(
                            padding: EdgeInsets.only(left: 10),
                            child: Text(state.family[index]["name"]),
                          )
                        ],
                      ),
                    ),
                    Container(
                      child:state.family[index]["delPower"]==1? FlatButton(
                        onPressed: (){
                          deleteFamily(state.family[index]);
                        }, 
                        child: Icon(Icons.delete_outline, color: Color(0xFF777777)) ):Text(""),
                    )
                  ],
                ),
              );
            }, 
            separatorBuilder: (context, index){
              return Container(height: 1.0, color: Color(0xFFeeeeee));
            }, 
            itemCount: state.family.length
          );
        }
      ),
    );
  }
}