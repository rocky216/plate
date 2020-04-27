import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, Upload, Icon, } from "antd";
import {initCompanyInfo, getCompany} from "@/actions/systemAction"

const {Option} = Select

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

class AddCompany extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      companyList: []
    }
  }

  componentDidMount(){
    
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.initCompanyInfo({
          ...values,
          logoAttaUrl: values.logoAttaUrl?values.logoAttaUrl[0]["url"]:""
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCompany({})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles} = this.props
    const {companyList} = this.state
    
    return (
      <Modal
        title="新增公司"
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="公司名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '公司名称!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="公司简称" hasFeedback>
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '公司简称!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="公司logo" >
            {getFieldDecorator('logoAttaUrl', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileSingle,
            })(
              <Upload
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                name="file"
                data={{fileType:"photo", fileSize: 1024*10}}
              >
                <Button><Icon type="upload" /></Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="小区名称" hasFeedback>
            {getFieldDecorator('initHeName', {
              rules: [
                {
                  required: true,
                  message: '小区名称!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="小区编号" hasFeedback>
            {getFieldDecorator('initHeCode', {
              rules: [
                {
                  required: true,
                  message: '小区编号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="管理员账号" hasFeedback>
            {getFieldDecorator('initAccount', {
              rules: [
                {
                  required: true,
                  message: '管理员账号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="管理员密码" hasFeedback>
            {getFieldDecorator('initPassword', {
              rules: [
                {
                  required: true,
                  message: '管理员密码!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({initCompanyInfo, getCompany}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddCompany))