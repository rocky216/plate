import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Input, InputNumber, Button, Icon, Modal, Tag, Select} from "antd";
import {addOwners} from "@/actions/projectAction"
import "./index.less"

const {Option} = Select
const {TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

class AddOwner extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
    }
  }


  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.addOwners({
          ...values,
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/project/owner")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const { } = this.state
    
    return (
      <Card title="新增业主" extra={
          <div>
            <Button type="primary"  onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />提交</Button>
            <Button className="mgl10"><Link to="/project/owner"><Icon type="rollback" />返回</Link></Button>
          </div>
        } >
          
        
        <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)} >
          <Form.Item label="业主姓名" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '业主姓名!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="手机号" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '手机号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="身份证" hasFeedback>
            {getFieldDecorator('idCard')(<Input/>)}
          </Form.Item>
          <Form.Item label="微信" hasFeedback>
            {getFieldDecorator('weixin')(<Input/>)}
          </Form.Item>
          <Form.Item label="邮箱" hasFeedback>
            {getFieldDecorator('email')(<Input/>)}
          </Form.Item>
          <Form.Item label="性别" hasFeedback>
            {getFieldDecorator('sex',{
              initialValue: "0"
            })(
              <Select>
                <Option value="0">无</Option>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark')(<TextArea/>)}
          </Form.Item>
          
        </Form>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addOwners}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddOwner) )