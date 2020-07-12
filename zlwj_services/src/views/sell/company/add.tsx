import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, Button } from "antd"
import {IProps} from "@/interface/app"
import UploadFile from "@/components/UploadFile"
import {UploadOutlined} from "@ant-design/icons"
import {addSellCompany, getCompanys, editSellCompany} from "@/actions/sellAction"

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


interface Props extends IProps {
  visible: boolean;
  onCancel: ()=>void;
  type: string;
  detail:any;
}

const AddSellCompany: React.FC<Props> = ({
  visible,
  spinning,
  onCancel,
  utils,
  actions,
  type,
  detail
})=>{
  const [form] = Form.useForm()

  /* 新增 */
  const addSubmmit = (values:any)=>{
    actions.addSellCompany({
      ...values,
      logoUrl: values.logoUrl[0]["url"],
      parentId: detail?detail.id:0
    }, ()=>{
      utils.OpenNotification("success")
      onCancel();
      actions.getCompanys({})
    })
  }

  /* 编辑 */
  const editSubmmit = (values:any)=>{
    actions.editSellCompany({
      id: detail.id,
      ...values,
      logoUrl: values.logoUrl[0]["url"],
      parentId: detail.parentId
    }, ()=>{
      utils.OpenNotification("success")
      onCancel();
      actions.getCompanys({})
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
            detail && type==="edit" ? editSubmmit(values) : addSubmmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} >
        <Form.Item
            name="name"
            label="名称"
            initialValue={detail && type==="edit"?detail.name:""}
            rules={[{ required: true, message: '名称！' }]}
          >
            <Input />
        </Form.Item>
        <Form.Item
            name="code"
            label="编码"
            initialValue={detail && type==="edit"?detail.code:""}
            rules={[{ required: true, message: '编码！' }]}
          >
            <Input />
        </Form.Item>
        <Form.Item
            name="manageName"
            label="负责人名称	"
            initialValue={detail && type==="edit"?detail.manageName:""}
            rules={[{ required: true, message: '负责人名称！' }]}
          >
            <Input />
        </Form.Item>
        <Form.Item
            name="managePhone"
            label="负责人联系电话	"
            initialValue={detail && type==="edit"?detail.managePhone:""}
            rules={[{ required: true, message: '负责人联系电话！' }]}
          >
            <Input />
        </Form.Item>
        <Form.Item
            name="logoUrl"
            label="logo"
            initialValue={detail && type==="edit"?[{name: detail.name, url: detail.logoUrl, uid: '-1'}]:""}
            valuePropName="fileList"
            getValueFromEvent={utils.normFileSingle}
            rules={[{ required: true, message: 'logo！' }]}
          >
            <UploadFile >
              <Button icon={<UploadOutlined/>}></Button>
            </UploadFile>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({addSellCompany, getCompanys, editSellCompany}, dispatch)
  }
}

const mapStateToProps = (state: any) => {
  return {
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSellCompany)