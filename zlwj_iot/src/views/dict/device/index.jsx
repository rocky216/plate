import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import JCard from "@/components/JCard"
import {Card, Button, Icon, Tree, Popconfirm} from "antd";
import {getDeviceDictTree} from "@/actions/dictAction"
import AddDictDevice from "./add"
import EditDictDevice from "./edit"

const { TreeNode } = Tree;

class DeviceDict extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getDeviceDictTree({})
  }
  handlenTitle(item){
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span>{item.name}</span>
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
  handlenDelete(item){

  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} title={this.handlenTitle(item)} >
        {item.children && item.children.length? this.createNode(item.children):null}
      </TreeNode>
    ))
  }
  render(){
    const {utils, spinning, dictdevice} = this.props
    const {addVisible,editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddDictDevice visible={addVisible} detail={detail} onCancel={()=>this.setState({addVisible: false})} />
        <EditDictDevice visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false})} />
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />添加设备字典</Button>} >
          {dictdevice?
          <Tree
            // checkable
            showLine 
            defaultExpandAll
            blockNode
          >
            {this.createNode(dictdevice)}
          </Tree>:null}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeviceDictTree}, dispatch)
  }
}

function mapStateProps(state){
  return {
    dictdevice: state.dict.dictdevice,
    spinning: state.dict.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceDict)