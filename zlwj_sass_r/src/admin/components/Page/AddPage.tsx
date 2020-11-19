
/**
 * visible required boolean
 * width 模态框宽
 * onOk required 点击模态框确定按钮回调
 * onCancel required 点击模态框取消按钮回调
 * initialValue 设置初始值
 * spinning 加载动画
 */

import React, { ReactNode } from "react"
import { connect } from "react-redux";
import {Modal, Form, Input, Select, InputNumber} from "antd"
import { FormInstance } from "antd/lib/form";
import { type } from "os";

const {TextArea} = Input;
const {Option} = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

interface ItemProps {
  label?:string;
  name: string;
  type: ReactNode,
  selectList?: any[];
  showSearch?:boolean;
  filterOption?:(...arg0:any)=>any;
  initialValue?:any;
  rules?: boolean | any[];
}

interface Props {
  visible: boolean;
  width?:number;
  onOk: (...arg0:any)=>void;
  onCancel:()=>void;
  title?:any;
  data:ItemProps[];
  initialValues?:any;
  spinning?:boolean;
}

class AddPage extends React.Component<Props> {

  formRef = React.createRef<FormInstance>()

  componentDidMount(){
    console.log(this.formRef, "ass")
  }

  getElement(item:ItemProps){
    if(item.type == Input){
      return <Input/>
    }else if(item.type == TextArea){
      return <TextArea  />
    }else if(item.type == InputNumber){
      return <InputNumber style={{width: "100%"}} />
    }
    else if(item.type == Select){
      return (
        <Select
          showSearch={item.showSearch || false}
          filterOption={item.filterOption || false}
        >
          {item.selectList?.map(elem=>(
            <Option key={elem.id} value={elem.id} >{elem.name}</Option>
          ))}
        </Select>
      )
    }else{
      return item.type;
    }
  }

  onFinish(values: any){
    this.props.onOk(values)
  }
  
  handleRules(item:ItemProps){
    if(typeof item.rules === 'boolean'){
      return [{required: true, message: `${item.label}不能为空！`}]
    }else if(typeof item.rules === 'object'){
      return item.rules;
    }
    return [];
  }

  render() {
    const {visible, width, onOk, onCancel, title, data, spinning, initialValues} = this.props



    return (
      <Modal
        //强渲染
        forceRender={true}
        title={title || null}
        visible={visible}
        destroyOnClose
        width={width || 520}
        onOk={()=>this.formRef.current?.submit()}
        onCancel={onCancel}
        confirmLoading={spinning}
      >
        <Form 
          {...layout}
          ref={this.formRef} 
          onFinish={this.onFinish.bind(this)}>
          {data.map((item, index)=>(
            <Form.Item 
              key={index} 
              label={item.label} 
              name={item.name} 
              initialValue={item.initialValue}
              rules={this.handleRules(item)}
              >
              {this.getElement(item)}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  }
}

export default connect()(AddPage)