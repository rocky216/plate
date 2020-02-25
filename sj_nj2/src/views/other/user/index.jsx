import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input} from "antd";
import JCard from "@/components/JCard"
import {editStaffAccount} from "@/actions/personAction"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
};

class UserInfo extends React.Component {

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {password, rePassword} = values
        if(password !== rePassword){
          this.props.utils.OpenNotification("error", "两次密码不一致！")
          return
        }
        this.props.actions.editStaffAccount({
          password,
          id: this.props.base?this.props.base.employeeId:""
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/")
        })
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {utils, spinning, base} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small" title="个人信息" extra={
          <div>
            <Button className="mgr10" type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
            <Link to="/"><Button><Icon type="rollback"/>返回</Button></Link>
          </div>
        }>
          <Form {...formItemLayout}>
            <Form.Item label="用户名" >
              <Input value={base?base.employeeName:""} />
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('rePassword', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码!',
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
          </Form>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editStaffAccount}, dispatch)
  }
}

function mapStateProps(state){
  return {
    base: state.app.base,
    spinning: state.app.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(UserInfo) )