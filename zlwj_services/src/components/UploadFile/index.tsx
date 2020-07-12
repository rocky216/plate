import React from "react"
import {connect} from "react-redux"
import { Upload } from "antd"

interface Props {
  children: any;
  args?: any;
  mytype: string;
  onChange?:(arg0:any)=>void;
  fileList?:any
}

const UploadFile: React.FC<Props> = function({
  children,
  mytype,
  onChange,
  fileList
}){
  return (
    <Upload
      name="file"
      action={`/api${mytype}/common/upload`}
      onChange={onChange}
      fileList={fileList}
    >
      {children}
    </Upload>
  )
}

const mapStateToProps = (state: any) => {
  return {
    mytype: state.app.mytype
  }
}

export default connect(mapStateToProps)(UploadFile);