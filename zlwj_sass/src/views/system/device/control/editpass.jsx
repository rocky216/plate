import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select, Row, Col, Cascader, Card, Button, Icon} from "antd";
import {editControl, getControlPage, editControlDoors, editControlDoorsPass} from "@/actions/systemAction"
import {getCompanyProject} from "@/actions/appAction"
import JCard from "@/components/JCard"
import "./index.less"
import TimePickRange from "@/components/TimePickRange"
import Mycascader from "./mycascader"
import moment from "moment"

const {Option} = Select
const {TextArea} = Input

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

class EditPassControl extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      doors: []
    }
  }
  componentDidMount(){
    
    this.props.actions.getCompanyProject({})
    this.props.actions.editControlDoors({id: this.props.match.params.id}, res=>{
      this.handlenInitalData(res)
    })
  }

  handlenInitalData(res){
    _.each(res, item=>{
      item.autoOpenOne = this.handlenInitTime(item.autoOpenOne)
      item.autoOpenTwo = this.handlenInitTime(item.autoOpenTwo)
      item.autoOpenThree = this.handlenInitTime(item.autoOpenThree)
      item.autoOpenFour = this.handlenInitTime(item.autoOpenFour)
      item.autoOpenFive = this.handlenInitTime(item.autoOpenFive)
    })
    console.log(res, "rews")
    this.setState({doors: res})
  }

  handlenCascader(index,values){
    const {doors} = this.state
    doors[index]["builldId"] = values && values.length?values[0]:""
    doors[index]["unitId"] = values && values.length>1?values[1]:""
    this.setState({doors})
  }
  handlenDoorName(index, {target}){
    const {doors} = this.state
    doors[index]["doorName"] = target.value
    this.setState({doors})
  }
  handlenOpenSecond(index, value){
    const {doors} = this.state
    doors[index]["openSecond"] = value
    this.setState({doors})
  }
  handlenRemark(index, {target}){
    const {doors} = this.state
    doors[index]["remark"] = target.value
    this.setState({doors})
  }
  handlenTimePicker(index,key, values ){
    const {doors} = this.state
    doors[index][key] = values
    // console.log(doors, "doors")
    this.setState({doors})
  }

  handlenData(){
    const {doors} = this.state
    let arr = []
    console.log(doors, "Adoors")
    function getTime(arr){
      if(!arr) return "";
      return moment(arr[0]).format("HH:mm")+"-"+moment(arr[1]).format("HH:mm")
    }
    _.each(doors, item=>{
      arr.push({
        id: item.id,
        doorName: item.doorName,
        openSecond: item.openSecond,
        builldId: item.builldId,
        unitId: item.unitId,
        remark: item.remark,
        autoOpenOne: getTime(item.autoOpenOne),
        autoOpenTwo: getTime(item.autoOpenTwo),
        autoOpenThree: getTime(item.autoOpenThree),
        autoOpenFour: getTime(item.autoOpenFour),
        autoOpenFive: getTime(item.autoOpenFive),
      })
    })
    return JSON.stringify(arr)
  }

  handlenSubmit(){
    this.props.actions.editControlDoorsPass({
      doors: this.handlenData()
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.history.push("/system/device/control")
    })
  }
  handlenInitTime(item){
    if(_.isArray(item)) return item;
    if(!item)return ""
    let arr = item.split("-")

    return [moment(arr[0], "HH:mm"), moment(arr[1], "HH:mm")]
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, companyPro} = this.props
    const {doors} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card title="通道设置" extra={(
          <div>
            <Button type="primary" icon="save" onClick={this.handlenSubmit.bind(this)} className="mgr10">保存</Button>
            <Link to="/system/device/control"><Button><Icon type="rollback" />返回</Button></Link>
          </div>
        )}>
          {doors.map((item, index)=>(
            <Card size="small" key={item.id} style={{marginBottom: 10}}>
              <Row className="editpass" gutter={10}>
                <Col span={6} className="pass_inline">
                  <label className="w100">通道名称:</label>
                  <Input value={item.doorName} onChange={this.handlenDoorName.bind(this, index)} />
                </Col>
                <Col span={6} className="pass_inline">
                  <label className="w100">关联楼宇:</label>
                  <Mycascader 
                    value={item.builldId?[item.builldId,item.unitId]:null} 
                    heId={item.heId}
                    onChange={this.handlenCascader.bind(this, index)}
                    fieldNames={{ label: 'name', value: 'id', key: "id"}}/>
                </Col>
                <Col span={6} className="pass_inline">
                  <label className="w100">开门秒数:</label>
                  <InputNumber min={0} value={item.openSecond} style={{width: "100%"}} 
                    onChange={this.handlenOpenSecond.bind(this, index)} />
                </Col>
                <Col span={6} className="pass_inline">
                  <label className="w100">通道备注:</label>
                  <TextArea value={item.remark} onChange={this.handlenRemark.bind(this, index)} />
                </Col>
                <Col span={24} className="pass_inline">
                  <TimePickRange values={item.autoOpenOne} 
                  format="HH:mm"
                  onChange={this.handlenTimePicker.bind(this, index,"autoOpenOne")} />
                </Col>
                <Col span={24} className="pass_inline">
                  <TimePickRange values={item.autoOpenTwo} 
                  format="HH:mm"
                  onChange={this.handlenTimePicker.bind(this, index,"autoOpenTwo")}/>
                </Col>
                <Col span={24} className="pass_inline">
                  <TimePickRange values={item.autoOpenThree} 
                  format="HH:mm"
                  onChange={this.handlenTimePicker.bind(this, index,"autoOpenThree")}/>
                </Col>
                <Col span={24} className="pass_inline">
                  <TimePickRange values={item.autoOpenFour} 
                  format="HH:mm"
                  onChange={this.handlenTimePicker.bind(this, index,"autoOpenFour")}/>
                </Col>
                <Col span={24} className="pass_inline">
                  <TimePickRange values={item.autoOpenFive}  
                  format="HH:mm"
                  onChange={this.handlenTimePicker.bind(this, index,"autoOpenFive")}/>
                </Col>
              </Row>
            </Card>
          ))}
          
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editControl,getControlPage, getCompanyProject, editControlDoors, editControlDoorsPass}, dispatch)
  }
}

function mapStateProps(state){
  return {
    companyPro: state.app.companyPro,
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditPassControl) )