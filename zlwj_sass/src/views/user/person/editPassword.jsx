import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Input, Form, Upload, Select, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {updatePassword, getBaseInfo} from "@/actions/appAction"

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
      
    }
  }


  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.updatePassword({
          ...values,
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.form.resetFields()
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {} = this.props
    
    return (
      <Card size="small"  title="修改密码" 
        extra={<Button onClick={this.handlenSubmit.bind(this)} size="small" type="primary"><Icon type="save" />保存</Button>} >
        <Form {...formItemLayout}>
          <Form.Item label="原始密码" hasFeedback>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '填写原始密码!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="新密码" hasFeedback>
            {getFieldDecorator('newPassword', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '填写新密码!',
                }
              ],
            })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({updatePassword, getBaseInfo}, dispatch)
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