import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import '../../components/MyCard.dart';


class HomePagge extends StatefulWidget {
  HomePagge({Key key}) : super(key: key);

  @override
  _HomePaggeState createState() => _HomePaggeState();
}

class _HomePaggeState extends State<HomePagge> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(
        brightness: Brightness.light,
      title: Text("金庐名居"),
      actions: <Widget>[
        Container(
          child: FlatButton(child: Icon(Icons.crop_free),
          onPressed: (){
            
          }),
        )
      ],
      leading: Builder(
        builder: (context)=>FlatButton(
          child: Icon(Icons.dehaze),
          onPressed: (){
            Scaffold.of(context).openDrawer();
          },
        )),
      ),
      body: Scrollbar(
        child: SingleChildScrollView(
          child: Container(
            decoration: BoxDecoration(color: Color(0xFFdddddd)),
            child: Column(children: <Widget>[
            Container(
              child: AspectRatio(aspectRatio: 16/7,
                child: HomeSwiper(),
              ),
            ),
            HomeFourPalace(),
            HomeNotice(),
            AddService(),
            HomeRepair(),
            HomePassRecord()
          ]),
          ),
        ),
      ),
      drawer: Drawer(
        child: HomeDrawer(),
      ),
    );
  }
}

//通行记录
class HomePassRecord extends StatefulWidget {
  HomePassRecord({Key key}) : super(key: key);

  @override
  _HomePassRecordState createState() => _HomePassRecordState();
}

class _HomePassRecordState extends State<HomePassRecord> {

  List<Map> PassList = [
    {"title":"asas"},
    {"title":"asas"},
    {"title":"asas"},
    {"title":"asas"},
    {"title":"asas"},
  ];


  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 5.0),
      alignment: Alignment.topLeft,
       child: MyCard(
        title: Text("通行记录"),
        extra: Text("更多"),
        child: Column(
          children: PassList.map((f)=>
            Container(
              padding: EdgeInsets.fromLTRB(0, 5.0, 0, 5.0),
              decoration: BoxDecoration(border: Border(bottom: BorderSide(width: 1.0, color: Color(0xFFdddddd)))),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text("赣D888888（进）"),
                  Text("2020-02-08 07:39:37")
                ],
              ),
            )
          ).toList()
        ),
      ),
    );
  }
}

//维修记录
class HomeRepair extends StatelessWidget {
  const HomeRepair({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(top: 5.0),
        child: MyCard(
          title: Text("维修记录"), extra: Text("更多"),
          child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,  
          children: <Widget>[
            Container(
              padding: EdgeInsets.only(bottom: 8.0),
              decoration: BoxDecoration(border: Border(bottom: BorderSide(width: 1.0, color: Color(0xFFdddddd)))),
              child: Row(
                mainAxisSize: MainAxisSize.max,
                children: <Widget>[
                Image.network("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg",
                width: 80.0, height: 80.0, fit: BoxFit.fill),
                Container(
                  margin: EdgeInsets.only(left: 10.0),
                  width: MediaQuery.of(context).size.width-120,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                    Container(
                      margin: EdgeInsets.only(bottom: 5.0),
                      child: Text("1栋101r马桶坏了", maxLines: 1, overflow: TextOverflow.ellipsis, 
                      style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w700),)
                    ),
                    Container(
                      margin: EdgeInsets.only(bottom: 5.0),
                      child: Text("马桶盖坏了，请物业人员来修理！", maxLines: 1, overflow: TextOverflow.ellipsis, 
                            style: TextStyle(color: Color(0xFF666666))),
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Container(
                              padding: EdgeInsets.fromLTRB(3.0, 0, 3.0, 0),
                              margin: EdgeInsets.only(right: 10.0),
                              decoration: BoxDecoration(color: Theme.of(context).primaryColor, borderRadius: BorderRadius.all( Radius.circular(3.0) )),
                              child: Text("已处理", style: TextStyle(color: Colors.white),),
                            ),
                            Text("肖斌"),
                          ],
                        ),
                        Text("2020-03-17", style: TextStyle(color: Color(0xFF999999)),),
                      ],
                    )
                  ],),
                )
              ],),
            )
          ],)
        ),
      );
  }
}

//增值业务
class AddService extends StatelessWidget {
  
  AddService({Key key}) : super(key: key);
  
  List serviceList = [
    {"title": "访客", "img": "images/visitor.png"},
    {"title": "门禁", "img": "images/control.png"},
    {"title": "充电桩", "img": "images/pile.png"},
    {"title": "车牌", "img": "images/plate.png"},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(0, 5.0, 0, 5.0),
      margin: EdgeInsets.only(top: 5.0),
      decoration: BoxDecoration(color: Colors.white),
      child: Wrap(
        children: serviceList.asMap().keys.map((f)=>
          Container(
            padding: EdgeInsets.fromLTRB(f%2==1?5.0:20.0, 5.0, f%2==1?20.0:5.0, 5.0),
            width: MediaQuery.of(context).size.width/2,
            child: GestureDetector(
                child: Image(image: AssetImage(serviceList[f]["img"]), fit: BoxFit.fitHeight),
                onTap: (){
                  print(f);
                }),
          ),
        ).toList()
      ),
    );
  }
}

