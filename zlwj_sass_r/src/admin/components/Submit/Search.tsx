/**
 * before: ReactElement,可添加在最前边
 * data: require List类型，生成表单数据
 * handleSearch require Function  点击搜索
 * initialValues require any 初始化回显数据
 */

import React, { ReactElement, ReactNode, useEffect } from "react"
import {Button, Form, Input, Select, Card, Row, Col} from "antd"
import {SearchOutlined, RetweetOutlined } from "@ant-design/icons"

const {Option} = Select

interface ItemType {
  label?: string,
  name: string,
  type: ReactNode,
  selectList?: any[];
  initialValue?:any;
}

interface Props {
  before?: ReactNode;
  data: ItemType[];
  handleSearch: Function;
  initialValues: any;
}


const Search:React.FC<Props> = ({
  before,
  data,
  handleSearch,
  initialValues,
  
})=>{
  const [form] = Form.useForm();
  
  const onFinish = (values:any) => {
    console.log(values)
    handleSearch(values)
  };

  const handleReset = function(){
    form.resetFields()
    handleSearch(initialValues)
  }


  const getNode = ( item:any )=>{

    if(item.type == Input){
      return <Input/>
    }else if(item.type == Select){
      return (
        <Select>
          {item.selectList.map((elem:any)=>(
            <Option key={elem.id} value={elem.id}>{elem.label}</Option>
          ))}
        </Select>
      )
    }else{
      return item.type
    }
  }

  useEffect(() => {
    
    return () => {
      
    };
  }, [])

  return (
    <Card size="small" >
      <div className="flexbetween">
        <div style={{marginRight: 30}}>
          {before}
        </div>
        <div className="flexend" style={{minWidth: "80%"}}>
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <Row >
              {data.map((item, index)=>{
                return (
                  <Col style={{marginBottom: 5}} key={index}   >
                    <Form.Item
                      label={item.label||""}
                      name={item.name}
                      initialValue={item.initialValue}
                    >
                      {getNode(item)}
                    </Form.Item>
                  </Col>
                )
              })}
              <Col  >
                <Form.Item >
                  <Button type="primary" ghost htmlType="submit" icon={<SearchOutlined />}>搜索</Button>
                  <Button className="mgl10" onClick={handleReset} icon={<RetweetOutlined />}>重置</Button>
                </Form.Item>
              </Col>
            </Row>
            

            
          </Form>
        </div>
      </div>
    </Card>
  )
}

export default Search;