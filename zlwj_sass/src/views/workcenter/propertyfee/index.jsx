import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Tree } from "antd";
import SelectHouse from "@/components/SelectHouse"

const { TreeNode } = Tree;

class PropertyFee extends React.Component {
  render(){
    return (
      <div>
        <SelectHouse/>
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