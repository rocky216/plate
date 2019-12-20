import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {TreeSelect, Tree, Icon, Select} from "antd";
import {getShopList} from "@/actions/otherAction"

const { TreeNode } = Tree;
const {Option} = Select

class SelectShopL extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: '',
      ownerType: "0"
    }

  }

  componentDidMount(){
    this.props.actions.getShopList({}, res=>{
      console.log(res)
      this.setState({treeData: res})
    })
      
  }



  handlenSelect(val, {node}){
    this.props.onSelect(node.props.dataRef)
  }

  createNode(arr){
    return arr.map(item=>{
      return <TreeNode key={item.id}  title={item.shopsName} dataRef={item}></TreeNode>
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
    actions: bindActionCreators({getShopList,}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectShopL)