import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getRoleList, deleteRole, clearTreeMenuList} from "@/actions/baseAction";
import {roleColmuns  } from "../colmuns";
import AddRole from "./add"


class RoleList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      params: {
        current: 1
      }
    }

  }
  componentDidMount(){
    this.props.actions.getRoleList(this.state.params, res=>{
      this.props.actions.clearTreeMenuList()
    })
    
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
    return roleColmuns.concat([{
      title: "操作",
      width: 200,
      render(item){
        return (
          <div>
            <Button type="link"><Link to={`/base/role/${item.id}/edit`}>编辑/权限</Link></Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button type="link">删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, roleList, utils} = this.props
    const {addVisible, params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增角色</Button>}>
          <AddRole visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <Table size="small" 
            columns={this.getCol()} 
            pagination={utils.Pagination(roleList, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getRoleList(params)
            })}
            dataSource={roleList?utils.addIndex(roleList.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getRoleList, deleteRole, clearTreeMenuList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    roleList: state.base.roleList,
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(RoleList)