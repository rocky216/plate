import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input} from "antd"
import {IProps} from "@/interface/app"
import {getRoles, addRole, editRole } from "@/actions/sellAction"

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


interface Props extends IProps {
  visible: boolean;
  detail: any;
  onCancel:()=>void;
}

const AddSellRole: React.FC<Props> = ({
  spinning,
  utils,
  visible,
  detail,
  onCancel,
  actions
})=>{
  const [form] = Form.useForm();

  /* 新增 */
  const addSubmit = (values:any)=>{
    actions.addRole(values, ()=>{
      utils.OpenNotification("success")
      onCancel();
      actions.getRoles({})
    })
  }

  /* 编辑 */
  const editSubmit = (values:any)=>{
    actions.editRole({
      ...values,
      id: detail.id
    }, ()=>{
      utils.OpenNotification("success")
      onCancel();
      actions.getRoles({})
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
          label="名称" 
          name="name" 
          initialValue={detail?detail.name:""}
          rules={[{required: true, message: "名称!"}]}
          >
          <Input/>
        </Form.Item>
        <Form.Item 
          label="备注" 
          name="remark" 
          initialValue={detail?detail.remark:""}
          >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getRoles, addRole, editRole}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    utils: state.app.utils,
    spinning: state.sell.spinning
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSellRole);