import 'package:flutter/material.dart';
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



final routes={
      '/home':(context)=>IndexPage(),
      '/login':(context)=>LoginPage(),
      '/register':(context)=>RegisterPage(),
      '/statement':(context)=>StatementPage(),
      '/govern':(context)=>GovernPage(),
      '/govern/detial':(context,{arguments})=>GovernDetailPage(arguments:arguments),
      '/dishall':(context)=>DisHallPage(),
      '/dishall/detial':(context,{arguments})=>DisHallDetailPage(arguments:arguments),
      '/owner': (context)=>OwnerPage(),
      '/vistor': (context)=>VistorPage(),
      '/control': (context)=>ControlPage(),
      '/user/passcard': (context)=>PassCardPage(),
      '/user/ownerhouse': (context)=>OwnerHousePage(),
      '/user/family': (context, {arguments})=>UserFamilly(arguments:arguments),
      '/user/family/add': (context, {arguments})=>AddFamily(arguments:arguments),
      '/user/updatepassword': (context)=>UpdatePasswordPage(),
      '/user/userinfo': (context, {arguments})=>UserInfoPage(arguments:arguments),
      '/user/carpass': (context)=>CarPassPage(),
      '/user/controlpass': (context)=>ControlPassPage(),
      '/clean': (context)=>CleanPage(),
      '/user/clean': (context)=>UserCleanPage(),
      '/plate': (context)=>PlatePage(),
      '/pile': (context)=>PilePage(),
      '/clean/detail': (context, {arguments})=>CleanDetailPage(arguments:arguments),
      '/clean/add': (context)=>AddCleanPage(),
      '/contact': (context)=>ContactPage(),
      '/pay': (context, {arguments})=>MyWxPay(arguments:arguments),
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