import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, Icon, Tag} from "antd";
import {employeeNoticeInit, updateEmployeeNotice} from "@/actions/personAction"
import Teach from "./teach"

const {TextArea} = Input

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

class StaffNotice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      initial:"",
      teachVisible: false,
      teach: []
    }

  }

  componentDidMount(){
    this.props.actions.employeeNoticeInit({}, res=>{
      this.setState({teach: this.handlenData(res)})
    })
  }
  handlenData(res){
    if(res && res.length){
      let arr = []
      _.each(res, item=>{
        arr.push({
          id: item.noticeObjectId,
          name: item.objectName
        })
      })
      return arr
    }else{
      return []
    }
  }

  handlenIds(){
    const {teach} = this.state
    let arr = []
    _.each(teach, item=>{
      arr.push(item.id)
    })
    return arr
  }
  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      this.props.actions.updateEmployeeNotice({
        idStr: this.handlenIds().join()
      }, res=>{
        this.props.onCancel()
        this.props.utils.OpenNotification("success")
      })
    })
  }

  selectTeach(item){
    const {teach } = this.state
  
    teach.push({
      name: item.name,
      id: item.id
    })
    this.setState({teach})
  }

  handlenDelete(item){
    const {teach} = this.state
    console.log(item)
    let index = _.findIndex(teach, o=>o.id==item.id)
    teach.splice(index,1)
    this.setState({teach})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    const {teachVisible, teach} = this.state
      console.log(teach)
    return (
      <div>
        <Teach visible={teachVisible} onCancel={()=>this.setState({teachVisible: false})} onSelect={this.selectTeach.bind(this)} />
      
        <Modal
          destroyOnClose
          okText="确定"
          cancelText="取消"
          confirmLoading={spinning}
          visible={visible}
          onCancel={onCancel}
          onOk={this.handlenSubmit.bind(this)}
        >
          <Form {...formItemLayout} >
            <Form.Item label="通知对象" hasFeedback>
              <div style={{display: "flex"}}>
              <div style={{width: "80%", border: "1px solid #ddd", minHeight:100, padding: "5px"}}>
                {teach.map(item=>(
                  <Tag key={item.id} closable onClose={this.handlenDelete.bind(this, item)} >{item.name}</Tag>
                ))}
              </div>
              <Icon style={{fontSize: 20, color: "red"}} className="pulsIcon" type="user-add" 
              onClick={()=>this.setState({teachVisible: true})} />
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({employeeNoticeInit, updateEmployeeNotice }, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.person.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(StaffNotice)) )