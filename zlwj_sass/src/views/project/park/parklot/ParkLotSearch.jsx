import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Input, Select, Button, Icon} from "antd";

const {Option} = Select

class ParkLotSearch extends React.Component {

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
    const {utils, baseInfo} = this.props

    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="停车位编号">
          {getFieldDecorator('parkingSpaceCode')(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item label="停车位类型">
          {getFieldDecorator('typeId', {
            initialValue: ""
          })(
            <Select style={{width: 120}}>
              <Option value="">全部</Option>
              {baseInfo?baseInfo.sysDict.car_parking_space.type_id.map(item=>(
                <Option key={item.id} value={item.id}>{item.dictLabel}</Option>
              )):null}
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
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(ParkLotSearch) )