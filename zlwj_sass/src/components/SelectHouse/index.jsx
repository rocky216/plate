import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tree, Input} from "antd";
import {getHouseInfo} from "@/actions/otherAction"
import "./index.less"

const {TreeNode } = Tree

class SelectHouse extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: [],
      expandedKeys:[]
    }
  }

  componentDidMount(){
    this.props.actions.getHouseInfo(this.state.params)
  }

  handlenData(arr){
    if(!_.isArray(arr)) return []

    _.each(arr, item=>{
      if(item.heUnits){
        item.selectable=false
        item.children = item.heUnits
        item.name = item.showCode+"栋"
      }else if(item.heHouses){
        item.selectable=false
        item.children = item.heHouses
        item.name = item.showCode+"单元"
      }else{
        item.name = item.owners?`${item.showBouseCode}号(${item.owners.name})(${item.owners.phone})`:item.showBouseCode+"号"
      }

    })

    return arr
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode  key={item.id} selectable={item.selectable}  title={item.name}  dataRef={item} >
        {item.children && item.children.length? this.createNode(this.handlenData(item.children)):null}
      </TreeNode>
    ))
  }

  handlenSelect(key, {node}){
    console.log(node.props.dataRef)
    if(this.props.onSelect) this.props.onSelect(node.props.dataRef)
  }

  handlenSearch({keyCode, target}){
    
    if(keyCode===13){
      let build=[], unit=[], house=[], newArr=[]
      
      const {allhouse} = this.props
      if(target.value == ""){
        this.setState({treeData: allhouse})
      }

      let arr = _.trim(target.value).split("-")
      
      if(arr.length!==3)return
      build = _.filter(allhouse,o=>o.showCode==arr[0])
      console.log(build, "build")
      if(!build || !build.length) return
      unit = _.filter(build[0]["heUnits"],o=>o.showCode==arr[1])
      
      if(!unit || !unit.length) return
      
      house = _.filter(unit[0]["heHouses"],o=>o.showBouseCode==arr[2])
      
      if(!house || !house.length) return
      newArr = [{...build[0], ...{heUnits: [{...unit[0], heHouses:house}] } }]
      // let expandedKeys = [String(build[0]["id"]), String(unit[0]["id"])]
      this.setState({treeData: newArr})
      
    }
    
  }

  render(){
    const {allhouse, NoInput, checkedKeys, checkable, onCheck, showLine} = this.props
    const {treeData, expandedKeys} = this.state
    

    return (
      <div className="selectHouse">
        {!NoInput?<Input onKeyDown={this.handlenSearch.bind(this)} placeholder="输入如: 1-1-101回车"  />:null}
        
          {treeData && treeData.length?<Tree
            showLine 
            onSelect={this.handlenSelect.bind(this)}
          >
            {this.createNode(this.handlenData(treeData))}
          </Tree>:null}
          {allhouse && !treeData.length?
            <Tree
            checkable={checkable}
            checkedKeys={checkedKeys?checkedKeys:[]}
            onCheck={onCheck}
            showLine={showLine}
            onSelect={this.handlenSelect.bind(this)}
          >
            {this.createNode(allhouse?this.handlenData(allhouse):[])}
          </Tree>:null}
          
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHouseInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allhouse: state.other.allhouse,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectHouse)