import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tree} from "antd";
import {loadSelectAssetRedis } from "@/actions/projectAction"
import "./index.less"

const { TreeNode } = Tree;

class RelaSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  

  componentDidMount(){
    const {params} = this.props
    this.props.actions.loadSelectAssetRedis(params, res=>{
      this.setState({data: res})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id+item.type} 
        selectable={item.type=="house" || item.type=="shops" || item.type=="parkingSpace"} 
        title={item.name}  dataRef={item} >
        {item.children && item.children.length? this.createNode(item.children):null}
      </TreeNode>
    ))
  }

  handleSelect(arr, {node}){
    
    this.props.onSelect(node.props.dataRef)
  }

  render(){
    const {utils } = this.props

    return (
      <div className="relaselect">
        <Tree
          onSelect={this.handleSelect.bind(this)}
        >
          {this.createNode(this.state.data)}
        </Tree>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectAssetRedis }, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(RelaSelect)