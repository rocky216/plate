import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Button, Icon, Upload} from "antd";
import BraftEditor from "@/components/BraftEditor"
import {getGovernDetail, editGovern} from "@/actions/otherAction"
import JCard from "@/components/JCard"

const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddGovern extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: "",
      info: "",
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getGovernDetail({
      id: this.props.match.params.id
    }, res=>{
      console.log(res, "res")
      this.setState({detail: res, info: {
        url: res.cover,
        dataId: ""
      }, content: res.content})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        if(!this.state.info.url) {
          this.props.utils.OpenNotification("error", "展示图片不能为空！")
          return 
        }

        if(!this.state.content) {
          this.props.utils.OpenNotification("error", "内容不能为空！")
          return 
        }
        this.props.actions.editGovern({
          ...values,
          content: this.state.content,
          attaUrl: this.props.utils.submitFiles(values.attaUrl),
          id: this.props.match.params.id
        }, res=>{
          this.props.history.push("/other/govern")
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  handlenUpload(e){
    if(e.file.status=="done"){
      this.setState({info: e.file.response.data})
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, commonFiles, spinning} = this.props
    const {info, detail, content} = this.state
    console.log(info)
    return (
      <JCard spinning={spinning}>
        <Card extra={(
        <div>
          <Button onClick={this.handlenSubmit.bind(this)} className="mgr10" type="primary" ><Icon type="save" />保存</Button>
          <Link to="/other/govern"><Button><Icon type="rollback" />返回</Button></Link>
        </div>
      )}>
        <Form {...formItemLayout} >
          <Form.Item label="标题" hasFeedback>
            {getFieldDecorator('title', {
              initialValue: detail.title,
              rules: [
                {
                  required: true,
                  message: '填写标题!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="简介" hasFeedback>
            {getFieldDecorator('desc', {
              initialValue: detail.desc,
              rules: [
                {
                  required: true,
                  message: '填写简介!',
                }
              ],
            })(<TextArea autoSize={{minRows: 3}} />)}
          </Form.Item>
          <Form.Item label="展示图片" >
            {getFieldDecorator('attaUrl', {
              initialValue: detail.cover?[{url: detail.url, uid: 1, name: detail.title}]:null,
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileSingle,
              rules: [
                {
                  required: true,
                  message: '展示图片!',
                }
              ],
            })(
              <Upload
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`}
                name="file"
              >
                <Button><Icon type="upload" />上传图片</Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="内容" hasFeedback>
            {content?<BraftEditor defaultValue={content} onChange={val=>this.setState({content: val})}/>:null}
          </Form.Item>
        </Form>
      </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getGovernDetail, editGovern}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning:state.other.spinning,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddGovern) )