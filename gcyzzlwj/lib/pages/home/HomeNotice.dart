import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class HomeNotice extends StatelessWidget {
  List notices = [];
  HomeNotice({Key key, this.notices}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 5.0),
      padding: EdgeInsets.only(left: 10.0),
      height: 30.0,
      decoration: BoxDecoration(color: Colors.white),
      child: Row(
        children: <Widget>[
          Icon(IconData(0xe6ee, fontFamily: 'AntdIcons'), color: Color(0xFFf59a50), size: 16.0,),
          Container(
            width: 300,
            child: Swiper(
              itemBuilder: (BuildContext context, int index){
                return Container(
                  padding: EdgeInsets.only(left: 10.0),
                  alignment: Alignment.centerLeft,
                  child: Text(this.notices[index]["title"], 
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(color: Color(0xFFf59a50), fontSize: 14.0),),
                );
              },
              autoplay: true,
              itemCount: this.notices.length,
              scrollDirection: Axis.vertical
            ),
          )
        ],
      ),
    );
  }
}