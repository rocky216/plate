import React, {useEffect} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, Select, Cascader} from "antd"
import {IProps} from "@/interface/app"
import {addSellUsers, editSellUsers, getSellUsers,permissionList, distributeCompanyItem} from "@/actions/sellAction"

const {Option} = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


interface Props extends IProps {
  params: any,
  visible: boolean;
  detail: any;
  onCancel:()=>void;
  permiss:any[];
  distcompany:any[];
}

const AddSellUser: React.FC<Props> = ({
  spinning,
  utils,
  params,
  visible,
  detail,
  onCancel,
  actions,
  permiss,
  distcompany
})=>{
  const [form] = Form.useForm();

  useEffect(() => {
    if(detail){
      actions.permissionList({
        userId:detail.id
      })
      actions.distributeCompanyItem({
        userId:detail.id
      })
    }
    
  }, [detail.id])

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
        {detail?(
          <>
            <Form.Item 
              label="分配公司" 
              name="permId1" 
              // initialValue={detail.permId?detail.permId:""}
              rules={[{required: true, message: "分配公司!"}]}
              >
              {/* <Cascader 
                options={distcompany}
                fieldNames={{ label: 'manageName', value: 'id' }}
              />  */}
            </Form.Item>
            <Form.Item 
              label="角色" 
              name="permId" 
              initialValue={detail.permId?detail.permId:""}
              rules={[{required: true, message: "角色!"}]}
              >
              <Select>
                {permiss?permiss.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
                
              </Select>
            </Form.Item>
          </>
        )
        :null}
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({addSellUsers, editSellUsers, getSellUsers, permissionList, distributeCompanyItem}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    distcompany: state.sell.distcompany,
    permiss: state.sell.permiss,
    utils: state.app.utils,
    spinning: state.sell.spinning
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSellUser);