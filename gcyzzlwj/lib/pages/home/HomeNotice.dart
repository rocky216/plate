import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import '../../redux/exports.dart';

class HomeNotice extends StatelessWidget {
  List notices = [];
  HomeNotice({Key key, this.notices}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreConnector<IndexState, Map>(
      converter: (store)=>store.state.app.home,
      builder: (context, home){
        return Container(
          margin: EdgeInsets.only(top: 5.0),
          padding: EdgeInsets.only(left: 10.0),
          height: 30.0,
          decoration: BoxDecoration(color: Colors.white),
          child: Row(
            children: <Widget>[
              Icon(IconData(0xe6ee, fontFamily: 'AntdIcons'), color: Color(0xFFf59a50), size: 16.0,),
              home!=null && home["notice"].isNotEmpty ? 
              Container(
                width: 300,
                child: Swiper(
                  itemBuilder: (BuildContext context, int index){
                    return Container(
                      padding: EdgeInsets.only(left: 10.0),
                      alignment: Alignment.centerLeft,
                      child: Text(home["notice"][index]["title"], 
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(color: Color(0xFFf59a50), fontSize: 14.0),),
                    );
                  },
                  autoplay: true,
                  itemCount: home["notice"].length,
                  scrollDirection: Axis.vertical
                ),
              ):Text("暂无公告", style: TextStyle(fontSize: 12, color: Color(0xFF666666)),)
            ],
          ),
        );
      },
    );
  }
}