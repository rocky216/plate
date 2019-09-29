import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  Icon,
  InputNumber,
  Select
} from "antd"
import {addRoleItem, getRoleList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"

const Option = Select.Option

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

class AddRole extends React.Component {

  handlenSubmit(e){
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addRoleItem({
          ...values,
        }, res=>{
          OpenNotification("success")
          this.props.history.push("/project/role")
          this.props.actions.getRoleList({})
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form

    return (
      <Card
        size="small"
        title="添加角色"
      >
        <Row>
          <Col span={10}>
            <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)}>
              <Form.Item label="角色名称">
                {getFieldDecorator("roleName", {
                  rules: [{ required: true, message: '角色名称不能为空!' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="角色标识">
                {getFieldDecorator("roleKey", {
                  rules: [{ required: true, message: '角色标识不能为空!' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="角色排序">
                {getFieldDecorator("roleSort", {
                  rules: [{ required: true, message: '角色排序不能为空!' }],
                })(
                  <InputNumber/>
                )}
              </Form.Item>
              <Form.Item label="数据范围">
                {getFieldDecorator("dataScope", {
                  initialValue: "2",
                  rules: [{ required: true, message: '角色排序不能为空!' }],
                })(
                  <Select >
                    <Option value="1">全部数据权限</Option>
                    <Option value="2">自定数据权限</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{
                  xs: { span: 12, offset: 0 },
                  sm: { span: 16, offset: 5 },
                }} >
                <Button htmlType="submit" className="mgr10" type="primary" ><Icon type="save" />保存</Button>
                <Button><Link to="/project/role"><Icon type="close" />取消</Link></Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addRoleItem, getRoleList}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddRole))