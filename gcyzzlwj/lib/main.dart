import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:gcyzzlwj/components/MyDownLoad.dart';
import 'package:theme_provider/theme_provider.dart';
import 'redux/state.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'pages/launch/Index.dart';
import 'routers/index.dart';
import 'redux/store.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
    var store = createStore();
    print(Theme.of(context).brightness  == Brightness.light);

    
    return ThemeProvider(
      // saveThemesOnChange: true,
      // loadThemeOnInit: true,
      onThemeChanged: (AppTheme a, AppTheme b){
        print(a);
        print(b);
      },
      themes: <AppTheme>[
        AppTheme.light(),
        AppTheme.dark(),
        customAppTheme(),
      ],

      child: AnnotatedRegion(
        value: SystemUiOverlayStyle.dark,
        child: FlutterEasyLoading(
          child: StoreProvider<IndexState>(
            store: store,
            child: MaterialApp( 
              title: '智联万家',
              theme: ThemeData(
                primarySwatch: Colors.blue,
              ),
              home: ThemeConsumer(
                child: Scaffold(
                  body: LaunchPage(),
                ),
              ),
              onGenerateRoute: onGenerateRoute 
            ),
          )
          
        )
        
      )
      
    );
    
    
  }
}



AppTheme customAppTheme() {
  return AppTheme(
    id: "custom_theme",
    description: "Custom Color Scheme",
    data: ThemeData(
      accentColor:  Colors.yellow,
      primaryColor: Colors.red,
      scaffoldBackgroundColor: Colors.yellow[200],
      buttonColor: Colors.amber,
      dialogBackgroundColor: Colors.yellow,
    ),
  );
}

