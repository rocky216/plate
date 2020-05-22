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
import '../../redux/exports.dart';




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
  }

  @override
  Widget build(BuildContext context) {
    return StoreConnector<IndexState, AppState>(
      onInit: (store){
        if(store.state.app.home == null){
          store.dispatch( getHomeInfoFetch(context) );
        }
        if(store.state.app.user == null){
          store.dispatch( getUserInfoFetch(context) );
        }
      },
      converter: (store)=>store.state.app,
      builder: (context, state){
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
                HomeSwiper(),
                // this.banners.isNotEmpty? HomeSwiper(banners: this.banners):Text(""),
                HomeProperty(),
                HomeNotice(),
                // this.notices.isNotEmpty?HomeNotice(notices: this.notices):Text(""),
                AddService(),
                HomeRepair(dataList: state.home!=null?state.home["repair"]:[],),
                HomePassRecord(dataList: state.home!=null?state.home["record"]:[],)
              ],
            ),
          ),
          drawer: Drawer(child: HomeDrawer(callback: (){
            this.initail();
          })),
        );
      },
    );
  }
}