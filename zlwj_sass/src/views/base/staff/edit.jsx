import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Row, Col, Form, Button, Icon, Input, Select, TreeSelect, Card} from "antd";
import {editStaffTreeMenu, editStaff, getStaffList, getHeList, getDeptList, getSelectJobList, getSelectRoleList, getStaffDetail, getUserTreeMenuList} from "@/actions/baseAction"
import JCard from "@/components/JCard"
import RoleMenu from "@/components/RoleMenu"

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

class EditStaff extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      keys: [],
      bakKey: [],
      detail: ''
    }
  }

  componentDidMount(){
    this.props.actions.getHeList({})
    this.props.actions.getDeptList({})
    this.props.actions.getSelectJobList({})
    this.props.actions.getUserTreeMenuList({
      id: this.props.match.params.id
    })

    this.props.actions.getStaffDetail({
      id: this.props.match.params.id
    }, res=>{
      this.setState({detail: res})
    })
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.myRoles && !this.state.keys.length){
      this.setState({keys: this.getKeys( nextProps.myRoles )})
    }
  }

  getKeys(arr){
    if(!_.isArray(arr)) return []
    _.each(arr, item=>{
      if(item.select && !item.isParent){
        this.state.bakKey.push(item.key.toString())
      }
      
      if(item.nextMenuList && item.nextMenuList.length){
        this.getKeys(item.nextMenuList)
      }
    })
    return this.state.bakKey
  }

  onCheck(keys){
    this.setState({keys})
  }

  handlenKeys(arr){
    let newArr = _.clone(arr)
    _.each(arr, item=>{
      _.each(this.getParents(item), elem=>{
        newArr.push(elem)
      })
    })
    return _.uniq(newArr)
  }
  getParents(str){
    let arr = []
    let r = str.split("-")
    
    for(let i=1;i<r.length;i++){
      let s=''
      for(let j=0;j<i;j++){
        s += ('-'+r[j])
      }
      arr.push(s.substring(1))
    }
    return arr;
  }

  submitLimit(){
    let keyArr = this.handlenKeys(this.state.keys)
    
    this.props.actions.editStaffTreeMenu({
      id: this.props.match.params.id,
      menuKeys: keyArr.join()
    }, res=>{
      this.props.utils.OpenNotification("success")
    })
  }

  handlenData(arr, keyArr, key){
    let newArr = []
    if(!arr || !_.isArray(arr[keyArr]))return newArr
    _.each(arr[keyArr], item=>{
      newArr.push(item[key])
    })
    return newArr
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editStaff({
          ...values,
          id: this.props.match.params.id,
          updateJobIds: values.updateJobIds?values.updateJobIds.join():"",
          updateHeIds: values.updateHeIds?values.updateHeIds.join():"",
          updateRoleId: ''
        }, res=>{
          this.props.utils.OpenNotification("success")
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
    const {spinning, jobList, deptList, heList, myRoles } = this.props
    const {detail, keys } = this.state

    return (
      <JCard spinning={spinning}>
        <Row gutter={10}>
          <Col span={12}>
            <Card title="基本信息" extra={<div>
              <Button className="mgr10"><Link to="/base/staff"><Icon type="rollback" />返回</Link></Button>
              <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button></div>} >
            <Form {...formItemLayout}>
              <Form.Item label="员工名称" hasFeedback>
                {getFieldDecorator('name', {
                  initialValue: detail?detail.name:"",
                  rules: [
                    {
                      required: true,
                      message: '填写员工名称!',
                    }
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="员工账号" hasFeedback>
                {getFieldDecorator('account', {
                  initialValue: detail?detail.account:"",
                  rules: [
                    {
                      required: true,
                      message: '填写员工账号!',
                    }
                  ],
                })(<Input disabled />)}
              </Form.Item>
              <Form.Item label="密码" hasFeedback>
                {getFieldDecorator('password')(<Input />)}
              </Form.Item>
              <Form.Item label="手机号" hasFeedback>
                {getFieldDecorator('phone', {
                  initialValue: detail?detail.phone:"",
                  rules: [
                    {
                      required: true,
                      message: '填写手机号!',
                    }
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="所属项目" >
                {getFieldDecorator('updateHeIds',{
                  initialValue: this.handlenData(detail,"heList","id"),
                })(
                  <Select style={{width: "100%"}} mode="multiple">
                    {heList && heList.length ? heList.map(item=>(
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="部门" >
                {getFieldDecorator('updateDeptId',{
                  initialValue: detail?detail.dept.id:''
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
              <Form.Item label="岗位" > 
                {getFieldDecorator('updateJobIds', {
                  initialValue: this.handlenData(detail,"jobList","id"),
                })(
                  <Select style={{width: "100%"}} mode="multiple">
                    {jobList && jobList.length ? jobList.map(item=>(
                      <Option key={item.id} value={item.id}>{item.jobName}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="角色" > 
                {getFieldDecorator('updateRoleId', {
                  initialValue: detail?detail.role.roleName:''
                })(
                  <Input disabled />
                )}
              </Form.Item>
            </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="权限信息"  extra={<Button onClick={this.submitLimit.bind(this)} type="primary"><Icon type="save" />保存</Button>} > 
              <RoleMenu data={myRoles?myRoles:[]} keys={keys} onCheck={this.onCheck.bind(this)} />
            </Card>
          </Col>
        </Row>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editStaffTreeMenu, editStaff, getUserTreeMenuList,getStaffList, getHeList, getDeptList, getSelectJobList, getSelectRoleList, getStaffDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    myRoles: state.base.myRoles,
    jobList: state.base.jobList,
    deptList: state.base.deptList,
    heList: state.base.heList,
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditStaff) )