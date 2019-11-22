import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router-dom"
import {Card, Row, Col, Button, Icon, Form, Input, Switch} from "antd";
import RoleMenu from "@/components/RoleMenu"
import {getTreeMenuList, updateMenuList, getRoleDetail, editRoleDetail} from "@/actions/baseAction"
import JCard from "@/components/JCard"

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


class EditRole extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      keys: [],
      bakKey: [],
      detail: {},
    }
  }

  componentDidMount(){
    
    this.props.actions.getTreeMenuList({id:this.props.match.params.id})
    this.props.actions.getRoleDetail({id:this.props.match.params.id}, res=>{
      this.setState({detail: res})
    })
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.editRole && !this.state.keys.length){
      this.setState({keys: this.getKeys( nextProps.editRole )})
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

  handlenSaveRole(){
    let keyArr = this.handlenKeys(this.state.keys)
    this.props.actions.updateMenuList({
      roleName: this.state.detail.roleName,
      id: this.props.match.params.id,
      menuKeys: keyArr.join()
    }, res=>{
      this.props.utils.OpenNotification("success")
    })
  }

  handlenSaveInfo(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editRoleDetail({
          id: this.props.match.params.id,
          ...values,
          status: values.status?"0":"1"
        }, res=>{
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, editRole} = this.props
    const {keys, detail} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Row gutter={10}>
          <Col span={12}>
            <Card size="small" title="基础信息" extra={
              <div>
                  <Button size="small" className="mgr10"><Link to="/base/role"><Icon type="rollback" />返回</Link></Button>
                  <Button onClick={this.handlenSaveInfo.bind(this)} size="small" type="primary">
                  <Icon type="save"/>保存信息</Button>
              </div>} >
              <Form {...formItemLayout}>
                <Form.Item label="创建人" hasFeedback>
                  {getFieldDecorator('buildUserName', {
                    initialValue: detail.buildUserName,
                    rules: [
                      {
                        required: true,
                        message: '填写角色名称!',
                      }
                    ],
                  })(<Input disabled />)}
                </Form.Item>
                <Form.Item label="创建时间" hasFeedback>
                  {getFieldDecorator('buildTime', {
                    initialValue: detail.buildTime,
                  })(<Input disabled />)}
                </Form.Item>
                <Form.Item label="角色名称" hasFeedback>
                  {getFieldDecorator('roleName', {
                    initialValue: detail.roleName,
                    rules: [
                      {
                        required: true,
                        message: '填写角色名称!',
                      }
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="是否启用" >
                  {getFieldDecorator('status', {
                    initialValue: detail.status=="0"?true:false,
                    valuePropName: "checked"
                  })(<Switch />)}
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="配置权限" 
                  extra={<Button onClick={this.handlenSaveRole.bind(this)} size="small" type="primary">
                  <Icon type="save"/>保存权限</Button>}>
              <RoleMenu data={editRole?editRole:[]} keys={keys} onCheck={this.onCheck.bind(this)} />
            </Card>
          </Col>
        </Row>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTreeMenuList, updateMenuList, getRoleDetail, editRoleDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    editRole: state.base.editRole,
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditRole) )