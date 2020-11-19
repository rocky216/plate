/**
 * type: 判断是否为图片 img是， file文件
 * data: required 传给服务器参数 DataProps
      *  const uploadData = {
            resourceType: "0",
            fileType: "photo",
            linkType: "logo",
            fileSize: 10240,
            isFlag: 0
          }
  more 是否上传多个文件 default false
  fileList value对象 {url, uid, name}
 */

import React, { useEffect, useState } from "react"
import {Upload, Button, Form} from "antd"
import { connect } from "react-redux"
import {PlusOutlined, UploadOutlined, LoadingOutlined} from "@ant-design/icons"
import {IState, UtilsProps} from "@public/common/interface"
import "./index.less"
import _ from "lodash"

interface DataProps {
  companyCode?:any;
  fileType?:any;
  fileSize?:any;
  heCode?:any;
  resourceType:any;
  linkType?:any;
  userId?:any;
  isFlag?:any;
}

interface Props {
  data:DataProps;
  utils: UtilsProps;
  type?:string;
  onChange?:any;
  value?:any;
  more?:boolean;
}



const UploadElement:React.FC<Props> = ({
  data, utils, 
  type="image",
  onChange,
  value,
  more=false
})=>{
  const [loading, setLoading] = useState(false)

  const uploadButton = (
    <div>
      {loading?<LoadingOutlined/>:<PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const handleData = (arr:any[])=>{
    var newArr:any[] = [];
    _.each(arr, (item,index)=>{
      if(item.response && item.response.code == 1){
        const {dowloadHttpUrl, fileName, id} = item.response.data
        newArr.push({url: dowloadHttpUrl, name: fileName, uid: id })
      }else{
        newArr.push(item)
      }
    })
    
    return newArr;
  }

  const handleChange = (e:any)=>{
    setLoading(true)
    if (Array.isArray(e)) {
      return e;
    }
    if( onChange){
      if(!more && e.fileList && e.fileList.length>1){
        e.fileList = [e.fileList[e.fileList.length-1]]
      }
      let imgArr = handleData(e.fileList);
      onChange(imgArr)
      setLoading(false)
      return imgArr
    }
  }
  const handleRemove = (file:any)=>{
    let v = _.filter(value, o=>o.url!=file.url)
    onChange(v)
  }

  const UploadWrap = (
    <Upload
      action="/zlwj/api/resource/file/uploadFile"
      listType={type=="image"?"picture-card":"text"}
      name="file"
      fileList={ value || [] }
      onChange={handleChange}
      showUploadList={true}
      onRemove={handleRemove}
      data={{
        token: utils.getToken(),
        ...data,
      }}
    >

      {loading}
      {type=="image"?uploadButton:<Button size="small" icon={loading?<LoadingOutlined/>:<UploadOutlined />}>上传附件</Button>}
    </Upload>
  )

  return UploadWrap;
}
const mapStateToProps = (state:IState) => {
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateToProps)(UploadElement)