//公告
class HomeNotice extends StatefulWidget {
  HomeNotice({Key key}) : super(key: key);

  @override
  _HomeNoticeState createState() => _HomeNoticeState();
}

class _HomeNoticeState extends State<HomeNotice> {
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
                  child: Text("我是一条滚动的公告$index", 
                          style: TextStyle(color: Color(0xFFf59a50), fontSize: 14.0),),
                );
              },
              autoplay: true,
              itemCount: 3,
              scrollDirection: Axis.vertical
            ),
          )
        ],
      ),
    );
  }
}

//四宫格
class HomeFourPalace extends StatelessWidget {

  List<Map> palaces = [
    {"title": "议事堂", "icon": 0xe631, "bgcolor": 0xFF628dc7},
    {"title": "政务公开", "icon": 0xe621, "bgcolor": 0xFFf4c200},
    {"title": "保洁维修", "icon": 0xe70e, "bgcolor": 0xFF3fb785},
    {"title": "呼叫物业", "icon": 0xe785, "bgcolor": 0xFFec6497},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10.0),
      decoration: BoxDecoration(color: Colors.white),
      child: Row(
        children:  this.palaces.map((f)=>(
          Expanded(
            child: FlatButton(
              child: Column(
                children: <Widget>[
                  Container(
                    width: 50.0,
                    height: 50.0,
                    decoration: BoxDecoration(
                      color: Color(f["bgcolor"]),
                      borderRadius: BorderRadius.all(Radius.circular(8.0))
                    ),
                    child: Icon(IconData(f["icon"], fontFamily: 'AntdIcons'), color: Colors.white,),
                  ),
                  
                  Text(f["title"], style: TextStyle(fontSize: 12),)
                ],
              ),
              onPressed: (){

              },
            )
          )
        )).toList(),
      ),
    );
  }
}

// 轮播图
class HomeSwiper extends StatefulWidget {
  HomeSwiper({Key key}) : super(key: key);

  @override
  _HomeSwiperState createState() => _HomeSwiperState();
}

class _HomeSwiperState extends State<HomeSwiper> {
  List<Map> images = [
    {"url":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4176816726,2568559965&fm=11&gp=0.jpg"},
    {"url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586256772124&di=1c66a5e4262f23b12f844fc039cf6c15&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fexp%2Fw%3D500%2Fsign%3Ddad3b861acaf2eddd4f149e9bd110102%2F35a85edf8db1cb13e58efa74dd54564e93584bf6.jpg"},
    {"url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586256835088&di=2a17cc3d4d331107bd72beb5840d6ab6&imgtype=0&src=http%3A%2F%2Fi3.3conline.com%2Fimages%2Fpiclib%2F201311%2F06%2Fbatch%2F1%2F201411%2F1383702277744slzhoiro3h_medium.jpg"},
  ];
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Colors.white),
      child: Container(
        margin: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 0),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Swiper(
            itemBuilder: (BuildContext context, int index){
              return Image.network(this.images[index]["url"],
                fit: BoxFit.fill,);
            },
            autoplay: true,
            itemCount: this.images.length,
            pagination: new SwiperPagination(alignment: Alignment.bottomRight, 
              builder: DotSwiperPaginationBuilder(size: 8)),
            
          )
        ),
      ),
    );
  }
}

//左侧抽屉
class HomeDrawer extends StatefulWidget {
  HomeDrawer({Key key}) : super(key: key);

  @override
  _HomeDrawerState createState() => _HomeDrawerState();
}

class _HomeDrawerState extends State<HomeDrawer> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: double.infinity,
            padding: EdgeInsets.fromLTRB(20.0, 80.0, 20.0, 30.0),
            decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                ClipOval(
                  child: Image.network(
                    "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg",
                    width: 60.0, 
                    height: 60.0,
                    fit: BoxFit.cover,
                  ),
                ),
                Padding(padding: EdgeInsets.fromLTRB(15.0, 5.0, 0, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text("张三", style: TextStyle(color: Colors.white, fontSize: 18.0),),
                      Text("17512099999", style: TextStyle(color: Colors.white, fontSize: 16.0),)
                    ]),
                )
              ],
            )
          ),
          Container(
            padding: EdgeInsets.fromLTRB(0, 20.0, 0, 0),
            child: Column(children: <Widget>[
              FlatButton(
                child: Text("金庐名居业主"),
                onPressed: (){

                },
              ),
              FlatButton(
                child: Text("梨山湖畔业主"),
                onPressed: (){
                  
                },
              ),
            ],),
          )
        ],
      ),
      
    );
  }
}

