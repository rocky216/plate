import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Tabs} from "antd";
import {removeKeepTabs} from "@/actions/appAction"

const { TabPane } = Tabs;

class KeepTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  onEdit(index){
    this.props.actions.removeKeepTabs(index)
  }
  handlenChange(index){
    const {keeptabs } = this.props
    this.props.history.push(keeptabs[index]["path"])
    
  }
  render(){
    const {keeptabs } = this.props
    
    return (
      <Tabs
        hideAdd
        type="editable-card"
        onChange={this.handlenChange.bind(this)}
        onEdit={this.onEdit.bind(this)}
      >
        {keeptabs.map((item, index)=>(
          <TabPane tab={item.name} key={index} />
        ))}
        
      </Tabs>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({removeKeepTabs }, dispatch)
  }
}

function mapStateProps(state){
  console.log(state, "state")
  return {
    keeptabs: state.app.keeptabs
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(KeepTab) )