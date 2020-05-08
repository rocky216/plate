import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tree, Input} from "antd";
import {getBuildAndUnitByHeId, getHouseByUnitId} from "@/actions/otherAction"
import "./index.less"

const {TreeNode } = Tree

class SelectOwner extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: [],
      expandedKeys:[],
    }
  }

  componentDidMount(){
    this.props.actions.getBuildAndUnitByHeId({}, res=>{
      this.setState({treeData:this.handlenData(res)})
    })
  }

  handlenData(arr){
    if(!_.isArray(arr)) return []

    _.each(arr, (item, attr)=>{
      if(item.type=="house"){
        item.selectable=true
        item.isLeaf = true
      }else{
        item.selectable=false
        item.isLeaf = false
      }
      if(item.children && item.children.length){
        this.handlenData(item.children)
      }
    })

    return arr
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} selectable={item.selectable} title={item.name} isLeaf={item.isLeaf} dataRef={item} >
        {item.children && item.children.length? this.createNode(item.children):null}
      </TreeNode>
    ))
  }

  handlenSelect(key, {node}){
    if(this.props.onSelect) this.props.onSelect(node.props.dataRef)
  }


  onLoadData(data){

    return new Promise((resolve, reject)=>{
      if (data.props.children) {
        resolve();
        return;
      }
      this.props.actions.getHouseByUnitId({unitId: data.props.eventKey}, res=>{
        let newData = this.handlenData(res)
        data.props.dataRef.children = newData
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      })

    })
    
  }


  render(){
    const {allhouse, NoInput, checkedKeys, checkable, onCheck, showLine} = this.props
    const {treeData, expandedKeys} = this.state
    
 
    return (
      <div className="selectHouse">
        <Tree 
          showLine 
          loadData={this.onLoadData.bind(this)}
          onSelect={this.handlenSelect.bind(this)}
          >
          {this.createNode(treeData)}
        </Tree>
          
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBuildAndUnitByHeId, getHouseByUnitId}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectOwner)