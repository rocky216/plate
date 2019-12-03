import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Icon } from "antd";
import {editHeHousingEstate, getHeHousingEstate} from "@/actions/projectAction"
import "./index.less"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EditItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      files: [],
      file: ''
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        console.log(values)
        let attaId = values.attaId && values.attaId.length ?values.attaId[0]["url"]?'':values.attaId[0]["response"]["data"]["attaId"]:''
        this.props.actions.editHeHousingEstate({
          ...values,
          id: this.props.detail.id,
          attaId: this.state.file.attaId
        }, res=>{
          this.props.actions.getHeHousingEstate({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }
  componentWillReceiveProps(nextProps){
    
    if(nextProps.detail.heUrl&&!this.state.file){
      this.setState({file: {
        attaId: '',
        url: nextProps.detail.heUrl
      }})
    }
    if(!nextProps.detail){
      this.setState({file: ''})
    }
  }

  upLoadChange(info){
    if (Array.isArray(info)) {
      return info;
    }
    if(info.file.status == "done"){
      
      this.setState({
        file: info.file.response.data
      })
    }
    
    
    return info && info.fileList;
    
  }
  handlenBeforeUpload(){
  
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handlenRemove(info){
    
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail, commonFiles} = this.props
    const {file} = this.state
    

    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="项目名称" hasFeedback>
            {getFieldDecorator("name", {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '填写项目名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="项目编号" hasFeedback>
            {getFieldDecorator("code", {
              initialValue: detail.code,
              rules: [
                {
                  required: true,
                  message: '填写项目编号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="项目图片" >
            {getFieldDecorator("attaId", {
              initialValue: detail.heUrl?[{
                uid: '-2',
                name: 'image.png',
                status: 'uploading',
                url: detail.heUrl,
              }]:[],
              valuePropName: 'fileList',
              getValueFromEvent: this.upLoadChange.bind(this)
            })(
              <Upload 
                name="file" 
                showUploadList={false}
                beforeUpload={this.handlenBeforeUpload.bind(this)}
                action={`${commonFiles?commonFiles.resourceServerAddress:''}common/${this.props.utils.getCookie("token")}`} listType="picture">
                
                {file?<img style={{width: 100}} src={file.url} />:<div className="itemEditUpload"><Icon type="upload" /></div>}
              </Upload>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editHeHousingEstate, getHeHousingEstate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditItem))