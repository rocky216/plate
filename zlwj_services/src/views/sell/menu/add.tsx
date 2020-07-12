import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input} from "antd"
import { IProps } from "@/interface/app"
import {addMenus, getMenus, editMenus} from "@/actions/sellAction"



const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

interface Props extends IProps {
  visible: boolean;
  onCancel: ()=>void;
  detail: any;
  type:string
}

const AddMenu: React.FC<Props> = ({
  visible,
  spinning, 
  onCancel, 
  detail,
  actions,
  utils,
  type
})=>{
  const [form] = Form.useForm()

  /* 新增 */
  const addSubmit = (values:any)=>{
    actions.addMenus({
      ...values,
      parentId: detail ? detail.id : 0
    }, ()=>{
      utils.OpenNotification("success")
      actions.getMenus({});
      onCancel();
    })
  }

  /* 编辑 */
  const editSubmit = (values:any)=>{
    actions.editMenus({
      id: detail.id,
      ...values,
    }, ()=>{
      utils.OpenNotification("success")
      actions.getMenus({});
      onCancel();
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
            detail && type==="edit" ? editSubmit(values) : addSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} name="basic">
        <Form.Item
          name="name"
          label="名称"
          initialValue={detail && type=="edit"?detail.name:""}
          rules={[{ required: true, message: '名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="author"
          label="权限标识"
          initialValue={detail && type=="edit"?detail.author:""}
          rules={[{ required: true, message: '权限标识！' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators({addMenus, getMenus, editMenus}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMenu);