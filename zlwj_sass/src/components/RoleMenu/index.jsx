import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tree} from "antd";

const {TreeNode} = Tree

class RoleMenu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }


  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.key} title={item.name} disabled={item.status=="0"?false:true}>
        {item.nextMenuList && item.nextMenuList.length? this.createNode(item.nextMenuList):null}
      </TreeNode>
    ))
  }

  render(){
    const {data, onCheck, keys} = this.props

    return (
      <div>
        {data.length?<Tree
          checkable 
          defaultExpandAll
          blockNode
          checkedKeys={keys}
          onCheck={onCheck}>
          {this.createNode(data)}
        </Tree>:null}
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(RoleMenu)