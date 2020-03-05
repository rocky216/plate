import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Popconfirm, Form, Input } from "antd";
import JCard from "@/components/JCard"
import {getRoleList, deleteRole} from "@/actions/systemAction"
import {roleColumns} from "../columns"
import AuthButton from "@/components/AuthButton"


class SystemAuth extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1,
        roleName: ""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getRoleList(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteRole({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getRoleList(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return roleColumns.concat([{
      title: "操作",
      render(item){
        return item.id=="19"?null:
        <div>
          <Link to={`/system/auth/${item.id}/edit`}>
            <AuthButton auth="3-02-02" size="small" type="link">修改</AuthButton>
          </Link>
          <Popconfirm
            placement="topRight" 
            title="是否删除？"
            okText="是"
            cancelText="否"
            onConfirm={_this.handlenDelete.bind(_this, item)}>
              <AuthButton auth="3-02-03" size="small" type="link">删除</AuthButton>
          </Popconfirm>
        </div>
      }
    }])
  }

  handleSearch(){
    this.props.form.validateFields((err, values) => {
      this.state.params.roleName = values.roleName
      this.setState({params: this.state.params})
      this.props.actions.getRoleList(this.state.params)
    })
  }
  handlenResetFields(){
    this.props.form.resetFields()
    this.state.params.roleName = ""
    this.setState({params: this.state.params})
    this.props.actions.getRoleList(this.state.params)
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, role} = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" 
          title={<Link to="/system/auth/add"><AuthButton auth="3-02-01" type="primary"><Icon type="plus" />添加角色</AuthButton></Link>}>
            <div className="fixedend mgb10">
              <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                <Form.Item label="角色名称">
                  {getFieldDecorator('roleName')(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                  <Button className="mgl10" onClick={this.handlenResetFields.bind(this)}><Icon type="retweet" />重置</Button>
                </Form.Item>
              </Form>
            </div>
            
            <Table size="small" columns={this.getCol()} dataSource={role?utils.addIndex(role.list):[]}
              pagination={utils.Pagination(role, page=>{
                params.current = page
                this.setState({params})
                this.props.actions.getRoleList(params)
              })} />
          </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getRoleList, deleteRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    role: state.system.role,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(SystemAuth) )