import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Select, Button, Table, Icon, TreeSelect } from "antd";
import JCard from "@/components/JCard"
import {getStaffList, getHeList, getDeptList, getSelectJobList, getSelectRoleList} from "@/actions/baseAction"
import {staffColmuns} from "../colmuns"
import AddStaff from "./add"

const {Option} = Select
const { TreeNode } = TreeSelect;


class Staff extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      params: {
        current: 1,
        pageSize: 10,
        status:0,
        name: "",
        account: "",
        phone: "",
        selectHeId: "",
        selectDeptId: ""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getStaffList(this.state.params)
    this.props.actions.getHeList({})
    this.props.actions.getDeptList({})
    this.props.actions.getSelectJobList({})
    this.props.actions.getSelectRoleList({})
  }

  createNode(arr){
    if(!arr.length) return null
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName}>
        {item.nextDeptList && item.nextDeptList.length? this.createNode(item.nextDeptList):null}
      </TreeNode>
    ))
  }


  handleSearch(e){
    e.preventDefault();
    const {params} = this.state
    this.props.form.validateFields((err, values) => {
      if(!err){
        params.current = 1
        params.name = values.name
        params.account = values.account
        params.phone = values.phone
        params.selectHeId = values.selectHeId
        params.selectDeptId = values.selectDeptId
        this.setState({params})
        this.props.actions.getStaffList(params)
      }
      
    })
  }

  getCol(){
    return staffColmuns.concat([{
      title: "操作",
      render(){
        return (
          <div>
            <Button size="small" type="link">编辑/权限</Button>
            <Button size="small" type="link">删除</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {spinning, staff, utils, deptList, heList} = this.props
    const {addVisible, params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus"/>新增员工</Button>} >
          <AddStaff visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <Form className="mgb10" layout="inline" onSubmit={this.handleSearch.bind(this)}>
            <Form.Item label="员工名称" >
              {getFieldDecorator('name')(
                <Input placeholder="员工名称"/>,
              )}
            </Form.Item>
            <Form.Item label="员工账号" >
              {getFieldDecorator('account')(
                <Input placeholder="员工账号"/>,
              )}
            </Form.Item>
            <Form.Item label="手机号" >
              {getFieldDecorator('phone')(
                <Input placeholder="手机号"/>,
              )}
            </Form.Item>
            <Form.Item label="项目" >
              {getFieldDecorator('selectHeId',{
                initialValue: ""
              })(
                <Select style={{width: 120}}>
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
                  style={{ width: 200 }}
                  placeholder="选择部门"
                  allowClear
                  treeDefaultExpandAll
                >
                  {this.createNode(deptList && deptList.length?deptList:[])}
                </TreeSelect>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >搜索</Button>
            </Form.Item>
          </Form>
          <Table size="small" columns={this.getCol()} 
            dataSource={staff?utils.addIndex(staff.list):[]}
            pagination={utils.Pagination(staff, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getStaffList(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaffList, getHeList, getDeptList, getSelectJobList, getSelectRoleList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    heList: state.base.heList,
    deptList: state.base.deptList,
    staff: state.base.staff,
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Staff) )