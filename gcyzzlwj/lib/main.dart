import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import './pages/launch/Index.dart';
import './routers/index.dart';
import 'package:flutter_downloader/flutter_downloader.dart';



void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await FlutterDownloader.initialize();
  runApp(MyApp());
  if(Platform.isAndroid){
    
    SystemUiOverlayStyle systemUiOverlayStyle =
        SystemUiOverlayStyle(statusBarColor: Colors.white);
    SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
  }
}


class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    final platform = Theme.of(context).platform;
    return AnnotatedRegion(
      value: SystemUiOverlayStyle.dark,
      child: FlutterEasyLoading(
        child: MaterialApp(
          title: '智联万家',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: Scaffold(
            backgroundColor: Colors.white,
            body: LaunchPage(), 
          ),
          
          onGenerateRoute: onGenerateRoute
        ),
      ),
    );
  }
}