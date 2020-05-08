import React from "react"
import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Upload, Icon  } from "antd";
import {addAppApk, getAppApk} from "@/actions/systemAction"

const {TextArea} = Input

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

class AddApkSystem extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addAppApk({
          ...values,
          attaUrl: this.props.utils.submitFiles(values.attaUrl)
        }, res=>{
          this.props.actions.getAppApk({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
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
          <Form.Item label="名称" hasFeedback>
            {getFieldDecorator('appName', {
              rules: [
                {
                  required: true,
                  message: '名称!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="版本号" hasFeedback>
            {getFieldDecorator('versionNo', {
              rules: [
                {
                  required: true,
                  message: '版本号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="apk" >
            {getFieldDecorator('attaUrl', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileSingle,
              rules: [
                {
                  required: true,
                  message: '版本号!',
                }
              ],
            })(
              <Upload 
                accept=".apk"
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                name="file"
                data={{fileType:"apk", fileSize: 1024*150}}>
                <Button><Icon type="upload" /></Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('versionInfo', {
              rules: [
                {
                  required: true,
                  message: '备注!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addAppApk, getAppApk}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddApkSystem)) )