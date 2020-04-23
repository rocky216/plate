import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../pages/users/Login.dart';
import 'tabs/Home.dart';
import 'tabs/Wisdom.dart';
import 'tabs/User.dart';

class IndexPage extends StatefulWidget {
  IndexPage({Key key}) : super(key: key);

  @override
  _IndexPageState createState() => _IndexPageState();
}

class _IndexPageState extends State<IndexPage> {
  int _index = 0;

  List tabs = [HomePagge(), WisdomPage(), UserPage()];

  @override
  void initState() { 
    super.initState();
    this.getToken();
  }

 getToken () async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    
    String userInfo = prefs.getString("userInfo");
    
    if(userInfo=="null" || userInfo==null || userInfo.isEmpty){
      Navigator.pushAndRemoveUntil(
        context,
        new MaterialPageRoute(builder: (context) => new LoginPage()),
        (route) => route == null,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: tabs[this._index],
      floatingActionButton: Container(
        width: 50.0,
        height: 50.0,
        padding: EdgeInsets.all(5),
        margin: EdgeInsets.only(top: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          color: Colors.white,
        ),
        
        child: FloatingActionButton(
          child: Icon(IconData(0xe634, fontFamily: "AntdIcons")),
          // backgroundColor: Theme.of(context).primaryColor,
          onPressed: (){
            
            setState(() {
              this._index = 1;
            });
          }
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomNavigationBar(
        // backgroundColor: Theme.of(context).primaryColor,
        selectedItemColor: Colors.blue,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.home), title: Text("首页")),
          BottomNavigationBarItem(icon: Icon(IconData(0xe634, fontFamily: "AntdIcons")), title: Text("智慧生活")),
          BottomNavigationBarItem(icon: Icon(Icons.person), title: Text("我的")),
        ],
        currentIndex: this._index,
        onTap: (index) async {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          print(prefs.getString("userInfo"));
          setState(() {
            this._index = index;
          });
        },
      ),
    );
  }
}