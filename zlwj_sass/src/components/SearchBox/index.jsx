import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Input, Select, Button, Icon, InputNumber} from "antd";
import {getSelectHeList} from "@/actions/appAction"
import SpecialBox from "./SpecialBox"

const {Option} = Select

class SearchBox extends React.Component {
  componentDidMount(){
    this.props.actions.getSelectHeList({})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      _.assign(values, {
        code:values.info?values.info.code:"",
        codeType:values.info?values.info.codeType:"",
      })
      let newValues = _.omit(values, "info")
      this.props.handlenSearch(newValues)
    });
  }
  handlenReset(){
    this.props.form.resetFields()
    this.props.handlenSearch(null)
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {allHeList, } = this.props

    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="业主姓名">
          {getFieldDecorator('name')(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="电话号码">
          {getFieldDecorator('phone')(
            <InputNumber style={{width:160}}/>
          )}
        </Form.Item>
        <Form.Item label="项目">
          {getFieldDecorator('heId', {
            initialValue: ""
          })(
            <Select  style={{width: 150}}>
              <Option value="">全部</Option>
              {allHeList && allHeList.length?allHeList.map(item=>(
                <Option key={item.id} value={item.id}>{item.name}</Option>
              )):null}
            </Select>
          )}
        </Form.Item>
        {getFieldValue("heId")?
        <>
          <Form.Item >
            {getFieldDecorator('info',{
              initialValue: {code: "", codeType: "house"}
            })(
              <SpecialBox/>
            )}
          </Form.Item>
          <Form.Item label="用户类型">
            {getFieldDecorator('ownersType', {
              initialValue: ""
            })(
              <Select style={{width:100}}>
                <Option value="">全部</Option>
                <Option value="0">业主</Option>
                <Option value="1">家庭成员</Option>
                <Option value="2">租客</Option>
              </Select>
            )}
          </Form.Item>
        </>:null}
        
        <Form.Item>
          <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
          <Button className="mgl10" onClick={this.handlenReset.bind(this)} ><Icon type="rollback" />重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSelectHeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(SearchBox) )