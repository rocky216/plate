import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Icon, Switch, InputNumber} from "antd";
import {addHeLinkMan, getHeLinkMan} from "@/actions/projectAction"

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

class AddItemConact extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addHeLinkMan({
          ...values,
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
          <Form.Item label="联系人头像" >
            {getFieldDecorator('attaUrl', {
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
              rules: [
                {
                  required: true,
                  message: '联系人!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="联系人电话" hasFeedback>
            {getFieldDecorator('info', {
              rules: [
                {
                  required: true,
                  message: '联系人电话!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="状态" >
            {getFieldDecorator('status', {
              initialValue: true,
              valuePropName: "checked"
            })(<Switch />)}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark', {
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addHeLinkMan, getHeLinkMan}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddItemConact)) )