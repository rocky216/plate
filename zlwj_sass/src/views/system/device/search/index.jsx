import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Form, Input, Select, Cascader} from "antd";
import {getCompanyProject} from "@/actions/appAction"

const {Option} = Select


class MySearch extends React.Component {

  componentDidMount(){
    this.props.actions.getCompanyProject({})
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {hearr,online, serial} = values
        console.log(values)
        this.props.handleSearch({
          companyId: hearr?hearr[0]:"",
          heId: hearr?hearr[1]:"",
          online,
          serial
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils,className, companyPro} = this.props

    return (
      <Form className={className} layout="inline">
        <Form.Item label="公司-小区">
          {getFieldDecorator('hearr', {
          })(
            <Cascader options={companyPro?companyPro:[]} style={{width: 300}}
              fieldNames={{ label: 'name', value: 'id' }}/>
          )}
        </Form.Item>
        <Form.Item label="序列号">
          {getFieldDecorator('serial', {
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="在线状态">
          {getFieldDecorator('online', {
            initialValue: ""
          })(
            <Select>
              <Option value="">全部</Option>
              <Option value="1">在线</Option>
              <Option value="0">离线</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button icon="search" type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompanyProject}, dispatch)
  }
}

function mapStateProps(state){
  return {
    companyPro: state.app.companyPro,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(MySearch) )