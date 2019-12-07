import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Icon} from "antd";
import {addVoteOpt, getThemeOption} from "@/actions/otherAction"

const {TextArea } = Input

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

class AddVote extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      info:''
    }
  }

  handlenSubmit(){
    const {info} = this.state
    console.log(this.props)
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addVoteOpt({
          ...values,
          attaId: info?info.attaId: '',
          themeId: this.props.match.params.id,
        }, res=>{
          this.props.actions.getThemeOption({current: 1, themeId: this.props.match.params.id})
          this.props.onCancel()
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
    const {spinning, visible, onCancel, commonFiles} = this.props
    const {info } = this.state

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
          <Form.Item label="头像" hasFeedback>
            <div>
              <Upload
                showUploadList={false}
                action={`${commonFiles?commonFiles.resourceServerAddress:''}common/${this.props.utils.getCookie("token")}`}
                name="file"
                onChange={this.handlenUpload.bind(this)}
              >
                <Button><Icon type="upload" />上传图片</Button>
              </Upload>
              <div>
                {info?<img src={info.url} style={{width: 120}} />:null}
              </div>
            </div>
          </Form.Item>
          <Form.Item label="名称" hasFeedback>
            {getFieldDecorator('optionsName', {
              rules: [
                {
                  required: true,
                  message: '填写名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="选项内容" hasFeedback>
            {getFieldDecorator('optionsInfo', {
              rules: [
                {
                  required: true,
                  message: '填写选项内容!',
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
    actions: bindActionCreators({addVoteOpt, getThemeOption}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Form.create()(AddVote)))