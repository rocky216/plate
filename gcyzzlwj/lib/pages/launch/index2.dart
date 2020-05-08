import 'dart:isolate';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'dart:async';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:io';
import '../../components/MyDownLoad.dart';

class LaunchPage extends StatefulWidget {
  final platform;
  LaunchPage({Key key, this.platform}) : super(key: key);

  @override
  _LaunchPageState createState() => _LaunchPageState();
}

class _LaunchPageState extends State<LaunchPage> {
  String _localPath;


  @override
  void initState() { 
    super.initState();
    // FlutterDownloader.registerCallback(downloadCallback);
    _prepare();
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("appbar"),
      ),
      body: Container(
        child: MyDownLoad(child: Text("下载"),link: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg',)
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
    task.taskId = await FlutterDownloader.enqueue(
        url: task.link,
        headers: {"auth": "test_for_sql_encoding"},
        savedDir: _localPath,
        showNotification: true,
        openFileFromNotification: true);
  }

  static void downloadCallback(
      String id, DownloadTaskStatus status, int progress) {
    print("1111111111111111");
  }

  Future<String> _findLocalPath() async {
    final directory = widget.platform == TargetPlatform.android
        ? await getExternalStorageDirectory()
        : await getApplicationDocumentsDirectory();
    return directory.path;
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