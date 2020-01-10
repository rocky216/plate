import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Switch, DatePicker, Select, TreeSelect, Cascader} from "antd";
import { addStaffTransferPosition, getStaffTransferPosition, getSelectDeptNotSmall, getSelectDeptList, getProcessList} from "@/actions/personAction"
import moment from "moment"

const {TextArea} = Input
const {Option} = Select
const {TreeNode} = TreeSelect 

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

class AddPosts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      unitList: [],
      processListIn:[],
      processListOut:[]
    }
  }
  componentDidMount(){
    this.props.actions.getSelectDeptNotSmall({})
    this.props.actions.getProcessList({
      flowType: "5",
      flowOrganId: this.props.detail.mDeptId
    }, res=>{
      this.setState({processListOut: res})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  handlenData(arr){
    let arrData = function(arr){
      if(arr && arr.length){
        _.each(arr, item=>{
          item.children = item.nextDept && item.nextDept.length?item.nextDept:null
          item.value = item.id
          item.key = item.id
          item.label = item.deptName
          if(item.nextDept && item.nextDept.length){
            arrData(item.nextDept)
          }
        })
      }
    } 
    arrData(arr)
    return arr
  }

  getUnit(index, arr, {triggerNode}){
    console.log(arguments)
    if(triggerNode.props.dataRef.deptType=="4"){
      this.props.actions.getSelectDeptList({
        deptTypes: "5,6",
        parentId: triggerNode.props.dataRef.id
      }, res=>{
        this.setState({unitList: res})
        console.log(res)
      })
    }
    this.props.actions.getProcessList({
      flowType: "6",
      flowOrganId: triggerNode.props.dataRef.id
    }, res=>{
      this.setState({processListIn: res})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values, "values")
      
      
      if(!err){
        const {unit, transferPositionTime} = values
      let newValues = _.omit(values, ["name1","allDeptNameStr","unit"])
        this.props.actions.addStaffTransferPosition({
          ...newValues,
          employeeId: this.props.detail.id,
          objectiveUnitId: unit && unit[0]? unit[0]:"",
          objectiveWorkScoreId: unit && unit[1]? unit[1]:"",
          objectiveClassId: unit && unit[2]? unit[2]:"",
          transferPositionTime: transferPositionTime?moment(transferPositionTime).format("YYYY-MM-DD"):""
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getStaffTransferPosition({current: 1})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail, deptNotsmall} = this.props
    const {unitList, processListOut, processListIn} = this.state

    return (
      <Modal
        destroyOnClose
        width={600}
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="被调岗人员" >
            {getFieldDecorator('name1', {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '填写项目名称!',
                }
              ],
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="调岗日期" hasFeedback>
            {getFieldDecorator('transferPositionTime', {
              rules: [
                {
                  required: true,
                  message: '调岗日期!',
                }
              ],
            })(<DatePicker  />)}
          </Form.Item>
          <Form.Item label="目前所在组织" >
            {getFieldDecorator('allDeptNameStr', {
              initialValue: detail.allDeptNameStr,
            })(<Input disabled />)}
          </Form.Item> 
          <Form.Item label="目的组织" hasFeedback>
            {getFieldDecorator('objectiveMDeptId')(
              <TreeSelect onChange={this.getUnit.bind(this)}>
                {this.createNode(deptNotsmall?deptNotsmall:[])}
              </TreeSelect>
            )}
          </Form.Item>
          {unitList.length?
          <Form.Item label="单元/工段/班组" hasFeedback>
            {getFieldDecorator('unit')(
              <Cascader options={this.handlenData(unitList)} />
            )}
          </Form.Item>:null}
          
          <Form.Item label="调岗说明" hasFeedback>
            {getFieldDecorator('transferPositionReason', {
              rules: [
                {
                  required: true,
                  message: '填写调岗说明!',
                }
              ],
            })(<TextArea autoSize={{minRows: 3}} />)}
          </Form.Item>
          <Form.Item label="调出流程模板" hasFeedback>
            {getFieldDecorator('moveFlowTemplateId', {
              rules: [
                {
                  required: true,
                  message: '调出流程模板!',
                }
              ],
            })(
              <Select style={{width: "100%"}}>
                {processListOut.map(item=>(
                  <Option key={item.id} value={item.id}>{item.flowName}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {processListIn.length?
          <Form.Item label="调入流程模板" hasFeedback>
            {getFieldDecorator('inFlowTemplateId', {
              rules: [
                {
                  required: true,
                  message: '调入流程模板!',
                }
              ],
            })(
              <Select style={{width: "100%"}}>
                {processListIn.map(item=>(
                  <Option key={item.id} value={item.id}>{item.flowName}</Option>
                ))}
              </Select>
            )}
          </Form.Item>:null}
          
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({ addStaffTransferPosition, getStaffTransferPosition, getSelectDeptNotSmall, getSelectDeptList, getProcessList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    deptNotsmall: state.person.deptNotsmall,
    utils: state.app.utils,
    spinning: state.person.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddPosts)) )