import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tree, Popconfirm, Icon, Card, Button} from "antd";
import {getTreeDeptList, deleteTreeDept} from "@/actions/baseAction"
import JCard from "@/components/JCard"
import AddDept from "./add"
import EditDept from "./edit"

const {TreeNode} = Tree

class BaseDepartment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ''
    }
  }

  componentDidMount(){
    this.props.actions.getTreeDeptList({})
  }
  handlenDelete(item){
    console.log(item)
    this.props.actions.deleteTreeDept({
      id: item.id
    }, res=>{
      this.props.actions.getTreeDeptList({})
      this.props.utils.OpenNotification("success")
    })
  }

  handlenTitle(item){
    const {departmentList} = this.props
    let index = _.findIndex (departmentList,o=>o.id==item.id)
    
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span span={5}>{item.deptName}</span>
        <div span={19} >
          <Icon type="plus" className="mgr20" onClick={()=>this.setState({addVisible: true, detail: item})} />
          <Icon type="edit"  className="mgr20" onClick={()=>this.setState({editVisible: true, detail: item})} />
          {index<0?<Popconfirm 
            placement="topRight" 
            title="是否删除？"
            okText="是"
            cancelText="否"
            onConfirm={this.handlenDelete.bind(this, item)}>
            <Icon type="delete" />
          </Popconfirm>:<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
        </div>
      </div>
    )
  }

  createNode(arr){
    return arr.map(item=>{
      return <TreeNode key={item.id} switcherIcon={<i className="icon iconfont icon-laoban" style={{fontSize:22, color: "#1DA57A"}} />} title={this.handlenTitle(item)} disabled={item.status=="0"? false: true}>
        {item.nextDeptList && item.nextDeptList.length? this.createNode(item.nextDeptList):null}
      </TreeNode>
    })
  }

  render(){
    const {spinning, departmentList} = this.props
    const {addVisible,editVisible, detail} = this.state
    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <AddDept visible={addVisible} detail={detail} onCancel={()=>this.setState({addVisible: false, detail:''})} />
          <EditDept visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:''})} />
          <div>
            {departmentList && departmentList.length?
            <Tree
              showLine 
              defaultExpandAll
              blockNode
          >
            {this.createNode(departmentList)}
          </Tree>:null}
          </div>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTreeDeptList, deleteTreeDept}, dispatch)
  }
}

function mapStateProps(state){
  return {
    departmentList: state.base.departmentList,
    spinning: state.base.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(BaseDepartment)