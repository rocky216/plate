import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Icon, Upload} from "antd";
import {addAttaMobileInfo, getMobileInfoList} from "@/actions/systemAction"
import UploadFile from "@/components/UploadFile"

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

class AddAdv extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      if(!err){
        this.props.actions.addAttaMobileInfo({
          ...values,
          typeId: this.props.match.params.id,
          attaUrl: values.attaUrl?values.attaUrl[0]["url"]:"" 
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getMobileInfoList({typeId: this.props.match.params.id,})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator, setFieldsValue} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles} = this.props
    
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
          <Form.Item label="资源名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '资源名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="附件" >
            {getFieldDecorator('attaUrl', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileSingle,
              rules: [
                {
                  required: true,
                  message: '附件!',
                }
              ],
            })(
              <Upload 
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                name="file"
                data={{fileType:"photo", fileSize: 1024*10}}>
                <Button><Icon type="upload" /></Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="资源指向url" hasFeedback>
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: '资源指向url!',
                }
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addAttaMobileInfo, getMobileInfoList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddAdv)) )