import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {fetch} from "@/utils"


class Discussion extends React.Component {
  
  

  async uploadFn (param){
    const {utils, commonFiles} = this.props
      const fd = new FormData()
      fd.append('file', param.file);
      const options = {
        url: `${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`,
        method: "formdata",
        data: fd
      }
      let data = await fetch(options)
      console.log(data)
      param.success({
        url: data
      })
      
  }

  render(){
    const {value, onChange, defaultValue} = this.props

    const editorProps={
      contentFormat: "html",
      // initialContent: "<p>asas</p>",
      defaultValue: BraftEditor.createEditorState(defaultValue),
      onChange(content){
        if(onChange)onChange(content.toHTML())
      },
      onRawChange(){
        console.log(arguments, "handleRawChange")
        // if(onChange)onChange(content.toHTML())
      },
      media: {
        allowPasteImage: true,
        image: true,
        video: true, 
        audio: true, 
        uploadFn: this.uploadFn.bind(this),
        validateFn: null, // 指定本地校验函数，说明见下文
        removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
        onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
        onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
        onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
      },
    }
    

    return (
      <div style={{border: "1px solid #ddd"}}>
        <BraftEditor  {...editorProps}/>
      </div>
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

export default connect(mapStateProps, mapDispatchProps)(Discussion)