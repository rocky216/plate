import 'package:flutter/material.dart';
import '../http.dart';
import '../../components/MyHeader.dart';
import '../../components/MyPullLoad.dart';

class GovernPage extends StatefulWidget {
  GovernPage({Key key, arguments}) : super(key: key);

  @override
  _GovernPageState createState() => _GovernPageState();
}

class _GovernPageState extends State<GovernPage> {
  ScrollController _scrollController = ScrollController();
  int _current = 1;
  List governList = [];
  bool bBtn=true;
  int sumPage = 1;
  @override
  void initState() { 
    super.initState();
    this.initial(this._current);
    this.getMore();
  }

  initial(current,{callback}) async {
    var data = await NetHttp.getRequest("/api/app/owner/government/", context: context, params: {"current":current,"pageSize":6});
    
    if(data != null){
      if(callback!=null){
        callback();
      }
      setState(() {
        this.governList.addAll(data["list"]);
        this.sumPage = data["sumPage"];
      });
    }
    
  }

  getMore() async {
    _scrollController.addListener((){
      if(this.bBtn==true && _scrollController.position.pixels == _scrollController.position.maxScrollExtent){
        
        if(this.sumPage == this._current) {
          setState(() {
            this.bBtn=false;
          });
          return;
        }
        this._current +=1;
        this.initial(this._current, callback: (){
          this.bBtn=true;
        });
      }
      
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(title: Text("政务公开"),),
      body: RefreshIndicator(
        displacement: 40.0,
        onRefresh:() async{
          this.governList.clear();
          this._current = 1;
          this.initial(this._current);
          setState(() {
            this._current = 1;
            this.bBtn = true;
          });
          return null;
        },
        child: ListView.separated(
          separatorBuilder: (BuildContext context, int index) {
            return new Container(height: 1.0, color: Color(0xFFdddddd));
          },
          itemBuilder:(context, index){
            if( index==this.governList.length){
              return MyPullLoad(dataList: this.governList, bBtn: this.bBtn,);
            }
            return GestureDetector(
              child: Container(
                padding: EdgeInsets.all(5.0),
                child: Row(children: <Widget>[
                  Image.network(this.governList[index]["cover"], height: 100.0, width: 100.0, fit: BoxFit.fill),
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.fromLTRB(10.0, 0, 0, 0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(this.governList[index]["title"], overflow: TextOverflow.ellipsis, maxLines: 2,
                            style: TextStyle(fontWeight: FontWeight.w700)),
                          Container(
                            child: Text(this.governList[index]["desc"], maxLines: 2, overflow: TextOverflow.ellipsis,
                              style: TextStyle(color: Color(0xFF666666)),),
                            margin: EdgeInsets.fromLTRB(0, 5.0, 0, 5.0),
                          ),
                          Text(this.governList[index]["buildTime"], style: TextStyle(color: Color(0xFF999999)))
                        ],
                      ),
                    ),
                  )
                ]),
              ),
              onTap: (){
                // Navigator.of(context).pushNamed("/govern/detial", arguments: this.governList[index]);
                Navigator.pushNamed(context, "/govern/detial", arguments: this.governList[index]);
              },
            );
          },
          itemCount: this.governList.length+1,
          controller: _scrollController,
        ),
      ),
    );
  }
}
