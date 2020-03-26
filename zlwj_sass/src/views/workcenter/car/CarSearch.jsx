import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Input, Select, Button, Icon} from "antd";
import {getPlates} from "@/actions/otherAction"

const {Option} = Select

class ParkLotSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plates:[]
    }
  }
  componentDidMount(){
    this.props.actions.getPlates({}, res=>{
      this.setState({plates: res})
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.handlenSearch(values)
    });
  }

  handlenReset(){
    this.props.form.resetFields()
    this.props.handlenSearch(null)
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, baseInfo, params, } = this.props
    const {plates} = this.state

    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="联系人">
          {getFieldDecorator('linkName', {
            initialValue: params.linkName
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item label="停车场">
          {getFieldDecorator('carparkId', {
            initialValue: params.linkPhone
          })(
            <Select style={{width: 120}}>
              <Option value="">全部</Option>
              {plates.map(item=>(
                <Option key={item.id} value={item.id} >{item.carparkName}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="车牌号码">
          {getFieldDecorator('licensePlate', {
            initialValue: params.licensePlate
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('status', {
            initialValue: params.status
          })(
            <Select style={{width: 120}}>
              <Option value="">全部</Option>
              <Option value="0">有效</Option>
              <Option value="1">无效</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary"><Icon type="search" />搜索</Button>
          <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="rollback" />重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlates}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(ParkLotSearch) )