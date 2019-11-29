import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Tree } from "antd";
import SelectRoom from "@/components/SelectRoom"

const { TreeNode } = Tree;

class PropertyFee extends React.Component {
  render(){
    return (
      <div>
        <SelectRoom/>
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

  }
}

export default connect(mapStateProps, mapDispatchProps)(PropertyFee)