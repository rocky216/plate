import React, {useState} from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Button, Modal, Input, Form, InputNumber, Select} from "antd"
import {IProps} from "@/interface/app"
import SelectCompany from "@/components/SelectCompany"

const {Option } = Select

interface Props extends IProps {
  visible: boolean;
  onCancel: ()=>void;
  onCreate:(values: any)=>void;
  detail: any|boolean; 
}

const AddEstate: React.FC<Props> = ({
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
      >
        <Form.Item
          name="itemName"
          label="小区名称"
          initialValue={detail?detail.itemName:""}
          rules={[{ required: true, message: '小区名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="itemCode"
          label="小区编号"
          initialValue={detail?detail.itemCode:""}
          rules={[{ required: true, message: '小区编号！' }]}
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
        <Form.Item 
          name="wuyeLinkCode"
          label="物业联动编码"
          initialValue={detail?detail.wuyeLinkCode:""}
        >
          <Input  />
        </Form.Item>
        <Form.Item 
          name="tempVisitCode"
          label="临时访问编码"
          initialValue={detail?detail.tempVisitCode:""}
          rules={[{ required: true, message: '临时访问编码!' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item 
          name="companyId"
          label="公司"
          initialValue={detail?detail.companyId:""}
          rules={[{ required: true, message: '公司!' }]}
        >
          <SelectCompany/>
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


export default connect(mapStateToProps )(AddEstate);