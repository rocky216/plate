import 'package:flutter/material.dart';
import '../pages/Test.dart';
import '../pages/index.dart';
import '../pages/users/Login.dart';
import '../pages/users/Register.dart';
import '../pages/users/Statement.dart';


final routes={
      '/test':(context)=>TestPage(),
      '/':(context)=>IndexPage(),
      '/login': (context)=>LoginPage(),
      '/register': (context)=>RegisterPage(),
      '/statement': (context)=>StatementPage()
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