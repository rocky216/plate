import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal,
  Form,
  Input,
  Select
} from "antd"
import {addMeun, getSysMeunList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Add extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addMeun(_.assign({},values,{
          parentId:this.props.detail.menuId,
          url:0,
          icon: 0,
          sort:0
        }), res=>{
          OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getSysMeunList()
        })
      }
    });
  };

  render(){
    const {getFieldDecorator} = this.props.form
    const {addVisible, detail, onCancel} = this.props
    console.log(detail, 98)
    return (
      <Modal
        destroyOnClose
        title="编辑菜单"
        visible={addVisible}
        onCancel={onCancel}
        onOk={this.handleSubmit.bind(this)}
      >
        <Form {...formItemLayout}>
          <Form.Item label="菜单名称">
            {getFieldDecorator('menuName', {
              rules: [{ required: true, message: '菜单名称不能为空!' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="权限标识">
            {getFieldDecorator('perms', {
              rules: [{ required: true, message: '权限标识不能为空!' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="是否公共权限">
            {getFieldDecorator("reserveOne", {
              initialValue: "alone",
              rules: [{ required: true, message: '是否公共权限!' }], 
            })(
              <Select style={{width: 100}}>
                <Option value="alone">私有</Option>
                <Option value="common">公有</Option>
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
    actions: bindActionCreators({addMeun, getSysMeunList}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Add))