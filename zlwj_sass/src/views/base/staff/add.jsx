import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, Select, TreeSelect} from "antd";
import { addStaff, getStaffList} from "@/actions/baseAction";

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

class AddRole extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addStaff({
          ...values
        }, res=>{
          this.props.actions.getStaffList({})
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
        })
      }
    })
  }
  createNode(arr){
    if(!arr.length) return null
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName}>
        {item.nextDeptList && item.nextDeptList.length? this.createNode(item.nextDeptList):null}
      </TreeNode>
    ))
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, heList, deptList} = this.props

    return (
      <Modal 
        destroyOnClose
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}>
        <Form {...formItemLayout}>
          <Form.Item label="员工名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '填写员工名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="员工账号" hasFeedback>
            {getFieldDecorator('admin', {
              rules: [
                {
                  required: true,
                  message: '填写员工账号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="手机号" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '填写手机号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属项目" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '填写手机号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="项目" >
              {getFieldDecorator('selectHeId',{
                initialValue: ""
              })(
                <Select style={{width: "100%"}}>
                  <Option value="">全部</Option>
                  {heList && heList.length ? heList.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="部门" >
              {getFieldDecorator('selectDeptId',{
                initialValue: ""
              })(
                <TreeSelect 
                  style={{ width: "100%" }}
                  placeholder="选择部门"
                  allowClear
                  treeDefaultExpandAll
                >
                  {this.createNode(deptList && deptList.length?deptList:[])}
                </TreeSelect>
              )}
            </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addStaff, getStaffList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    deptList: state.base.deptList,
    heList: state.base.heList,
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddRole) )