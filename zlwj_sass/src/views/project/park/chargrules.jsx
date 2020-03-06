import React from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Form, Input, Button, Icon} from "antd";
import {addPlateFeeConfig, plateFeeConfigList} from "@/actions/projectAction"
import {isNumber} from "@/utils"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Chargrules extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chargRules: [{
        startHour: "",
        endHour: "",
        amount: "",
      }]
    }
  }

  componentDidMount(){
    this.initial()
  }
  initial(){
    this.props.actions.plateFeeConfigList({
      parkId: this.props.match.params.id
    },res=>{
      this.setState({chargRules: res})
    })
  }

  
  addChargRules(){
    const {chargRules} = this.state
    chargRules.push({
      parkId: this.props.match.params.id,
      startHour: "",
      endHour: "",
      amount: "",
    })
    this.setState({chargRules})
  }

  handlenChange(type, index,{target}){
    console.log( ) 
    if(!isNumber(target.value))return
    const {chargRules} = this.state
    chargRules[index][type] = target.value
    this.setState({chargRules})
  }
  handlenSubmit(){
    
    this.props.actions.addPlateFeeConfig({details: JSON.stringify(this.state.chargRules)},res=>{
      this.props.utils.OpenNotification("success")
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {utils } = this.props
    const {chargRules } = this.state
    
    return (
      <Card title="收费规则" extra={(
        <div>
          <Button className="mgr10" onClick={this.addChargRules.bind(this)}><Icon type="plus" /></Button>
          <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
        </div>
      )} >
        {chargRules.map((item, index)=>(
          <Row className="mgb10" gutter={20} key={index} >
            <Col span={3}>收费规则{index+1}</Col>
            <Col span={7} style={{display:"flex"}}>
              <Input addonBefore="开始小时" onChange={this.handlenChange.bind(this, "startHour", index)} min={0} value={item.startHour} style={{width:"100%"}}/>
            </Col>
            <Col span={7} style={{display:"flex"}}>
              <Input addonBefore="结束小时" onChange={this.handlenChange.bind(this, "endHour", index)} min={0} value={item.endHour} style={{width:"100%"}}/>
            </Col>
            <Col span={7} style={{display:"flex"}}>
              <Input addonBefore="金额" onChange={this.handlenChange.bind(this, "amount", index)} min={0} value={item.amount} style={{width:"100%"}}/>
            </Col>
            
          </Row>
        ))}
        
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addPlateFeeConfig, plateFeeConfigList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)( Form.create()(Chargrules) ) )