import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Button, Icon} from "antd";
import BraftEditor from "@/components/BraftEditor"
import {editNotice, getNoticeDetail} from "@/actions/otherAction"

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

class EditNotice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: "",
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getNoticeDetail({
      id: this.props.match.params.id
    }, res=>{
      console.log(res, "res")
      this.setState({detail: res, content: res.content})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        if(!this.state.content) {
          this.props.utils.OpenNotification("error", "内容不能为空！")
          return 
        }
        this.props.actions.editNotice({
          ...values,
          content: this.state.content,
          id: this.props.match.params.id
        }, res=>{
          this.props.history.push("/other/notice")
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {detail, content} = this.state

    return (
      <Card extra={(
        <div>
          <Button onClick={this.handlenSubmit.bind(this)} className="mgr10" type="primary" ><Icon type="save" />保存</Button>
          <Link to="/other/notice"><Button><Icon type="rollback" />返回</Button></Link>
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
          <Form.Item label="内容" hasFeedback>
            {content?<BraftEditor defaultValue={content} onChange={val=>this.setState({content: val})}/>:null}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editNotice, getNoticeDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditNotice) )