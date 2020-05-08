
import 'dart:convert' as convert;
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_image/flutter_native_image.dart';
import '../pages/utils.dart';
import 'package:image_picker/image_picker.dart';
import '../config/index.dart';



class MyUplaod extends StatefulWidget {
  final child;
  final callback;
  MyUplaod({Key key, this.child, this.callback}) : super(key: key);

  @override
  _MyUplaodState createState() => _MyUplaodState();
}

class _MyUplaodState extends State<MyUplaod> {

  uploadImg(String type) async {
    try{
      var image;
      if(type=="image"){
        image = await ImagePicker.pickImage(source: ImageSource.gallery);
      }else{
        image = await ImagePicker.pickImage(source: ImageSource.camera);
      }
      var path = image.path;
      var name = path.substring(path.lastIndexOf("/") + 1, path.length);
      // File croppedFile = await FlutterNativeImage.cropImage(path, 10, 10, 100, 100);

      //获取图片属性
      ImageProperties properties = await FlutterNativeImage.getImageProperties(path);
      File compressedFile = await FlutterNativeImage.compressImage(path, quality: 80, 
      targetWidth: 600, targetHeight: (properties.height * 600 / properties.width).round());

      FormData formData = new FormData.from({
        "fileSize": 1024*10,
        "fileType": "photo",
        "file": new UploadFileInfo(compressedFile, name) //Image.file(image) new File(path)
      });
      Dio dio = new Dio();
      var respone = await dio.post<String>(baseUrlResource+"/resource/file/uploadFile", data: formData);
      print(respone);
      if(respone != null){
        var data = convert.jsonDecode(respone.data);
        
        if(data["code"]==0){
          if(widget.callback != null){
            widget.callback(data["data"]);
          }
        }else{
          showToast(data["msg"]);
        }
      }
    }catch(err){}
    
  }
  @override
  void initState() { 
    super.initState();
    
  }

  

  @override
  Widget build(BuildContext context) {
    return Container(
       child: GestureDetector(
         child: widget.child,
         onTap: (){
          
          showDialog(
            context: context,
            builder: (BuildContext context){
              return new SimpleDialog(
                children: <Widget>[
                  SimpleDialogOption(
                    child: Text("拍照"),
                    onPressed: (){
                      this.uploadImg("camera");
                      Navigator.of(context).pop();
                    },
                  ),
                  SimpleDialogOption(
                    child: Text("相册"),
                    onPressed: (){
                      this.uploadImg("image");
                      Navigator.of(context).pop();
                    },
                  )
                ],
              );
            }
          );
         },
       ),
    );
  }
}