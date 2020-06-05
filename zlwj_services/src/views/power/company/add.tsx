import React, {useState} from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Button, Modal, Input, Form, InputNumber} from "antd"
import {IProps} from "@/interface/app"

interface Props extends IProps {
  visible: boolean;
  onCancel: ()=>void;
  onCreate:(values: any)=>void;
  detail: any|boolean; 
}

const AddCompany: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  spinning,
  detail
})=>{
  const [form] = Form.useForm();
  
  
  return (
    <Modal
      destroyOnClose
      visible={visible}
      confirmLoading={spinning}
      onCancel={onCancel}
      afterClose={()=>form.resetFields()}
      onOk={()=>{
        form
          .validateFields()
          .then(values => {
            
            /* 校验新增与编辑 */
            let newValues = detail?Object.assign(values, {
              id: detail.id
            }):values;

            onCreate( newValues );
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="companyName"
          label="公司名称"
          initialValue={detail?detail.companyName:""}
          rules={[{ required: true, message: '公司名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="companyCode"
          label="公司编号"
          initialValue={detail?detail.companyCode:""}
          rules={[{ required: true, message: '公司编号！' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item 
          name="phone"
          label="联系方式"
          initialValue={detail?detail.phone:""}
          rules={[{ required: true, message: '联系方式!' }]}
        >
          <InputNumber style={{width: "100%"}} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    spinning: state.power.spinning
  }
}


export default connect(mapStateToProps )(AddCompany);