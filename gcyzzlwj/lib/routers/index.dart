import 'package:flutter/material.dart';
import 'package:theme_provider/theme_provider.dart';
import '../pages/index.dart';
import '../pages/users/Login.dart';
import '../pages/govern/Index.dart';
import '../pages/govern/detail.dart';
import '../pages/dishall/Index.dart';
import '../pages/dishall/Detail.dart';
import '../pages/users/Statement.dart';
import '../pages/users/Register.dart';
import '../pages/vistor/Index.dart';
import '../pages/vistor/Vistor.dart';
import '../pages/control/Index.dart';
import '../pages/users/passcard/Index.dart';
import '../pages/users/ownerhouse/Index.dart';
import '../pages/users/updatepassword/Index.dart';
import '../pages/users/userinfo/Index.dart';
import '../pages/users/carpass/Index.dart';
import '../pages/users/controlpass/Index.dart';
import '../pages/clean/Index.dart';
import '../pages/users/clean/Index.dart';
import '../pages/plate/Index.dart';
import '../pages/pile/Index.dart';
import '../pages/clean/Detail.dart';
import '../pages/clean/Add.dart';
import '../pages/contact/Index.dart';
import '../pages/users/family/index.dart';
import '../pages/users/family/addFamily.dart';
import '../components/MyPay.dart';
import '../pages/inspect/detail.dart';



final routes={
      '/home':(context)=> ThemeConsumer(child: IndexPage(),) ,
      '/login':(context)=> ThemeConsumer(child: LoginPage(),) ,
      '/register':(context)=> ThemeConsumer(child: RegisterPage(),) ,
      '/statement':(context)=>ThemeConsumer(child: StatementPage(),),
      '/govern':(context)=> ThemeConsumer(child: GovernPage(),),
      '/govern/detial':(context,{arguments})=> ThemeConsumer(child: GovernDetailPage(arguments:arguments),) ,
      '/dishall':(context)=> ThemeConsumer(child: DisHallPage(),),
      '/dishall/detial':(context,{arguments})=>ThemeConsumer(child: DisHallDetailPage(arguments:arguments),),
      '/owner': (context)=>ThemeConsumer(child: OwnerPage(),),
      '/vistor': (context)=> ThemeConsumer(child: VistorPage()) ,
      '/control': (context)=>ThemeConsumer(child: ControlPage(),),
      '/user/passcard': (context)=>ThemeConsumer(child: PassCardPage(),),
      '/user/ownerhouse': (context)=>ThemeConsumer(child: OwnerHousePage(),),
      '/user/family': (context, {arguments})=>ThemeConsumer(child: UserFamilly(arguments:arguments),),
      '/user/family/add': (context, {arguments})=>ThemeConsumer(child: AddFamily(arguments:arguments),),
      '/user/updatepassword': (context)=>ThemeConsumer(child: UpdatePasswordPage(),),
      '/user/userinfo': (context, {arguments})=>ThemeConsumer(child: UserInfoPage(arguments:arguments),),
      '/user/carpass': (context)=>ThemeConsumer(child: CarPassPage(),),
      '/user/controlpass': (context)=>ThemeConsumer(child: ControlPassPage(),),
      '/clean': (context)=>ThemeConsumer(child: CleanPage(),),
      '/user/clean': (context)=>ThemeConsumer(child: UserCleanPage(),),
      '/plate': (context)=>ThemeConsumer(child: PlatePage(),),
      '/pile': (context)=>ThemeConsumer(child: PilePage(),),
      '/clean/detail': (context, {arguments})=>ThemeConsumer(child: CleanDetailPage(arguments:arguments),),
      '/clean/add': (context)=>ThemeConsumer(child: AddCleanPage(),),
      '/contact': (context)=>ThemeConsumer(child: ContactPage(),),
      '/pay': (context, {arguments})=>ThemeConsumer(child: MyWxPay(arguments:arguments),),
      '/inspect/detail': (context, {arguments})=>ThemeConsumer(child: InspectDetail(arguments:arguments),),
      // '/form':(context)=>FormPage(),'/search':(context,{arguments})=>SearchPage(arguments:arguments),
};

var onGenerateRoute = (RouteSettings settings){
  final String name = settings.name; 
  final Function pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    }else{
        final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context));
        return route;
    }
  }
};