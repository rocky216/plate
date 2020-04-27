import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Icon, Switch, InputNumber} from "antd";
import {editHeLinkMan, getHeLinkMan} from "@/actions/projectAction"

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

class EditItemConact extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editHeLinkMan({
          ...values,
          id: this.props.detail.id,
          heId: this.props.match.params.id,
          status: values.status?"0":"1",
          attaUrl: values.attaUrl?values.attaUrl[0]["url"]:""
        }, res=>{
          this.props.actions.getHeLinkMan({heId: this.props.match.params.id})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles, detail} = this.props
    

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
          <Form.Item label="联系人头像" >
            {getFieldDecorator('attaUrl', {
              initialValue: detail.headUrl?[{url: detail.headUrl, uid: 1, name: detail.name}]:null,
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileSingle,
            })(
              <Upload 
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                name="file"
                data={{fileType:"photo", fileSize: 1024*10}}>
                <Button><Icon type="upload" /></Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="联系人" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '联系人!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="联系人电话" hasFeedback>
            {getFieldDecorator('info', {
              initialValue: detail.info,
              rules: [
                {
                  required: true,
                  message: '联系人电话!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="状态" >
            {getFieldDecorator('status', {
              initialValue: detail.status=="0"?true:false,
              initialValue: true,
              valuePropName: "checked"
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark', {
              initialValue: detail.remark,
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editHeLinkMan, getHeLinkMan}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditItemConact)) )