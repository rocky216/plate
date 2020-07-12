import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input} from "antd"
import {IProps} from "@/interface/app"
import {addSellUsers, editSellUsers, getSellUsers} from "@/actions/sellAction"

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


interface Props extends IProps {
  params: any,
  visible: boolean;
  detail: any;
  onCancel:()=>void;
}

const AddSellUser: React.FC<Props> = ({
  spinning,
  utils,
  params,
  visible,
  detail,
  onCancel,
  actions
})=>{
  const [form] = Form.useForm();

  /* 新增 */
  const addSubmit = (values:any)=>{
    actions.addSellUsers(values, ()=>{
      utils.OpenNotification("success")
      onCancel();
      actions.getSellUsers(params)
    })
  }

  /* 编辑 */
  const editSubmit = (values:any)=>{
    actions.editSellUsers({
      ...values,
      id: detail.id
    }, ()=>{
      utils.OpenNotification("success")
      onCancel();
      actions.getSellUsers(params)
    })
  }
  
  return (
    <Modal
      destroyOnClose
      visible={visible}
      confirmLoading={spinning}
      onCancel={onCancel}
      afterClose={()=>form.resetFields()}
      onOk={ ()=>{
        form
          .validateFields()
          .then(values => {
            detail?editSubmit(values):addSubmit(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} {...layout}>
        <Form.Item 
          label="账号" 
          name="account" 
          initialValue={detail?detail.account:""}
          rules={[{required: true, message: "账号!"}]}
          >
          <Input/>
        </Form.Item>
        <Form.Item 
          label="密码" 
          name="password" 
          >
          <Input/>
        </Form.Item>
        <Form.Item 
          label="账号名称" 
          name="name" 
          initialValue={detail?detail.name:""}
          rules={[{required: true, message: "账号名称!"}]}
          >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({addSellUsers, editSellUsers, getSellUsers}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    utils: state.app.utils,
    spinning: state.sell.spinning
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSellUser);