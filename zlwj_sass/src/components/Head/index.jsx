import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Layout, Icon} from "antd"
import {setCollapsedTrue, setCollapsedFalse} from "@/actions/appAction"

const {Header} = Layout

class Head extends React.Component {

  handlenToggle(collapsed){
    collapsed?this.props.actions.setCollapsedFalse():this.props.actions.setCollapsedTrue()
  }

  render(){
    const {collapsed} = this.props
    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handlenToggle.bind(this, collapsed)}
        />
      </Header>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({setCollapsedTrue, setCollapsedFalse}, dispatch)
  }
}

function mapStateProps(state){
  return {
    collapsed: state.app.collapsed
  }
}

export default connect(mapStateProps, mapDispatchProps)(Head)