import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Tree, Icon, Button, Popconfirm} from "antd";
import {getAppTreeMenuList, deleteAppTreeMenuList} from "@/actions/systemAction"
import JCard from "@/components/JCard"
import AddMenu from "./add"
import EditMenu from "./edit"


const { TreeNode } = Tree

class AppTreeMenu extends React.Component {
  constructor(props){
    super(props)
    this.state={
      addVisible: false,
      editVisible: false,
      detail: ''
    }
  }

  componentDidMount(){
    this.props.actions.getAppTreeMenuList({})
  }
  handlenDelete(item){
    this.props.actions.deleteAppTreeMenuList({
      id: item.id
    }, res=>{
      this.props.actions.getAppTreeMenuList({})
      this.props.utils.OpenNotification("success")
    })
  }

  handlenTitle(item){
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span span={5}>{item.name}({item.key})</span>
        <div span={19} >
          <Icon type="plus" className="mgr20" onClick={()=>this.setState({addVisible: true, detail: item})} />
          <Icon type="edit"  className="mgr20" onClick={()=>this.setState({editVisible: true, detail: item})} />
          <Popconfirm 
            placement="topRight" 
            title="是否删除？"
            okText="是"
            cancelText="否"
            onConfirm={this.handlenDelete.bind(this, item)}>
            <Icon type="delete" />
          </Popconfirm>
        </div>
      </div>
    )
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} title={this.handlenTitle(item)} disabled={item.status=="0"?false:true}>
        {item.nextMenuList && item.nextMenuList.length? this.createNode(item.nextMenuList):null}
      </TreeNode>
    ))
  }

  render(){
    const {spinning, apptreemenu} = this.props
    const {addVisible, detail, editVisible} = this.state
    
    return (
      <JCard spinning={spinning}>
        <AddMenu visible={addVisible} detail={detail} onCancel={()=>this.setState({addVisible: false, detail: ''})} />
        <EditMenu visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ''})} />
        <div>
          <Card
            title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增菜单</Button>}
          >
            {apptreemenu && apptreemenu.length?<Tree
              // checkable
              showLine 
              defaultExpandAll
              blockNode
            >
              {this.createNode(apptreemenu)}
            </Tree>:null}
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAppTreeMenuList, deleteAppTreeMenuList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    apptreemenu: state.system.apptreemenu,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AppTreeMenu)