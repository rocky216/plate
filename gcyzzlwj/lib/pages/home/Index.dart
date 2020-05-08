import 'package:flutter/material.dart';
import '../utils.dart';
import './HomeSwiper.dart';
import '../../components/MyScrollView.dart';
import '../http.dart';
import './HomeProperty.dart';
import './HomeNotice.dart';
import './AddService.dart';
import './HomeRepair.dart';
import './HomePassRecord.dart';
import './HomeDrawer.dart';
import '../../components/MyHeader.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Object> banners = [];
  List notices = [];
  String title = "";
  List repairList = [];
  List passList = [];

  @override
  void initState() { 
    super.initState();
    this.initail();
  }
  initail() async {
    var userInfo = await getUserInfo();
    if(userInfo is Map && userInfo!=null){
      setState(() {
        this.title = userInfo["he"]!=null?userInfo["he"]["name"]:"";
      });
    }
    var data = await NetHttp.getRequest("/api/app/owner/common/indexInfo", context:context, params: {});
    if (data != null) {
      setState(() {
        this.banners = data["banner"];
        this.notices = data["notice"];
        this.repairList = data["repair"];
        this.passList = data["record"];
      });
    }
    
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        leading: Builder(builder: (context){
          return Container(
              width: 60.0,
              child: FlatButton(
                child: Icon(Icons.dehaze),
                onPressed: (){
                  Scaffold.of(context).openDrawer();
                },
              ),
            );
        },),
        title: Text(this.title),
      ),
      body: MyScrollView(
        child: Column(
          children: <Widget>[
            this.banners.isNotEmpty? HomeSwiper(banners: this.banners):Text(""),
            HomeProperty(),
            this.notices.isNotEmpty?HomeNotice(notices: this.notices):Text(""),
            AddService(),
            HomeRepair(dataList: this.repairList,),
            HomePassRecord(dataList: this.passList,)
          ],
        ),
      ),
      drawer: Drawer(child: HomeDrawer(callback: (){
        this.initail();
      })),
    );
  }
}