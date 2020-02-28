import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, Row, Col, Checkbox, Radio, TimePicker } from "antd";
import {getScheduDetail, editSchedu, getSchedu } from "@/actions/personAction"
import moment from "moment"
import "./index.less"

const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EditSchedu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      info: "",
      productionStartTime: "",
      productionEndTime: "",
      cutOneStartTime:"",
      cutOneEndTime:"",
      cutTwoStartTime:"",
      cutTwoEndTime:"",
      cutThreeStartTime:"",
      cutThreeEndTime:"",
    }
  }

  componentDidMount(){
    this.props.actions.getScheduDetail({
      id: this.props.detail.id
    }, res=>{
      const {productionStartTime, productionEndTime, cutOneStartTime, cutOneEndTime, cutTwoStartTime,
        cutTwoEndTime,
        cutThreeStartTime,
        cutThreeEndTime} = res
      this.setState({info: res, 
        productionStartTime, 
        productionEndTime, 
        cutOneStartTime, 
        cutOneEndTime, 
        cutTwoStartTime,
        cutTwoEndTime,
        cutThreeStartTime,
        cutThreeEndTime})
    })
  }

  handlenSubmit(){
    const {productionStartTime, 
      productionEndTime, 
      cutOneStartTime, 
      cutOneEndTime, 
      cutTwoStartTime,
      cutTwoEndTime,
      cutThreeStartTime,
      cutThreeEndTime} = this.state

      let values = _.omit(this.state, "info")
      if( !productionStartTime || !productionEndTime ){
        this.props.utils.OpenNotification("error", "排产时间不能为空")
        return 
      }
    this.props.actions.editSchedu({
      id: this.props.detail.id,
      ...values
    }, res=>{
      console.log(12122122)
      this.props.utils.OpenNotification("success")
      this.props.actions.getSchedu({current: 1})
      this.props.onCancel()
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    const {
      info, 
      cutOneStartTime,
      cutOneEndTime,
      cutTwoStartTime,
      cutTwoEndTime,
      cutThreeStartTime,
      cutThreeEndTime,
      productionStartTime,
      productionEndTime} = this.state
    
    return (
      <Modal
        destroyOnClose
        width="70%"
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Row>
        <Form {...formItemLayout} >
          <Col span={10}>
            <Form.Item label="排产车间/部门" hasFeedback>
              <Input disabled value={info.subDeptName} />
            </Form.Item>
            <Form.Item label="排产日期" hasFeedback>
              <Checkbox disabled checked={info.saturdayStatus=="1"?true:false} >周六为上班日</Checkbox>
              <Checkbox disabled checked={info.sundayStatus=="1"?true:false} >周日为上班日</Checkbox>
            </Form.Item>
            <Form.Item label="排产班次" hasFeedback>
              <Radio.Group value={info.productionType} disabled >
                <Radio value="0">白班</Radio>
                <Radio value="1">晚班</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="排产时间">
              <TimePicker format="HH:mm" value={productionStartTime?moment(productionStartTime, "HH:mm"):null} 
              onChange={(d)=>this.setState({productionStartTime: d?moment(d).format("HH:mm"):null})}
              />
              <span className="timeline">-</span>
              <TimePicker format="HH:mm" value={productionEndTime?moment(productionEndTime, "HH:mm"):null} 
              onChange={(d)=>this.setState({productionEndTime: d?moment(d).format("HH:mm"):null})}/>
            </Form.Item>
            <Form.Item label="扣除中饭时间">
              <TimePicker format="HH:mm" value={cutOneStartTime?moment(cutOneStartTime, "HH:mm"):null} 
                onChange={(d)=>this.setState({cutOneStartTime: d?moment(d).format("HH:mm"):null})}
                />
                <span className="timeline">-</span>
                <TimePicker format="HH:mm" value={cutOneEndTime?moment(cutOneEndTime, "HH:mm"):null} 
                onChange={(d)=>this.setState({cutOneEndTime: d?moment(d).format("HH:mm"):null})}/>
            </Form.Item>
            <Form.Item label="扣除晚饭时间">
              <TimePicker format="HH:mm" value={cutTwoStartTime?moment(cutTwoStartTime, "HH:mm"):null} 
                onChange={(d)=>this.setState({cutTwoStartTime: d?moment(d).format("HH:mm"):null})}
                />
                <span className="timeline">-</span>
                <TimePicker format="HH:mm" value={cutTwoEndTime?moment(cutTwoEndTime, "HH:mm"):null} 
                onChange={(d)=>this.setState({cutTwoEndTime: d?moment(d).format("HH:mm"):null})}/>
            </Form.Item>
            <Form.Item label="扣除其他时间">
              <TimePicker format="HH:mm" value={cutThreeStartTime?moment(cutThreeStartTime, "HH:mm"):null} 
                onChange={(d)=>this.setState({cutThreeStartTime: d?moment(d).format("HH:mm"):null})}
                />
                <span className="timeline">-</span>
                <TimePicker format="HH:mm" value={cutThreeEndTime?moment(cutThreeEndTime, "HH:mm"):null} 
                onChange={(d)=>this.setState({cutThreeEndTime: d?moment(d).format("HH:mm"):null})}/>
            </Form.Item>
          </Col>
          
        </Form>
        </Row>
        
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getScheduDetail, editSchedu, getSchedu }, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.person.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditSchedu)) )