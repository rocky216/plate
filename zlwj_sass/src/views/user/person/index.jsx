import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Input, Form, Upload, Select, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {editPerson, getBaseInfo} from "@/actions/appAction"
import EditPerson from "./editPassword"

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

class UserPerson extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file:''
    }
  }
  componentDidMount(){
    if(this.props.baseInfo && !this.state.file){
      this.setState({file: {url: this.props.baseInfo.userInfo.headUrl, attaId: ''} })
    }
  }
  componentWillReceiveProps(nextProps){
    
    if(nextProps.baseInfo && !this.state.file){
      this.setState({file: {url: nextProps.baseInfo.userInfo.headUrl, attaId: ''} })
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

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        values = _.omit(values,"files")
        this.props.actions.editPerson({
          ...values,
          id: this.props.baseInfo.userInfo.id,
          attaId: this.state.file.attaId
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getBaseInfo({})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, commonFiles, baseInfo} = this.props
    const {file} = this.state
    console.log(file)
    return (
      <JCard spinning={spinning} >
        <Row gutter={10}>
          <Col span={12}>
            <Card title="个人资料" 
                  extra={<Button onClick={this.handlenSubmit.bind(this)} type="primary"><Icon type="save" />保存</Button>} >
              <Form {...formItemLayout}>
                <Form.Item label="我的头像">
                  {getFieldDecorator('files', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.upLoadChange.bind(this)
                  })(
                    <Upload 
                      name="file" 
                      showUploadList={false}
                      action={`${commonFiles?commonFiles.resourceServerAddress:''}common/${this.props.utils.getCookie("token")}`} listType="picture">
                      
                      {file && file.url?<img style={{width: 60, height: 60, borderRadius: "50%"}} src={file.url} />
                      :<i className="icon iconfont icon-touxiang" style={{fontSize: 30}} />}
                    </Upload>
                  )}
                </Form.Item>
                <Form.Item label="昵称" hasFeedback>
                  {getFieldDecorator('nickname', {
                    initialValue: baseInfo?baseInfo.userInfo.nickname:'',
                    rules: [
                      {
                        required: true,
                        message: '填写昵称!',
                      }
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="性别" hasFeedback>
                  {getFieldDecorator('sex', {
                    initialValue: baseInfo?String(baseInfo.userInfo.sex):'',
                  })(
                    <Select>
                      <Option value="0">男</Option>
                      <Option value="1">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <EditPerson/>
          </Col>
        </Row>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editPerson, getBaseInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    baseInfo: state.app.baseInfo,
    spinning: state.app.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(UserPerson) )