import 'package:flutter/material.dart';
import './http.dart';
import './utils.dart';
import './users/Login.dart';
import './home/Index.dart';
import './users/Index.dart';
import './wisdom/Index.dart';
import '../components/MyScan.dart';

class IndexPage extends StatefulWidget {
  IndexPage({Key key}) : super(key: key);

  @override
  _IndexPageState createState() => _IndexPageState();
}

class _IndexPageState extends State<IndexPage> {
  final MyScan scan = MyScan();
  int _currentIndex = 0;
  List tabs = [HomePage(), WisdomPage(), UserPage()];


  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    // removeUserInfo();
    
    this.isAuth();
  }

  isAuth() async {
    var userInfo = await getUserInfo();
    
    if(userInfo == "null" || userInfo==null){
      Navigator.pushAndRemoveUntil(
        context,
        new MaterialPageRoute(builder: (context) => new LoginPage()),
        (route) => route == null,
      );
    }
   
  }

  activeColor(int key){
    return this._currentIndex==key?Theme.of(context).primaryColor:Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: tabs[this._currentIndex],
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: Container(
        width: 45.0,
        height: 45.0,
        child: MyScan(
          child: Container(
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.all(Radius.circular(23.0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey,
                  blurRadius: 3.0
                )
              ]),
            child: Icon(Icons.crop_free, color: Colors.grey),
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.white,
        shape: CircularNotchedRectangle(),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            Container(
              height: 45.0,
              child: FlatButton(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.home, color: this.activeColor(0),),
                    Text("首页", style: TextStyle(fontSize: 12.0, color: this.activeColor(0)))
                  ],
                ),
                onPressed: (){
                  setState(() {
                    this._currentIndex = 0;
                  });
                },
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 20.0),
              child: Text("扫一扫", style: TextStyle(color: Colors.grey, fontSize: 12.0),),
            ),
            Container(
              height: 40.0,
              child: FlatButton(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.person, color: this.activeColor(2)),
                    Text("我的", style: TextStyle(fontSize: 12.0, color: this.activeColor(2)))
                  ],
                ),
                onPressed: (){
                  setState(() {
                    this._currentIndex = 2;
                  });
                },
              ),
            ),
          ],
        ),
      ),
      // bottomNavigationBar: BottomNavigationBar(
      //   currentIndex: this._currentIndex,
      //   items: <BottomNavigationBarItem>[
      //     BottomNavigationBarItem(icon: Icon(Icons.home), title: Text("首页")),
      //     BottomNavigationBarItem(icon: Icon(IconData(0xe634, fontFamily: "AntdIcons")), title: Text("智慧生活")),
      //     BottomNavigationBarItem(icon: Icon(Icons.person), title: Text("我的")),
      //   ],
      //   onTap: (index){
      //     setState(() {
      //       this._currentIndex = index;
      //     });
      //   },
      // ),
    );
  }
}