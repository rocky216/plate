import React from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal,
  Form,
  Select,
  InputNumber,
  Input
} from "antd"
import {editRoleItem, getRoleList} from "@/actions/projectAction"
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

class Account extends React.Component {
  
  componentWillReceiveProps(nextProps){
    
  }

  handlenSubmit(e){
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.editRoleItem({
          ...values,
          rid: this.props.detail.roleId
        }, res=>{
          OpenNotification("success")
          this.props.history.push("/project/role")
          this.props.actions.getRoleList({})
          this.props.onCancel()
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {editVisible, onCancel, detail} = this.props
    
    return (
      <Modal
        destroyOnClose={true}
        visible={editVisible}
        title="角色变更"
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="角色名称">
            {getFieldDecorator("roleName", {
              initialValue: detail?detail.roleName:'',
              rules: [{ required: true, message: '角色名称不能为空!' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="角色标识">
            {getFieldDecorator("roleKey", {
              initialValue: detail?detail.roleKey:'',
              rules: [{ required: true, message: '角色标识不能为空!' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="角色排序">
            {getFieldDecorator("roleSort", {
              initialValue: detail?detail.roleSort:'',
              rules: [{ required: true, message: '角色排序不能为空!' }],
            })(
              <InputNumber/>
            )}
          </Form.Item>
          <Form.Item label="数据范围">
            {getFieldDecorator("dataScope", {
              initialValue: detail?detail.dataScope:'',
              rules: [{ required: true, message: '角色排序不能为空!' }],
            })(
              <Select >
                <Option value="1">全部数据权限</Option>
                <Option value="2">自定数据权限</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editRoleItem, getRoleList}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Form.create()(Account)))