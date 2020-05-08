import 'dart:isolate';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'dart:async';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:io';

import 'package:progress_dialog/progress_dialog.dart';


var id;
var getstatus;

class MyDownLoad extends StatelessWidget {
  final Widget child;
  final String link;
  final callback;
  const MyDownLoad({Key key, this.child, this.link, this.callback}) : super(key: key);
  

  @override
  Widget build(BuildContext context) {
    final platform = Theme.of(context).platform;
    return Container(
      child: DownLoadFul(platform: platform, child: this.child, link: this.link, callback: this.callback),
    );
  }
}

class DownLoadFul extends StatefulWidget {
  final platform;
  final child;
  final link;
  final callback;
  
  
  DownLoadFul({Key key, this.platform, this.child, this.link, this.callback}) : super(key: key);

  @override
  _DownLoadFulState createState() => _DownLoadFulState();
}

class _DownLoadFulState extends State<DownLoadFul> {
  static ProgressDialog pr; 
  var taskId;
  String _localPath;
  int pNun=0;

  @override
  void initState() { 
    super.initState();
    pr = new ProgressDialog(context, showLogs: true);

    FlutterDownloader.registerCallback(downloadCallback);
    _prepare();
  }

  @override
  void dispose() {
    _unbindBackgroundIsolate();
    super.dispose();
    
  }

  void _unbindBackgroundIsolate() {
    IsolateNameServer.removePortNameMapping('downloader_send_port');
  }

  @override
  Widget build(BuildContext context) {
    return Container(
       child: GestureDetector(
         child: widget.child,
         onTap: () async {
           goProgress();
           await _checkPermission();
           await _requestDownload(_TaskInfo(link: widget.link));
          
           
         },
       ),
    );
  }

  


  Future<Null> _prepare() async {

    _localPath = (await _findLocalPath()) + Platform.pathSeparator + 'Download';

    final savedDir = Directory(_localPath);
    bool hasExisted = await savedDir.exists();
    if (!hasExisted) {
      savedDir.create();
    }

  }

  void _requestDownload(_TaskInfo task) async {
   id = task.taskId = await FlutterDownloader.enqueue(
      url: task.link,
      headers: {"auth": "test_for_sql_encoding"},
      savedDir: _localPath,
      showNotification: true,
      openFileFromNotification: true);
  }

 static void downloadCallback(String id, status, int progress) {
    // print("333333333333333333 ${status == DownloadTaskStatus(3)}  $progress");
    // if (!pr.isShowing()) {
    //   pr.show();
    // }
    
    if (status == DownloadTaskStatus(3)) {
      print(id);
    }
    
  }

  Future<String> _findLocalPath() async {
    final directory = widget.platform == TargetPlatform.android
        ? await getExternalStorageDirectory()
        : await getApplicationDocumentsDirectory();
    return directory.path;
  }

  //权限
  Future<bool> _checkPermission() async {
    if (widget.platform == TargetPlatform.android) {
      PermissionStatus permission = await PermissionHandler()
          .checkPermissionStatus(PermissionGroup.storage);
      if (permission != PermissionStatus.granted) {
        Map<PermissionGroup, PermissionStatus> permissions =
            await PermissionHandler()
                .requestPermissions([PermissionGroup.storage]);
        if (permissions[PermissionGroup.storage] == PermissionStatus.granted) {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
    return false;
  }

  static goProgress(){
    // pr.show();
    // pr.style(message: '下载中，请稍后…');
    // var duration = Duration(seconds: 1);
    // Timer.periodic(duration, (t){
    //   print(id);
      
    //   if(getstatus ==  DownloadTaskStatus(3) && id!=null){
    //     FlutterDownloader.open(taskId: id);
    //     t?.cancel();
    //   }
    // });
    
  }

}

class _TaskInfo {
  final String name;
  final String link;

  String taskId;
  int progress = 0;
  DownloadTaskStatus status = DownloadTaskStatus.undefined;

  _TaskInfo({this.name, this.link});
}