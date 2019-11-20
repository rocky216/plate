import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Tree } from "antd";

const { TreeNode } = Tree;

class PropertyFee extends React.Component {
  render(){
    return (
      <Tree
        checkable
      >
        <TreeNode title="parent 1" key="0-0" >
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span >111</span>} key="0-0-1-0" />
          </TreeNode>
          <TreeNode disabled title={<span >222</span>} key="0-0-2" />
        </TreeNode>
      </Tree>
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

  }
}

export default connect(mapStateProps, mapDispatchProps)(PropertyFee)