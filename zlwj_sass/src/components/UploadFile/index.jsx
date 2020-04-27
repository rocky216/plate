import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Upload, message, Icon} from "antd";
import "./index.less"


class UploadFile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  

  render(){
    let _this = this
    const {utils, fileType, value, fileList, onChange, many, commonFiles} = this.props
    
    // http://192.168.0.103:80
    const props = {
      action: `${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`,
      name:"file",
      // fileList: this.props["data-__meta"]["valuePropName"],

      showUploadList: many?true:false,
      data: {
        // token: this.props.utils.getCookie("token"),
        fileType: fileType?fileType:"photo",
        fileSize: 1024*10
      },
      onChange(info) {
        onChange( info )
        return
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // }
        if (info.file.status === 'done') {
          message.success("上传成功！");
          let url = info.file.response.data
          if(many){
            let arr = _.isArray(fileList)?fileList:[];
            let newArr= arr.concat([url])
            onChange( newArr )
          }else{
            
            // onChange( [url] )
            return info.file && info.fileList
          }
          
          
        } else if (info.file.status === 'error') {
          message.error(`上传失败`);
          return;
        }
      },
      onRemove(file){
        let url = file.response?file.response.data:""
        if(many){
          let arr = _.remove(fileList, o=>o!=url)
          onChange( arr )
        }else{
          onChange( undefined )
        }
        
      }
      
    }

    const uploadButton = (fileList?<img src={fileList} style={{width: 128, height: 128}}/>:
      <div className="UploadFileBox" style={{width: 128, height: 128, border: "1px dashed #d9d9d9"}}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} style={{marginTop: 40, fontSize: 20, color: "#666"}} />
        <div >上传</div>
      </div>
    );
    

    return (
      <Upload {...props} value={value}>
        {many?this.props.children:uploadButton}
      </Upload>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(UploadFile)