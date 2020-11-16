import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Input, Select, Button, DatePicker, Cascader} from "antd";

const {Option} = Select
const {RangePicker} = DatePicker

/* 
  list: [
    {
      type: String, 
      title: String 
      value: String
      list: 列表的数据
    }
  ]
*/

class MySearch extends React.Component {

  getType(item){
    switch(item.type){
      case "input":
        return <Input />
      case "select":
        console.log(item)
        return (
          <Select style={item.style||{width: 120}}>
            <Option value="" >全部</Option>
            {item.list?item.list.map(elem=>(
              <Option key={elem[item.value || "value"]}  value={elem[item.value || "value"]}>{elem[item.title || "title"]}</Option>
            )):null}
          </Select>
        )
      case "datePicker":
        return <DatePicker style={item.style} />
      case "rangePicker":
        return <RangePicker style={item.style} />
      case "cascader":
        return <Cascader style={item.style} fieldNames={item.fieldNames} options={item.options || []} />
      default:
        return <Input/>
    }
  }

  handleSearch(e){
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.handleSearch(values)
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, layout, data} = this.props
    console.log(data)
    return (
      <Form layout={layout || "inline"}>
        {data.map((item, index)=>(
          <Form.Item key={index} label={item.label || null}>
            {getFieldDecorator(item.field, {
              initialValue: "",
              rules: item.verify ? [{ required: true, message: item.label+"不能为空" }]:null,
            })(
              this.getType(item)
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button icon="search" type="primary" onClick={this.handleSearch.bind(this)} >搜索</Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(MySearch) )