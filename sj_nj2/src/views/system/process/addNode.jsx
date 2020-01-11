import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, TreeSelect, Select, Icon} from "antd";
import {addDictData, getDictData, } from "@/actions/systemAction"
import Teach from "@/views/person/staff/teach"

const {TextArea} = Input
const { TreeNode } = TreeSelect;
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

class AddNode extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      roleList: [],
      jobList: [],
      teachVisible: false,
      teach: "",
    }
  }

  componentDidMount(){
    
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {teach} = this.state
        const {nodeTarget} = values
        if(nodeTarget=="1" && !teach.nodeTargetId){
          this.props.utils.OpenNotification("error", "用户不能为空！")
          return
        }
        this.props.onSubmit({
          ...values,
          name: teach.name,
          teach,
          nodeTargetId: nodeTarget=="1"?teach.nodeTargetId:values["nodeTargetId"+nodeTarget]
        })
        this.props.onCancel()
      }
    })
  }
  onSelect(obj){
    this.setState({teach: {name: obj.name, nodeTargetId: obj.id}})
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, visible, onCancel, roleList, jobList} = this.props
    const {teachVisible, teach} = this.state
    
    return (
      <div>
        <Teach visible={teachVisible} onCancel={()=>this.setState({teachVisible: false})} 
          onSelect={this.onSelect.bind(this)} />
      
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
          <Form.Item label="节点名称" hasFeedback>
            {getFieldDecorator('nodeTitle', {
              rules: [{required: true,message: '填写节点名称!',}]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="节点编号" hasFeedback>
            {getFieldDecorator('nodeCode', {
              rules: [{required: true,message: '填写节点编号!',}]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="节点类型" hasFeedback>
            {getFieldDecorator('nodeType', {
              initialValue: "1",
              rules: [{required: true,message: '选择节点类型!',}]
            })(
              <Select>
                <Option value="1">审批</Option>
                {/* <Option value="2">流程</Option>
                <Option value="3">告知</Option> */}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="节点参数" hasFeedback>
            {getFieldDecorator('nodeParam', )(<Input />)}
          </Form.Item>
          <Form.Item label="用户类型" >
            {getFieldDecorator('nodeTarget', {
              initialValue:"1",
              rules: [
                {
                  required: true,
                  message: '用户类型!',
                }
              ],
            })(
              <Select>
                <Option value="1">用户</Option>
                <Option value="2">角色</Option>
                <Option value="3">职位</Option>
              </Select>
            )}
          </Form.Item>
          {getFieldValue("nodeTarget")=="1"?<Form.Item label="用户" >
            <div className="teach_wrap">
              <Input  value={teach?teach.name:""} />
              <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({teachVisible: true})} />
            </div>
          </Form.Item>:null}
          {getFieldValue("nodeTarget")=="2"?<Form.Item label="用户" >
            {getFieldDecorator('nodeTargetId2', {
              rules: [{required: true,message: '选择用户!',}]
            })(
              <Select>
                {roleList?roleList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.roleName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>:null}
          {getFieldValue("nodeTarget")=="3"?<Form.Item label="用户" >
            {getFieldDecorator('nodeTargetId3', {
              rules: [{required: true,message: '选择用户!',}]
            })(
              <Select>
                {jobList?jobList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.dictName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>:null}
        </Form>
      </Modal>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addDictData, getDictData}, dispatch)
  }
}

function mapStateProps(state){
  return {
    roleList: state.system.roleList, 
    jobList: state.system.jobList, 
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddNode)) )