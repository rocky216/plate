import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../components/MyHeader.dart';
import '../../components/MyList.dart';


class ContactPage extends StatefulWidget {
  ContactPage({Key key}) : super(key: key);

  @override
  _ContactPageState createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyHeader(
        title: Text("呼叫物业"),
      ),
      body: MyList(
        url: "/api/app/he/link/",
        itemBuilder: (dataList, index){
          return GestureDetector(
            child: ListTile(
              leading: ClipOval(
                  child: dataList[index]["headUrl"]==""? Container(
                  width: 50.0, 
                  height: 50.0,
                  decoration: BoxDecoration(color: Colors.grey),
                  child: Icon(Icons.person, color: Colors.white, size: 30.0,),
                ):Image.network(dataList[index]["headUrl"],width: 50.0, height: 50.0, fit: BoxFit.fill),
              ),
              title: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(dataList[index]["name"]),
                  // Text(dataList[index]["info"]),
                ],
              ),
            ),
            onTap: () async {
              var url = "tel:${dataList[index]["info"]}";
              if (await canLaunch(url)) {
                await launch(url);
              } else {
                throw 'Could not launch $url';
              }
            },
          );
        },
      ),
    );
  }
}