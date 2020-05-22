import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Upload, Icon, Button, InputNumber} from "antd";
import {getCompanyInfo, updateCompanyInfo} from "@/actions/baseAction"
import JCard from "@/components/JCard"

const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};


class BaseCompany extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: ""
    }
  }
  

  componentDidMount(){
    this.props.actions.getCompanyInfo({}, res=>this.setState({detail: res}))
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.actions.updateCompanyInfo({
          ...values,
          logoUrl: this.props.utils.submitFiles(values.logoUrl)
        }, res=>{
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, commonFiles} = this.props
    const {detail} = this.state
    

    return (
      <JCard spinning={spinning}>
        <Card extra={<Button type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>}>
          <Form {...formItemLayout}>
            <Form.Item label="公司名称" >
              {getFieldDecorator('name', {
                initialValue: detail.name,
                rules: [{required: true,message: '公司名称',}],
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="公司昵称" >
              {getFieldDecorator('nickname', {
                initialValue: detail.nickname,
                rules: [{required: true,message: '公司昵称',}],
              })(<Input  disabled />)}
            </Form.Item>
            <Form.Item label="公司简单描述" >
              {getFieldDecorator('info', {
                initialValue: detail.info,
                rules: [{required: true,message: '公司简单描述',}],
              })(<TextArea />)}
            </Form.Item>
            <Form.Item label="公司负责人名称" >
              {getFieldDecorator('headName', {
                initialValue: detail.headName,
                rules: [{required: true,message: '公司负责人名称',}],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="公司负责人电话" >
              {getFieldDecorator('headContactNumber', {
                initialValue: detail.headContactNumber,
                rules: [{required: true,message: '公司负责人电话',}],
              })(<InputNumber style={{width: "100%"}} />)}
            </Form.Item>
            <Form.Item label="公司logo" >
              {getFieldDecorator('logoUrl', {
                initialValue: detail.logoUrl?[{url: detail.logoUrl,
                  uid: 1, name: detail.name}]:[],
                valuePropName: 'fileList',
                getValueFromEvent: utils.normFileSingle,
                rules: [{required: true,message: '公司logo',}],
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
          </Form>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompanyInfo, updateCompanyInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    spinning: state.base.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(BaseCompany) )