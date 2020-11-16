import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, DatePicker, Radio, Checkbox, Alert} from "antd";
import {plateTimeCount, goPlateRenewal, getCarList} from "@/actions/otherAction"
import moment from "moment"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Renewal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ""
    }
  }
  

  componentDidMount(){
    
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        console.log(values)
        this.props.actions.goPlateRenewal({
          ...values,
          notPast: values.notPast?1:0,
          past: values.past?1:0,
          renewalTime: values.renewalTime?moment(values.renewalTime).format("YYYY-MM-DD"):""
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCarList({current: 1})
        })
      }
    })
  }

  render(){
    let _this = this;
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, plates} = this.props
    const {data} = this.state
    
    return (
      <Modal
        destroyOnClose
        okText="续约"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Alert className="mgt10" message={(
          <div >
            <Button size="small" type="link" >未过期车辆 <span className="mgl10" style={{color: "red"}}>{data?data.noPastCount:0}</span> </Button>
            <Button size="small" type="link" >已过期车辆 <span className="mgl10" style={{color: "red"}}>{data?data.pastCount:0}</span> </Button>
          </div>
        )} />
        <Form {...formItemLayout} >
          <Form.Item label="停车场">
            {getFieldDecorator('parkId',{
              getValueFromEvent(parkId){
                _this.props.actions.plateTimeCount({parkId}, res=>{
                  _this.setState({data: res})
                })
                return parkId;
              }
            })(
              <Select style={{width: 120}}>
                {plates?plates.map(item=>(
                  <Option key={item.id} value={item.id} >{item.carparkName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{sm: { span: 16, offset: 5},}} >
            {getFieldDecorator('notPast')(
              <Checkbox>未过期关联</Checkbox>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{sm: { span: 16, offset: 5},}} >
            {getFieldDecorator('past')(
              <Checkbox>已过期关联</Checkbox>
            )}
          </Form.Item>
          <Form.Item label="续约至" hasFeedback>
            {getFieldDecorator('renewalTime', {
              rules: [
                {
                  required: true,
                  message: '填写字典表名字段!',
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({plateTimeCount, goPlateRenewal, getCarList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    plates: state.other.plates,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Renewal))