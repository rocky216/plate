import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {TreeSelect, Tree, Icon, Select} from "antd";
import {getOperativeAll} from "@/actions/otherAction"

const { TreeNode } = Tree;
const {Option} = Select

class SelectOperative extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: '',
      ownerType: "0"
    }

  }

  componentDidMount(){
    this.props.actions.getOperativeAll({}, res=>{
      this.setState({treeData: res})
    })
      
  }



  handlenSelect(val, {node}){
    this.props.onSelect(node.props.dataRef)
  }

  createNode(arr){
    return arr.map(item=>{
      return <TreeNode key={item.id}  title={item.name} dataRef={item}></TreeNode>
    })
  }

  render(){
    const {onSelect} = this.props
    const {treeData, ownerType} = this.state
    
    return (
      <div>
        <Tree
          showLine 
          onSelect={this.handlenSelect.bind(this)}
        >
        {this.createNode(treeData?treeData:[])}
      </Tree>
      </div>
      
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOperativeAll,}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectOperative)