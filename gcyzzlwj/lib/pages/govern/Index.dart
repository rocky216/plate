import 'package:flutter/material.dart';
import 'package:gcyzzlwj/components/MyList.dart';
import '../../components/MyHeader.dart';


class GovernPage extends StatefulWidget {
  GovernPage({Key key, arguments}) : super(key: key);

  @override
  _GovernPageState createState() => _GovernPageState();
}

class _GovernPageState extends State<GovernPage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(title: Text("政务公开"),),
      body: MyList(
        url: "/api/app/owner/government/",
        itemBuilder: (dataList, index){
          return GestureDetector(
            child: Container(
              padding: EdgeInsets.all(5.0),
              child: Row(children: <Widget>[
                Image.network(dataList[index]["cover"], height: 100.0, width: 100.0, fit: BoxFit.fill),
                Expanded(
                  child: Container(
                    padding: EdgeInsets.fromLTRB(10.0, 0, 0, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(dataList[index]["title"], overflow: TextOverflow.ellipsis, maxLines: 2,
                          style: TextStyle(fontWeight: FontWeight.w700)),
                        Container(
                          child: Text(dataList[index]["desc"], maxLines: 2, overflow: TextOverflow.ellipsis,
                            style: TextStyle(color: Color(0xFF666666)),),
                          margin: EdgeInsets.fromLTRB(0, 5.0, 0, 5.0),
                        ),
                        Text(dataList[index]["buildTime"], style: TextStyle(color: Color(0xFF999999)))
                      ],
                    ),
                  ),
                )
              ]),
            ),
            onTap: (){
              // Navigator.of(context).pushNamed("/govern/detial", arguments: this.governList[index]);
              Navigator.pushNamed(context, "/govern/detial", arguments: dataList[index]);
            },
          );
        },
      )
    );
  }
}
