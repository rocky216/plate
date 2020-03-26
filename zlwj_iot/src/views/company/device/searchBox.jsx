import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Form, Select, Input, Icon, Button} from "antd";
import {getDeviceDictTree} from "@/actions/dictAction"


const {Option} = Select

class SearchBox extends React.Component {
  componentDidMount(){
    this.props.actions.getDeviceDictTree({})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.handlenSearch(values)
    })
  }

  handlenReset(){
    this.props.form.resetFields()
    this.props.handlenSearch(null)
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, dictdevice} = this.props
    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="设备类型">
          {getFieldDecorator("deviceType", {
            initialValue: ""
          })(
            <Select style={{width:120}}>
              <Option value="">全部</Option>
              {dictdevice?dictdevice.map(item=>(
                <Option key={item.id} value={item.id}>{item.name}</Option>
              )):null}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="在线状态">
          {getFieldDecorator("online", {
            initialValue: ""
          })(
            <Select style={{width:120}}>
              <Option value="">全部</Option>
              <Option value="1">在线</Option>
              <Option value="0">下线</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="设备序列号">
          {getFieldDecorator("deviceSerial", {
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="平台ID">
          {getFieldDecorator("iotId", {
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >搜索</Button>
          <Button className="mgl10" onClick={this.handlenReset.bind(this)}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeviceDictTree}, dispatch)
  }
}

function mapStateProps(state){
  return {
    dictdevice: state.dict.dictdevice,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(SearchBox) )