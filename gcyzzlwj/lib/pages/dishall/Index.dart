import 'package:flutter/material.dart';
import '../http.dart';
import '../../components/MyHeader.dart';
import '../../components/MyList.dart';


class DisHallPage extends StatefulWidget {
  DisHallPage({Key key}) : super(key: key);

  @override
  _DisHallPageState createState() => _DisHallPageState();
}

class _DisHallPageState extends State<DisHallPage> { 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("议事堂"),
      ),
      body: MyList(
        url: "/api/app/owner/theme/blobs/",
        itemBuilder: (dataList, index){
          List imgs = dataList[index]["contentUrl"];
            return GestureDetector(
              child: Container(
                padding: EdgeInsets.fromLTRB(5.0, 5.0, 5.0, 5.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.only(bottom: 5.0),
                      child: Text(dataList[index]["themeName"], style: TextStyle(fontWeight: FontWeight.w700)),
                    ),
                    Row(
                      children: imgs.map((f)=>(
                        Expanded(
                          child: Image.network(f, height: 100.0, fit: BoxFit.fill)
                        )
                      )).toList(),
                    ),
                    Text(dataList[index]["themeEndText"], maxLines: 2, overflow: TextOverflow.ellipsis, ),
                    Container(
                      margin: EdgeInsets.only(top: 5.0),
                      child: Text(dataList[index]["buildTime"], textAlign: TextAlign.right, 
                            style: TextStyle(color: Color(0xFF666666)),),
                    )
                  ],
                ),
              ),
              onTap: (){
                Navigator.of(context).pushNamed("/dishall/detial", arguments: dataList[index]);
              },
            );
        },
      ),
    );
  }
}







// class DisHallPage extends StatefulWidget {
//   DisHallPage({Key key}) : super(key: key);

//   @override
//   _DisHallPageState createState() => _DisHallPageState();
// }

// class _DisHallPageState extends State<DisHallPage> {
//   List dishallList=[];
//   int _current = 1;
//   List mylist=["1","2","3"];

//   @override
//   void initState() { 
//     super.initState();
//     this.initial(_current);
//   }

//   initial(current) async {
//     var data = await NetHttp.getRequest("/api/app/owner/theme/blobs/", context: context, params: {'current':current});
//     setState(() {
//       this.dishallList.addAll(data["list"]);
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: MyHeader(title: Text("议事堂"),),
//       body: RefreshIndicator(
//         onRefresh: () async {

//         },
//         child: ListView.separated(
//           itemBuilder: (context, index){
//             List imgs = this.dishallList[index]["contentUrl"];
//             return GestureDetector(
//               child: Container(
//                 padding: EdgeInsets.fromLTRB(5.0, 5.0, 5.0, 5.0),
//                 child: Column(
//                   crossAxisAlignment: CrossAxisAlignment.start,
//                   children: <Widget>[
//                     Container(
//                       margin: EdgeInsets.only(bottom: 5.0),
//                       child: Text(this.dishallList[index]["themeName"], style: TextStyle(fontWeight: FontWeight.w700)),
//                     ),
//                     Row(
//                       children: imgs.map((f)=>(
//                         Expanded(
//                           child: Image.network(f, height: 100.0, fit: BoxFit.fill)
//                         )
//                       )).toList(),
//                     ),
//                     Text(this.dishallList[index]["themeEndText"], maxLines: 2, overflow: TextOverflow.ellipsis, ),
//                     Container(
//                       margin: EdgeInsets.only(top: 5.0),
//                       child: Text(this.dishallList[index]["buildTime"], textAlign: TextAlign.right, 
//                             style: TextStyle(color: Color(0xFF666666)),),
//                     )
//                   ],
//                 ),
//               ),
//               onTap: (){
//                 Navigator.of(context).pushNamed("/dishall/detial", arguments: this.dishallList[index]);
//               },
//             );
//           }, 
//           separatorBuilder: (context, index){
//             return Container(height: 1.0 , color: Color(0xFFdddddd));
//           }, 
//           itemCount: this.dishallList.length
//         ),
//       ),
//     );
//   }
// }