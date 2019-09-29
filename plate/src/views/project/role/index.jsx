import React from "react"
import {Link, Switch, Route} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Button, Icon, Table
} from "antd"
import JCard from "@/components/JCard"
import {getRoleList, delRoleItem} from "@/actions/projectAction"
import AddRole from "./addRole"
import {roleColumns} from "../columns"
import {addIndex} from "@/utils"
import EditRole from "./editRole"


class Role extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false
    }
  }

  componentWillMount(){
    this.props.actions.getRoleList()
  }

  handlenDelete(item){
    this.props.actions.delRoleItem({
      rid: item.roleId
    }, res=>{
      this.props.actions.getRoleList()
    })
  } 

  handlenEdit(item){
    this.setState({
      editVisible: true,
      detail: item
    })
  }

  getCol(){
    let _this = this
    return roleColumns.concat([{
      title: "操作",
      render(item){
        return(
          <div>
            <Button size="small" type="link" onClick={_this.handlenEdit.bind(_this, item)} >变更</Button>
            <Button size="small" type="link" onClick={_this.handlenDelete.bind(_this,item)}>删除</Button>
            {item.dataScope!=1?
              <Button size="small" type="link" ><Link to={`/project/auth/${item.roleId}`}>菜单</Link></Button>
            :null}
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, roleList} = this.props


    return (
      <JCard spinning={spinning}>
        <div>
          <EditRole 
            detail={this.state.detail}
            editVisible={this.state.editVisible} 
            onCancel={()=>this.setState({editVisible: false})}/>
          <div className="mgb10">
            <Switch  >
              <Route path="/project/role/add" component={AddRole} />
            </Switch>
          </div>
          <Card
            size="small"
            title={<Button type="primary"><Link to="/project/role/add"><Icon type="plus"/>添加角色</Link></Button>}  
          >
            <Table columns={this.getCol()} dataSource={roleList?addIndex(roleList):[]} />
          </Card>
        </div>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getRoleList, delRoleItem}, dispatch)
  }
}

function mapStateProps(state){
  return {
    roleList: state.project.roleList,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Role)